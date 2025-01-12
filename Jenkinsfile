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
        script {
          def resultadoLinter = sh "npm run lint"

          if (resultadoLinter == 0) {
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
        sh "node ./jenkinsScripts/updateReadme.js '${env.TEST_STATUS}'"
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
            echo "Deploying to Vercel..."

            // Instalar la CLI de Vercel
            sh "npm install -g vercel"

            // Autenticarse con el token de Vercel
            sh """
              vercel login ${VERCEL_TOKEN}
              vercel --prod --token ${VERCEL_TOKEN} --confirm
            """
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
          echo "Resultado Build: ${env.BUILD_STATUS}"
          echo "Resultado Update_Readme: ${env.UPDATE_README_STATUS}"
          echo "Resultado Deploy to Vercel: ${env.VERCEL_DEPLOY_STATUS}"
          
          // Si todos los resultados son 'success', la pipeline será exitosa
          def finalResult = 'success'
          if (env.PETICIO_STATUS == 'failure' || env.LINTER_STATUS == 'failure' || env.TEST_STATUS == 'failure' || 
              env.BUILD_STATUS == 'failure' || env.UPDATE_README_STATUS == 'failure' || env.VERCEL_DEPLOY_STATUS == 'failure') {
            finalResult = 'failure'
          }

          echo "El resultado final de la pipeline es: ${finalResult}"
        }
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