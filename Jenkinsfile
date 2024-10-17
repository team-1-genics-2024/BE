pipeline {
    agent any

    tools {
        nodejs 'node'
    }
    environment {
        NODE_ENV = 'development'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/team-1-genics-2024/BE.git']]])
            }
        }
        stage('Load Env File') {
            steps {
                // Mengambil secret file .env dari Jenkins Credentials dan memuatnya
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    // Menyalin secret file dari Jenkins credentials ke dalam workspace sebagai .env
                    sh 'cp $ENV_FILE .env'
                    
                    // Menampilkan environment variable tertentu (untuk debugging)
                    sh 'echo "Loaded environment: DATABASE_URL=$DATABASE_URL"'
                }
            }
        }
        stage('Setup log dir') {
            steps {
                sh 'mkdir -p logs'
                sh 'touch logs/prisma.log'
                sh 'touch logs/redis.log'
            }
        }
        stage('install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'echo "Running tests..."'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy and Build on Server') {
            steps {
                // Mengambil IP server dari Jenkins Credentials
                withCredentials([string(credentialsId: 'DEV_SERVER_IP', variable: 'DEV_IP')]) {
                    // Gunakan SSH Agent untuk koneksi ke server
                    sshagent(['SERVER_SSH_KEY_ID']) {
                        // Jalankan command di development server
                        sh """
                        ssh -o StrictHostKeyChecking=no yuta@${DEV_IP} << 'ENDSSH'
                            cd /BE 
                            git pull origin main 
                            npm install 
                            npm run build 
                            npm run deploy:dev
                        ENDSSH
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'rm -f .env'
        }

        success {
            echo 'Build success!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}