pipeline {
    agent any

    environment {
        NODE_VERSION = '23'
    }

    tools {
        nodejs "${NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Himanshu3717/ExamHub.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying..."
                    ssh user@your-server-ip "cd /var/www/project && git pull origin main && npm install && npm run build && pm2 reload all"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
