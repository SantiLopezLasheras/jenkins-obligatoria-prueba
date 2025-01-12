pipeline {
  agent any
  tools { nodejs 'Node' }
  parameters {
    string(name: 'executor', defaultValue: 'user', description: 'Nom de la persona que executa la pipeline')
    string(name: 'motiu', defaultValue: 'motiu', description: 'Motiu pel qual estem executant la pipeline')
    string(name: 'chatID', defaultValue: 'num_chat', description: 'ChatID de telegram per a notificar els resultats')
  }
  stages {
    stage('Petició de dades') {
      steps {
        sh "node index.js '${params.executor}'"
        sh "node index.js '${params.motiu}'"
        sh "node index.js '${params.chatID}'"
      }
    }
    stage('Linter') {
      steps {
        sh "npm install"
        sh "npm run lint"
      }
    }
    stage('Test') {
      steps {
        sh "npm run test"
      }
    }
    stage('Build') {
      steps {
        sh "npm run build"
      }
    }
    stage('Update_Readme') {
      steps {
        echo "Update_Readme"
      }
    }
    stage('Push_Changes') {
      steps {
        echo "Push_Changes"
      }
    }
    stage('Deploy to Vercel') {
      steps {
        echo "Deploy to Vercel"
      }
    }
    stage('Notificació') {
      steps {
        echo "Notificació"
      }
    }
  }
  post {
    always {
      script {
        sh "npm install node-telegram-bot-api"
        sh "node ./jenkinsScripts/sendMessage.js '${params.motiu}' '${params.chatID}'"
      }
    }
  }
}