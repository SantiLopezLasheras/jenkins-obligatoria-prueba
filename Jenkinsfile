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
          def executor = userInput.executor
          def motiu = userInput.motiu

          // Mostrar los valores proporcionados por el usuario // no me funciona, me devuelve null en otros stages, guardarlo en variable de entorno ? env.executor = userInput?
          echo "Executor: ${executor}"
          echo "Motiu: ${motiu}"
        }

        sh "node index.js '${params.executor}'"
        sh "node index.js '${params.motiu}'"
        sh "node index.js '${params.chatID}'"
      }
    }
    stage('Linter') {
      steps {
        script {
          try {
            sh "npm install"
            sh "npm run lint"
            env.LINTER_STATUS = 'success'
          } catch (e) {
            console.log(e)
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
        script {
          echo "Update_Readme"

          try {
            sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'" 
            env.UPDATE_README_STATUS = 'success'
          } catch (e) {
            console.log(e)
            env.UPDATE_README_STATUS = 'failure'
          }
        }
        // script {
        //   def resultadoUpdateReadme = sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'" 
        // }
      }
    }

    stage('Push_Changes') {
      steps {
        echo "Push_Changes"
        withCredentials([usernamePassword(credentialsId: 'token-github', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
          // Usamos el nombre de usuario y el token para autenticar la URL remota de GitHub
          sh """
            git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/SantiLopezLasheras/jenkins-obligatoria-prueba.git
            git fetch origin
            git status
            git pull -v origin main
            git add README.md
            git status
            git commit -m "Pipeline executada per ${params.executor}. Motiu: ${params.motiu}"
            git status
            git pull origin main
            git push -v origin main
          """
        // withCredentials([string(credentialsId: 'token-github', variable: 'GITHUB_TOKEN')]) {
        //   // Ejecutar el script de Node.js, pasando el token de GitHub
        //   sh "node ./jenkinsScripts/pushReadme.js '${params.executor}' '${params.motiu}' '${GITHUB_TOKEN}'"
        // }
      }
      }
    }
    stage('Deploy to Vercel') {
      steps {
        script {
          echo "Deploy to Vercel"

          try {
            withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
              script {
                sh "node ./jenkinsScripts/deployVercel.js ${VERCEL_TOKEN}"
              }
            }
            sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'" 
          } catch (e) {
            console.log(e)
            env.DEPLOY_STATUS = 'failure'
          }
        }
        
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