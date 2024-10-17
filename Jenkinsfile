pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }
    stages {
        stage('Checkout') {
            steps {
              sh 'git clone https://github.com/team-1-genics-2024/BE'
            }
        }
        stage('Load Env File') {
            steps {
                // Mengambil secret file .env dari Jenkins Credentials dan memuatnya
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    // Menyalin secret file dari Jenkins credentials ke dalam workspace sebagai .env
                    sh 'cp $ENV_FILE .env'

                    sh 'pwd && ls -la'
                    
                    // Memuat environment variables dari file .env untuk digunakan dalam build
                    sh 'set -a && . .env && set +a'
                    
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
                        ssh -o StrictHostKeyChecking=no yuta@${DEV_IP} '
                            cd /BE &&
                            git pull origin main &&
                            npm install &&
                            npm run build &&
                            npm run deploy:dev
                        '
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
            githubNotify context: 'jenkins', status: 'success', description: 'Build passed!'
        }

        failure {
            githubNotify context: 'jenkins', status: 'failure', description: 'Build failed!'
        }
    }
}