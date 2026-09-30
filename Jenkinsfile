pipeline {
    agent any

    environment {
        IMAGE_NAME = 'goldengreen:latest'
        CONTAINER_NAME = 'goldengreen-app'
        HOST_PORT = '8081'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Clean Up Old Container') {
            steps {
                script {
                    // Remove old container if it exists (ignore error if it doesn't exist)
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker run -d -p ${HOST_PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Application is running on http://localhost:${HOST_PORT}"
        }
        failure {
            echo "Pipeline failed. Check the logs above for errors."
        }
    }
}
