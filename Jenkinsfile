pipeline {
  agent any
  tools { nodejs 'Node' }
  // parameters {
  //   string(name: 'executor', defaultValue: 'user', description: 'Nom de la persona que executa la pipeline')
  //   string(name: 'motiu', defaultValue: 'motiu', description: 'Motiu pel qual estem executant la pipeline')
  //   string(name: 'chatID', defaultValue: 'num_chat', description: 'ChatID de telegram per a notificar els resultats')
  //}
  stages {
    stage('Petició de dades') {
      steps {
        script {
          // En executar-se, demanarà tres valors per pantalla
          def userInput = input(
            message: 'Introduce los siguientes parámetros:',
            parameters: [
              string(name: 'executor', defaultValue: 'user', description: 'Nom de la persona que executa la pipeline'),
              string(name: 'motiu', defaultValue: 'motiu', description: 'Motiu pel qual estem executant la pipeline'),
              string(name: 'chatID', defaultValue: 'num_chat', description: 'ChatID de telegram per a notificar els resultats')
            ]
          )

          // Acceder a los parámetros proporcionados por el usuario
          def executor = userInput['executor']
          def motiu = userInput['motiu']
          def chatID = userInput['chatID']

          // Mostrar los valores proporcionados por el usuario
          echo "Executor: ${executor}"
          echo "Motiu: ${motiu}"
          echo "Chat ID: ${chatID}"
        }

        sh "node index.js '${params.executor}'"
        sh "node index.js '${params.motiu}'"
        sh "node index.js '${params.chatID}'"
      }
    }
    stage('Linter') {
      steps {
        sh "npm install"
        script {
          def resultadoLinter = sh(script: "npm run lint", returnStatus: true, returnStdout: true)

          if (resultadoLinter == "0") {
            env.LINTER_STATUS = 'success'
          } else {
            env.LINTER_STATUS = 'failure'
          }
        }
      }
    }
    stage('Test') {
      steps {
        script {
          // ejecutamos el test de Jest y lo guardamos en una variable
          def resultadoJest = sh(script: "npm run test", returnStatus: true)

          // Creación de variable de entorno con el resultado
          if (resultadoJest == 0) {
            env.TEST_STATUS = 'success'
          } else {
            env.TEST_STATUS = 'failure'
          }
        }
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
        script {
          def resultadoUpdateReadme = sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'" 

          if (resultadoUpdateReadme == 0) {
            env.UPDATE_README_STATUS = 'success'
          } else {
            env.UPDATE_README_STATUS = 'failure'
          }
        }
      }
    }
    // stage('Push_Changes') {
    //   steps {
    //     echo "Push_Changes"
    //     withCredentials([usernamePassword(credentialsId: 'token-github', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
    //       // Usamos el nombre de usuario y el token para autenticar la URL remota de GitHub
    //       sh """
    //         git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/SantiLopezLasheras/jenkins-obligatoria-prueba.git
    //         git pull --rebase origin main
    //         git add README.md
    //         git commit -m "Pipeline executada per ${params.executor}. Motiu: ${params.motiu}"
    //         git push origin main
    //       """
    //     withCredentials([string(credentialsId: 'token-github', variable: 'GITHUB_TOKEN')]) {
    //       // Ejecutar el script de Node.js, pasando el token de GitHub
    //       sh "node ./jenkinsScripts/pushReadme.js '${params.executor}' '${params.motiu}' '${GITHUB_TOKEN}'"
    //     }
    //   }
    //   }
    // }
    stage('Deploy to Vercel') {
      steps {
        withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
          script {
            def resultadoDeploy = sh(script: "node ./jenkinsScripts/deployVercel.js ${VERCEL_TOKEN}", returnStatus: true, returnStdout: true)

            if (resultadoDeploy == "0") {
              env.DEPLOY_STATUS = 'success'
            } else {
              env.DEPLOY_STATUS = 'failure'
            }

            // sh "npm install -g vercel"

            // sh """
            //   vercel login ${VERCEL_TOKEN}
            //   vercel --prod --token ${VERCEL_TOKEN} --confirm
            // """
          }
        }
      }
    }
    stage('Notificació') {
      steps {
        echo "Notificació"
        script {
          // Accediendo a los resultados de cada etapa
          echo "Resultado Linter: ${env.LINTER_STATUS}"
          echo "Resultado Test: ${env.TEST_STATUS}"
          echo "Resultado Update_Readme: ${env.UPDATE_README_STATUS}"
          echo "Resultado Deploy to Vercel: ${env.DEPLOY_STATUS}"
          
        }
      }
    }
  }
  post {
    always {
      script {
        sh "npm install node-telegram-bot-api"
        sh "node ./jenkinsScripts/sendMessage.js '${params.chatID}' '${env.LINTER_STATUS}' '${env.TEST_STATUS}' '${env.UPDATE_README_STATUS}' '${env.DEPLOY_STATUS}'"
      }
    }
  }
}