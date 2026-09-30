# GoldenGreen — Docker Setup & Architecture Guide

Welcome to the **GoldenGreen** project! This repository contains a modern web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**, dedicated to sustainable poultry farming and eco-friendly agriculture.

This document provides a thorough explanation of how the project's containerization was engineered, detailing how the [`Dockerfile`](file:///Users/kanishka/Coding/GoldenGreen/Dockerfile), [`.dockerignore`](file:///Users/kanishka/Coding/GoldenGreen/.dockerignore), and [`nginx.conf`](file:///Users/kanishka/Coding/GoldenGreen/nginx.conf) were designed and how to build, run, and maintain the Docker container.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [How the Dockerfile Was Written](#how-the-dockerfile-was-written)
   - [Multi-Stage Build Pattern](#1-multi-stage-build-pattern)
   - [Stage 1: Build Environment (`node:20-alpine`)](#2-stage-1-build-environment-node20-alpine)
   - [Stage 2: Production Server (`nginx:alpine`)](#3-stage-2-production-server-nginxalpine)
   - [Container Health Check](#4-container-health-check)
3. [Nginx Configuration Breakdown](#nginx-configuration-breakdown)
4. [How `.dockerignore` Was Configured](#how-dockerignore-was-configured)
5. [How to Build and Run the Project with Docker](#how-to-build-and-run-the-project-with-docker)
   - [1. Build the Docker Image](#1-build-the-docker-image)
   - [2. Run the Container](#2-run-the-container)
   - [3. Check Status and Health](#3-check-status-and-health)
   - [4. View Container Logs](#4-view-container-logs)
   - [5. Stop and Remove the Container](#5-stop-and-remove-the-container)
6. [Optional: Docker Compose Workflow](#optional-docker-compose-workflow)

---

## Architecture Overview

Vite compiles a React application into static HTML, JavaScript, CSS, and media bundles. Because no server-side Node.js runtime is required at runtime, running a full Node.js process in production would waste memory, increase attack surface, and decrease throughput.

Instead, we employ a **multi-stage Docker build**:

```
+-------------------------------------------------------+
| STAGE 1: Builder (node:20-alpine)                     |
| 1. Copy package.json & package-lock.json              |
| 2. Run npm ci (cached layer)                          |
| 3. Copy source code & configs                         |
| 4. Compile via TypeScript + Vite (`npm run build`)   |
| -> Output: /app/dist                                  |
+-------------------------------------------------------+
                           |
                           v (Only copy /app/dist)
+-------------------------------------------------------+
| STAGE 2: Production Runner (nginx:alpine)             |
| 1. Clean default Nginx configuration                  |
| 2. Apply custom nginx.conf (SPA routing, gzip, cache) |
| 3. Copy /dist from builder into /usr/share/nginx/html |
| 4. Configure Alpine healthcheck (wget)                |
| -> Final Image Size: ~25 MB                           |
+-------------------------------------------------------+
```

---

## How the Dockerfile Was Written

Below is the line-by-line rationale behind each directive in [`Dockerfile`](file:///Users/kanishka/Coding/GoldenGreen/Dockerfile):

### 1. Multi-Stage Build Pattern
Using a single Docker stage for Node applications results in bloated image sizes (~800 MB to 1.5 GB) because development dependencies, TypeScript compilers, npm caches, and build tools remain inside the final container.

By separating the build into two distinct stages:
- **Build stage** has all Node tools required to compile the code.
- **Production stage** only contains the compiled static assets and an ultra-lightweight web server (**Nginx on Alpine**).
- **Result:** Image size drops to **~25 MB**, with zero Node vulnerability vectors in production.

### 2. Stage 1: Build Environment (`node:20-alpine`)

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
```
- **`node:20-alpine`**: Alpine Linux is an ultra-minimal distribution (~5 MB base) with Node LTS, keeping build-context initialization fast.
- **`WORKDIR /app`**: Creates an isolated directory inside the container for all subsequent build steps.

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci
```
- **Layer Caching Optimization**: In Docker, each instruction creates a cached layer. Source code changes frequently, while package dependencies change infrequently. By copying only `package.json` and `package-lock.json` before running `npm ci`, Docker reuses the cached node_modules layer whenever you edit application code without modifying dependencies.
- **`npm ci` vs `npm install`**: `npm ci` strictly installs the exact versions locked in `package-lock.json` without modifying the lockfile, ensuring deterministic, reproducible builds.

```dockerfile
COPY . .
RUN npm run build
```
- **`COPY . .`**: Copies the project source files (excluding anything defined in [`.dockerignore`](file:///Users/kanishka/Coding/GoldenGreen/.dockerignore)).
- **`npm run build`**: Runs `tsc && vite build`, validating TypeScript types and outputting minified, hashed static assets to `/app/dist`.

### 3. Stage 2: Production Server (`nginx:alpine`)

```dockerfile
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
```
- **`nginx:alpine`**: Nginx is purpose-built for serving static web assets with high concurrency and low memory usage.
- **Removing defaults**: Clears Nginx's default placeholder index page and boilerplate configuration.
- **Custom `nginx.conf`**: Injects our production-ready Nginx configuration (explained below).
- **`COPY --from=builder /app/dist /usr/share/nginx/html`**: Copies *only* the compiled static bundle from the first stage into Nginx's document root. The entire Node.js runtime and `node_modules` directory are discarded.

### 4. Container Health Check

```dockerfile
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```
- **`EXPOSE 80`**: Documents that the container listens on HTTP port 80.
- **`HEALTHCHECK`**: Container orchestrators (Docker Swarm, Kubernetes, AWS ECS) use this to monitor container vitality. Alpine comes with `wget` by default (avoiding the need to install `curl`), and `--spider` sends a `HEAD` request without downloading body content.
- **`CMD ["nginx", "-g", "daemon off;"]`**: Starts Nginx as PID 1 in the foreground, ensuring Docker can manage its lifecycle cleanly.

---

## Nginx Configuration Breakdown

In [`nginx.conf`](file:///Users/kanishka/Coding/GoldenGreen/nginx.conf), four critical features are configured:

1. **SPA Routing Fallback**:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
   In Single Page Applications (SPAs), routes like `/about` or `/farms` are handled by client-side JavaScript. Without `try_files`, reloading a subpage in Nginx results in a `404 Not Found`. This rule ensures any non-file request falls back to `index.html`.

2. **Gzip Compression**:
   Compresses text, JavaScript, CSS, JSON, and SVGs on the fly, reducing transfer size across the network by up to 70%.

3. **Cache Invalidation & Long-term Asset Caching**:
   ```nginx
   location /assets/ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```
   Vite creates content-hashed filenames for compiled assets (e.g., `index-CUYa8ocv.js`). We instruct browsers and CDNs to cache these files for 1 year with `immutable`, while `index.html` remains fresh.

4. **Security Headers**:
   Includes `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, and `Referrer-Policy` to guard against clickjacking and MIME-type sniffing.

---

## How `.dockerignore` Was Configured

The [`.dockerignore`](file:///Users/kanishka/Coding/GoldenGreen/.dockerignore) file prevents unnecessary or sensitive files from entering Docker's build context:

| Category | Patterns | Why Excluded |
| :--- | :--- | :--- |
| **Dependencies** | `node_modules/` | Prevents copying host-specific binaries (e.g. macOS binaries) into the Alpine Linux container. Dependencies are freshly installed inside Docker via `npm ci`. |
| **Build Artifacts** | `dist/`, `dist-ssr/`, `*.tsbuildinfo` | Prevents stale local build outputs from conflicting with the in-container clean build. |
| **Version Control** | `.git/`, `.gitignore` | Reduces the context size significantly and prevents exposing repository commit history inside the build container. |
| **Environment & Secrets** | `.env`, `.env.*` (except `.env.example`) | Prevents accidental leakage of local secrets or private keys into Docker image layers. |
| **Diagnostics & Logs** | `*.log`, `logs/`, `npm-debug.log*` | Avoids uploading local crash logs and debug traces. |
| **OS & Editor Metadata** | `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/` | Keeps the image context free of platform-specific metadata files. |
| **Docker Meta** | `Dockerfile*`, `.dockerignore`, `README.md` | Non-source files that are not needed by the Vite compiler. |

---

## How to Build and Run the Project with Docker

Ensure Docker Desktop (or your Docker engine of choice) is running before executing these commands.

### 1. Build the Docker Image

Run from the root of the project directory:

```bash
docker build -t goldengreen:latest .
```

*Tip: To build without using any cached layers:*
```bash
docker build --no-cache -t goldengreen:latest .
```

### 2. Run the Container

Run the built image in detached mode (`-d`), mapping your host's port `8080` to the container's port `80`:

```bash
docker run -d -p 8080:80 --name goldengreen-app goldengreen:latest
```

The application will now be accessible at:
👉 **[http://localhost:8080](http://localhost:8080)**

### 3. Check Status and Health

Check if the container is running and inspect the healthcheck status:

```bash
docker ps --filter "name=goldengreen-app"
```

Look for `status: healthy` in the output.

### 4. View Container Logs

To view Nginx access and error logs in real-time:

```bash
docker logs -f goldengreen-app
```

### 5. Stop and Remove the Container

When you are done testing or want to tear down the container:

```bash
# Stop the running container
docker stop goldengreen-app

# Remove the container
docker rm goldengreen-app
```

---

## Optional: Docker Compose Workflow

If you prefer managing services with Docker Compose, you can create a [`docker-compose.yml`](file:///Users/kanishka/Coding/GoldenGreen/docker-compose.yml) in the project root:

```yaml
services:
  goldengreen:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: goldengreen-web
    restart: unless-stopped
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
```

Manage it with:
- **Start:** `docker compose up -d --build`
- **Logs:** `docker compose logs -f`
- **Stop:** `docker compose down`
