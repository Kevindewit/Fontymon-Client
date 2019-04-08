pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:6-alpine'
          args '-p 3000:3000'
        }

      }
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      environment {
        CI = 'true'
      }
      steps {
        echo 'Testing ...'
      }
    }
    stage('Deploy') {
      environment {
        CD = 'true'
      }
      steps {
        echo 'Deploying ...'
      }
    }
  }
}