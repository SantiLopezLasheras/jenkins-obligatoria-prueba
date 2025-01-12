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
      script {
        // ejecutamos el test de Jest y lo guardamos en una variable
        def resultadoJest = sh(script: "npm run test", returnStatus: true)

        // Creación de variable de entorno con el resultado
        if (resultadoJest == 0) {
          env.TEST_STATUS = 'success'
        } else {
          env.TEST_STATUS = 'failure'
        }

        // echo para probar
        echo "Test status: ${env.TEST_STATUS}"
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
        echo env.res_stage1
        echo env.res_stage2
        echo env.res_stage3
        echo env.res_stage4
        
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