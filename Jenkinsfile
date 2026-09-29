pipeline {
    agent {
        kubernetes {
            defaultContainer 'tools'

            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: shopnest-build-agent
spec:
  serviceAccountName: jenkins
  restartPolicy: Never

  containers:

  - name: tools
    image: node:22-bookworm
    command:
    - sleep
    args:
    - infinity
    tty: true

  - name: aws
    image: amazon/aws-cli:2.27.41
    command:
    - sleep
    args:
    - infinity
    tty: true

  - name: kaniko
    image: gcr.io/kaniko-project/executor:v1.23.2-debug
    command:
    - sleep
    args:
    - infinity
    tty: true

  - name: kubectl
    image: alpine/k8s:1.35.0
    command:
    - sleep
    args:
    - infinity
'''
        }
    }

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '220147487202'
        ECR_REGISTRY = '220147487202.dkr.ecr.ap-south-1.amazonaws.com'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Build Agent') {
            steps {
                container('tools') {
                    sh '''
                        echo "=== Node ==="
                        node --version
                        npm --version

                        echo "=== Source ==="
                        pwd
                        ls -la

                        echo "=== Dockerfiles ==="
                        find . -name Dockerfile -print
                    '''
                }

                container('aws') {
                    sh '''
                        echo "=== AWS Identity ==="
                        aws sts get-caller-identity

                        echo "=== AWS Region ==="
                        aws configure get region || true
                    '''
                }

                container('kubectl') {
                    sh '''
                        echo "=== Kubernetes ==="
                        kubectl version --client
                    '''
                }

                container('kaniko') {
                    sh '''
                        echo "=== Kaniko ==="
                        /kaniko/executor version
                    '''
                }
            }
        }

        stage('Pipeline Ready') {
            steps {
                echo 'ShopNest Kubernetes build agent is working correctly.'
                echo 'No Docker images or Kubernetes workloads were changed.'
            }
        }
    }

    post {
        success {
            echo 'Stage 1 CI/CD verification PASSED.'
        }

        failure {
            echo 'Stage 1 CI/CD verification FAILED.'
        }
    }
}

