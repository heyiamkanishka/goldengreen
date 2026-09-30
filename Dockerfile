# ==============================================================================
# Multi-Stage Dockerfile for GoldenGreen (Vite + React SPA)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Environment
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install exact dependencies deterministically
RUN npm ci

# Copy the remaining project files
COPY . .

# Run TypeScript compilation and Vite production build
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Server Environment
# ------------------------------------------------------------------------------
FROM nginx:alpine AS runner

# Clean default Nginx web root and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration tailored for single-page apps
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Health check to ensure Nginx is responding to requests
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
