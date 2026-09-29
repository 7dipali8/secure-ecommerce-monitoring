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
    tty: true
'''
        }
    }

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '220147487202'
        ECR_REGISTRY = '220147487202.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_PREFIX = '220147487202.dkr.ecr.ap-south-1.amazonaws.com/secure-ecommerce-monitoring'
        EKS_CLUSTER = 'secure-ecommerce-monitoring-production-eks'
        KUBE_NAMESPACE = 'ecommerce'
    }

    stages {



        // ============================================================
        // VERIFY BUILD ENVIRONMENT
        // ============================================================

        stage('Verify Build Environment') {
            steps {

                container('tools') {
                    sh '''
                        set -e

                        git config --global --add safe.directory "$WORKSPACE"

                        echo "===== Node ====="
                        node --version

                        echo "===== NPM ====="
                        npm --version

                        echo "===== Git ====="
                        git --version

                        echo "===== Workspace ====="
                        pwd
                        ls -la

                        echo "===== Git Commit ====="
                        git rev-parse HEAD
                    '''
                }

                container('aws') {
                    sh '''
                        set -e

                        echo "===== AWS Identity ====="
                        aws sts get-caller-identity

                        echo "AWS Region:"
                        echo "$AWS_REGION"
                    '''
                }

                container('kubectl') {
                    sh '''
                        set -e

                        echo "===== Kubernetes Client ====="
                        kubectl version --client
                    '''
                }

                container('kaniko') {
                    sh '''
                        set -e

                        echo "===== Kaniko Version ====="
                        /kaniko/executor version
                    '''
                }
            }
        }


        // ============================================================
        // ECR LOGIN
        // ============================================================

        stage('Prepare ECR Authentication') {
            steps {

                container('aws') {
                    sh '''
                        set -e

                        echo "===== Creating ECR authentication ====="

                        mkdir -p "$WORKSPACE/.docker"

                        set +x

                        PASSWORD=$(aws ecr get-login-password \
                          --region "$AWS_REGION")

                        AUTH=$(printf 'AWS:%s' "$PASSWORD" \
                          | base64 \
                          | tr -d '\\n')

                        printf '{"auths":{"%s":{"auth":"%s"}}}\\n' \
                          "$ECR_REGISTRY" \
                          "$AUTH" \
                          > "$WORKSPACE/.docker/config.json"

                        unset PASSWORD
                        unset AUTH

                        set -x

                        echo "ECR authentication file created."

                        ls -l "$WORKSPACE/.docker/config.json"
                    '''
                }
            }
        }


        // ============================================================
        // BUILD AND PUSH DOCKER IMAGES
        // ============================================================

        stage('Build and Push Images') {

            steps {

                script {

                    def services = [
                        [name: 'auth-service',    context: 'services/auth-service'],
                        [name: 'product-service', context: 'services/product-service'],
                        [name: 'cart-service',    context: 'services/cart-service'],
                        [name: 'order-service',   context: 'services/order-service'],
                        [name: 'payment-service', context: 'services/payment-service'],
                        [name: 'api-gateway',     context: 'api-gateway'],
                        [name: 'frontend',        context: 'frontend']
                    ]


                    services.each { service ->

                        echo "=============================================="
                        echo "Building ${service.name}"
                        echo "=============================================="


                        // ------------------------------------------------
                        // CREATE CLEAN BUILD CONTEXT FROM GIT
                        // ------------------------------------------------

                        container('tools') {

                            sh """
                                set -e

                                echo "===== Preparing clean Git build context ====="

                                CONTEXT_DIR="\$WORKSPACE/.kaniko-context/${service.name}"

                                rm -rf "\$CONTEXT_DIR"

                                mkdir -p "\$CONTEXT_DIR"

                                echo "Creating context from Git HEAD..."

                                git archive HEAD:"${service.context}" \
                                  | tar -x -C "\$CONTEXT_DIR"

                                echo "===== Build Context ====="

                                find "\$CONTEXT_DIR" -type f | sort

                                echo "===== Git Commit ====="

                                git rev-parse HEAD

                                echo "===== Dockerfile ====="

                                test -f "\$CONTEXT_DIR/Dockerfile"

                                echo "Dockerfile exists."

                                echo "===== Checking for phantom product files ====="

                                if [ "${service.name}" = "product-service" ]; then

                                    if find "\$CONTEXT_DIR/src" -type f \
                                      | grep -E \
                                      'auth\\.service\\.ts|users\\.service\\.ts|users\\.controller\\.ts|user\\.entity\\.ts'
                                    then
                                        echo "ERROR: Unexpected product-service files detected."
                                        exit 1
                                    else
                                        echo "No phantom product-service files found."
                                    fi

                                fi
                            """
                        }


                        // ------------------------------------------------
                        // KANIKO BUILD
                        // ------------------------------------------------

                        container('kaniko') {

                            sh """
                                set -e

                                CONTEXT_DIR="\$WORKSPACE/.kaniko-context/${service.name}"

                                echo "===== Starting Kaniko ====="
                                echo "Service: ${service.name}"
                                echo "Context: \$CONTEXT_DIR"
                                echo "Dockerfile: \$CONTEXT_DIR/Dockerfile"

                                mkdir -p /kaniko/.docker

                                cp "\$WORKSPACE/.docker/config.json" \
                                   /kaniko/.docker/config.json

                                /kaniko/executor \\
                                  --context "\$CONTEXT_DIR" \\
                                  --dockerfile "\$CONTEXT_DIR/Dockerfile" \\
                                  --destination "\$ECR_PREFIX/${service.name}:\$BUILD_NUMBER" \\
                                  --destination "\$ECR_PREFIX/${service.name}:latest" \\
                                  --cleanup \\
                                  ${service.name == 'frontend' ? '--build-arg VITE_API_URL=' : ''}
                            """
                        }

                    }
                }
            }
        }


        // ============================================================
        // CONFIGURE KUBERNETES ACCESS
        // ============================================================

        stage('Configure Kubernetes Access') {

            steps {

                container('aws') {

                    sh '''
                        set -e

                        echo "===== Configuring EKS kubeconfig ====="

                        aws eks update-kubeconfig \
                          --region "$AWS_REGION" \
                          --name "$EKS_CLUSTER" \
                          --kubeconfig "$WORKSPACE/kubeconfig"

                        echo "Kubeconfig created."
                    '''
                }


                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        echo "===== EKS Cluster ====="

                        kubectl cluster-info

                        echo "===== Nodes ====="

                        kubectl get nodes

                        echo "===== Namespace ====="

                        kubectl get namespace "$KUBE_NAMESPACE" || true
                    '''
                }
            }
        }


        // ============================================================
        // DEPLOY KUBERNETES MANIFESTS
        // ============================================================

        stage('Deploy Kubernetes Manifests') {

            steps {

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        echo "===== Creating Namespace ====="

                        kubectl apply -f k8s/namespace.yaml


                        echo "===== Applying ConfigMap ====="

                        kubectl apply -f k8s/api-gateway-configmap.yaml


                        echo "===== Applying Application Manifests ====="

                        kubectl apply -f k8s/auth-service.yaml

                        kubectl apply -f k8s/product-service.yaml

                        kubectl apply -f k8s/cart-service.yaml

                        kubectl apply -f k8s/order-service.yaml

                        kubectl apply -f k8s/payment-service.yaml

                        kubectl apply -f k8s/api-gateway.yaml

                        kubectl apply -f k8s/frontend.yaml


                        echo "All Kubernetes manifests applied."
                    '''
                }
            }
        }


        // ============================================================
        // UPDATE IMAGE VERSIONS
        // ============================================================

        stage('Update Image Versions') {

            steps {

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        echo "===== Updating application images ====="


                        kubectl set image deployment/auth-service \
                          auth-service="$ECR_PREFIX/auth-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/product-service \
                          product-service="$ECR_PREFIX/product-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/cart-service \
                          cart-service="$ECR_PREFIX/cart-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/order-service \
                          order-service="$ECR_PREFIX/order-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/payment-service \
                          payment-service="$ECR_PREFIX/payment-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/api-gateway \
                          api-gateway="$ECR_PREFIX/api-gateway:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        kubectl set image deployment/frontend \
                          frontend="$ECR_PREFIX/frontend:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE"


                        echo "All deployment images updated to build $BUILD_NUMBER."
                    '''
                }
            }
        }


        // ============================================================
        // WAIT FOR ROLLOUTS
        // ============================================================

        stage('Wait for Rollouts') {

            steps {

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        echo "===== Waiting for Deployments ====="


                        kubectl rollout status deployment/auth-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/product-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/cart-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/order-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/payment-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/api-gateway \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        kubectl rollout status deployment/frontend \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m


                        echo "All deployments rolled out successfully."
                    '''
                }
            }
        }


        // ============================================================
        // APPLICATION VERIFICATION
        // ============================================================

        stage('Application Verification') {

            steps {

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        echo "===== Pods ====="

                        kubectl get pods \
                          -n "$KUBE_NAMESPACE" \
                          -o wide


                        echo "===== Services ====="

                        kubectl get svc \
                          -n "$KUBE_NAMESPACE"


                        echo "===== Deployments ====="

                        kubectl get deployments \
                          -n "$KUBE_NAMESPACE"


                        echo "===== Frontend Service ====="

                        kubectl get svc frontend \
                          -n "$KUBE_NAMESPACE"


                        echo "===== Application verification complete ====="
                    '''
                }
            }
        }
    }


    // ================================================================
    // POST ACTIONS
    // ================================================================

    post {

        success {
            echo 'ShopNest CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'ShopNest CI/CD pipeline failed. Check the stage logs above.'
        }

        always {

            sh '''
                rm -f "$WORKSPACE/kubeconfig" || true

                rm -rf "$WORKSPACE/.docker" || true

                rm -rf "$WORKSPACE/.kaniko-context" || true
            '''
        }
    }
}
