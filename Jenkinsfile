// Tubería de July (SAD-07, sección 8). Etapa 0: pasos 1 a 4 (restauración, comprobaciones, pruebas y
// análisis de seguridad). Los pasos 5 a 7 (imágenes firmadas, despliegue y promoción) entran en la etapa 1.
//
// PO-05: cuando exista la shared library de la cooperativa, se declara aquí y los pasos de abajo pasan a
// llamar a sus funciones:
//   @Library('cooperativa-jenkins@main') _

pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/dotnet/sdk:10.0'
      args '-v /var/run/docker.sock:/var/run/docker.sock'   // Testcontainers en las pruebas de integración
    }
  }

  options {
    timestamps()
    timeout(time: 45, unit: 'MINUTES')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder(logRotator(numToKeepStr: '30'))
  }

  environment {
    CI = 'true'
    DOTNET_CLI_TELEMETRY_OPTOUT = '1'
    DOTNET_NOLOGO = '1'
    NUGET_PACKAGES = "${WORKSPACE}/.nuget/packages"
  }

  stages {
    stage('1. Restauración') {
      steps {
        sh 'dotnet tool restore'
        sh 'dotnet restore July.slnx'
        // Las UIs (etapa 1) se restauran y prueban en su propia etapa con una imagen de Node.
      }
    }

    stage('2. Comprobaciones') {
      // Las mismas que `make check` y el hook pre-push (lección L-05).
      parallel {
        stage('Formato') {
          steps { sh 'dotnet csharpier check .' }
        }
        stage('Compilación y analizadores') {
          steps { sh 'dotnet build July.slnx --no-restore -c Release -p:TreatWarningsAsErrors=true' }
        }
        stage('Trazabilidad de la documentación') {
          when { changeset 'Documentacion/Arquitectura/**' }
          agent { docker { image 'python:3.13-slim'; reuseNode true } }
          steps { sh 'python3 Documentacion/Complementarios/revisiones/verificar-trazabilidad.py' }
        }
      }
    }

    stage('3. Pruebas') {
      steps {
        sh '''
          dotnet test --solution July.slnx --no-build -c Release \
            --report-xunit-trx --results-directory TestResults \
            --coverage --coverage-output-format cobertura
        '''
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'TestResults/**/*.trx'
          archiveArtifacts allowEmptyArchive: true, artifacts: 'TestResults/**/*.cobertura.xml'
        }
      }
    }

    stage('4. Seguridad') {
      parallel {
        stage('Gitleaks') {
          agent { docker { image 'zricethezav/gitleaks:v8.28.0'; reuseNode true; args '--entrypoint=' } }
          steps { sh 'gitleaks git --config .gitleaks.toml --redact --no-banner .' }
        }
        stage('Semgrep') {
          agent { docker { image 'semgrep/semgrep:1.140.0'; reuseNode true } }
          steps { sh 'semgrep scan --config p/csharp --config p/secrets --error --metrics=off src' }
        }
        stage('Trivy (dependencias)') {
          agent { docker { image 'aquasec/trivy:0.67.2'; reuseNode true; args '--entrypoint=' } }
          steps { sh 'trivy fs --scanners vuln --severity HIGH,CRITICAL --exit-code 1 --skip-dirs Documentacion .' }
        }
        stage('SonarQube') {
          when { expression { env.SONAR_HOST_URL } }
          steps {
            withSonarQubeEnv('sonarqube-cooperativa') {
              sh 'echo "SonarScanner for .NET se configura con la shared library (PO-05)"'
            }
          }
        }
      }
    }
  }

  post {
    always { cleanWs(deleteDirs: true, notFailBuild: true) }
  }
}
