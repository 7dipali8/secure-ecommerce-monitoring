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
    - /busybox/sh
    args:
    - -c
    - |
        while true; do sleep 3600; done
    tty: true
    env:
    - name: PATH
      value: /busybox:/kaniko:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

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

        EKS_CLUSTER_NAME =
            'secure-ecommerce-monitoring-production-eks'

        KUBE_NAMESPACE = 'ecommerce'

        ECR_REGISTRY =
            '220147487202.dkr.ecr.ap-south-1.amazonaws.com'

        ECR_REPOSITORY_PREFIX =
            '220147487202.dkr.ecr.ap-south-1.amazonaws.com/secure-ecommerce-monitoring'

        ECR_PREFIX =
            '220147487202.dkr.ecr.ap-south-1.amazonaws.com/secure-ecommerce-monitoring'

        KUBECONFIG =
            "${WORKSPACE}/kubeconfig"
    }

    options {

        disableConcurrentBuilds()
        timeout(
            time: 60,
            unit: 'MINUTES'
        )
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

                        echo "================================================"
                        echo "SHOPNEST CI/CD"
                        echo "VERIFY BUILD ENVIRONMENT"
                        echo "================================================"

                        git config --global --add safe.directory "$WORKSPACE"

                        echo ""
                        echo "===== Node ====="
                        node --version

                        echo ""
                        echo "===== NPM ====="
                        npm --version

                        echo ""
                        echo "===== Git ====="
                        git --version

                        echo ""
                        echo "===== Workspace ====="
                        pwd

                        ls -la

                        echo ""
                        echo "===== Git Commit ====="
                        git rev-parse HEAD

                        echo ""
                        echo "===== Repository Structure ====="
                        find . -maxdepth 2 -type d | sort
                    '''
                }

                container('aws') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "AWS IDENTITY"
                        echo "================================================"

                        aws sts get-caller-identity

                        echo ""
                        echo "AWS Region:"
                        echo "$AWS_REGION"
                    '''
                }

                container('kubectl') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "KUBERNETES CLIENT"
                        echo "================================================"

                        kubectl version --client
                    '''
                }

                container('kaniko') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "KANIKO VERSION"
                        echo "================================================"

                        /kaniko/executor version
                    '''
                }
            }
        }


        // ============================================================
        // PREPARE ECR AUTHENTICATION
        // ============================================================

        stage('Prepare ECR Authentication') {

            steps {

                container('aws') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "CREATING ECR AUTHENTICATION"
                        echo "================================================"

                        mkdir -p "$WORKSPACE/.docker"

                        ECR_PASSWORD=$(aws ecr get-login-password \
                            --region "$AWS_REGION")

                        AUTH=$(printf "AWS:%s" "$ECR_PASSWORD" \
                            | base64 | tr -d '\\n')

                        cat > "$WORKSPACE/.docker/config.json" <<EOF
{
  "auths": {
    "${ECR_REGISTRY}": {
      "auth": "${AUTH}"
    }
  }
}
EOF

                        echo ""
                        echo "ECR authentication file created."

                        ls -l "$WORKSPACE/.docker/config.json"
                    '''
                }
            }
        }


        // ============================================================
        // BUILD AND PUSH ALL IMAGES
        // ============================================================

        stage('Build and Push Images') {

            steps {

                script {

                    // ------------------------------------------------
                    // STEP 1
                    // Create completely clean build contexts.
                    // ------------------------------------------------

                    container('tools') {

                        sh '''
                            set -e

                            echo "================================================"
                            echo "PREPARING CLEAN KANIKO BUILD CONTEXTS"
                            echo "================================================"

                            rm -rf "$WORKSPACE/.kaniko-context"

                            mkdir -p "$WORKSPACE/.kaniko-context"

                            echo ""
                            echo "Git commit:"
                            git rev-parse HEAD


                            echo ""
                            echo "===== AUTH SERVICE ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/auth-service"

                            git archive HEAD:services/auth-service \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/auth-service"


                            echo ""
                            echo "===== PRODUCT SERVICE ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/product-service"

                            git archive HEAD:services/product-service \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/product-service"


                            echo ""
                            echo "===== CART SERVICE ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/cart-service"

                            git archive HEAD:services/cart-service \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/cart-service"


                            echo ""
                            echo "===== ORDER SERVICE ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/order-service"

                            git archive HEAD:services/order-service \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/order-service"


                            echo ""
                            echo "===== PAYMENT SERVICE ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/payment-service"

                            git archive HEAD:services/payment-service \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/payment-service"


                            echo ""
                            echo "===== API GATEWAY ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/api-gateway"

                            git archive HEAD:api-gateway \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/api-gateway"


                            echo ""
                            echo "===== FRONTEND ====="

                            mkdir -p \
                              "$WORKSPACE/.kaniko-context/frontend"

                            git archive HEAD:frontend \
                              | tar -x \
                              -C "$WORKSPACE/.kaniko-context/frontend"


                            echo ""
                            echo "================================================"
                            echo "CHECKING DOCKERFILES"
                            echo "================================================"

                            test -f \
                              "$WORKSPACE/.kaniko-context/auth-service/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/product-service/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/cart-service/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/order-service/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/payment-service/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/api-gateway/Dockerfile"

                            test -f \
                              "$WORKSPACE/.kaniko-context/frontend/Dockerfile"


                            echo ""
                            echo "All Dockerfiles found."


                            echo ""
                            echo "================================================"
                            echo "VERIFYING PRODUCT SERVICE"
                            echo "================================================"

                            if find \
                              "$WORKSPACE/.kaniko-context/product-service/src" \
                              -type f 2>/dev/null \
                              | grep -E \
                              'auth\\.service\\.ts|users\\.service\\.ts|users\\.controller\\.ts|user\\.entity\\.ts'
                            then

                                echo "ERROR:"
                                echo "Unexpected product-service files detected."

                                exit 1

                            else

                                echo "OK:"
                                echo "No phantom product-service files found."

                            fi


                            echo ""
                            echo "================================================"
                            echo "BUILD CONTEXT PREPARATION COMPLETE"
                            echo "================================================"
                        '''
                    }


                    // ------------------------------------------------
                    // STEP 2
                    //
                    // IMPORTANT:
                    // Enter the Kaniko container ONLY ONCE.
                    //
                    // This fixes the previous:
                    //
                    // Process exited immediately after creation
                    //
                    // error caused by repeatedly entering the Kaniko
                    // container.
                    // ------------------------------------------------

                    container('kaniko') {

                        sh '''
                            set -e

                            echo "================================================"
                            echo "STARTING KANIKO IMAGE BUILDS"
                            echo "================================================"

                            mkdir -p /kaniko/.docker

                            cp \
                              "$WORKSPACE/.docker/config.json" \
                              /kaniko/.docker/config.json

                            echo ""
                            echo "ECR authentication copied."

                            echo ""
                            echo "ECR PREFIX:"
                            echo "$ECR_PREFIX"

                            echo ""
                            echo "BUILD NUMBER:"
                            echo "$BUILD_NUMBER"


                            # ==================================================
                            # AUTH SERVICE
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING AUTH-SERVICE"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/auth-service" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/auth-service/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/auth-service:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/auth-service:latest" \
                              --cleanup

                            echo "AUTH-SERVICE PUSHED SUCCESSFULLY."


                            # ==================================================
                            # PRODUCT SERVICE
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING PRODUCT-SERVICE"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/product-service" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/product-service/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/product-service:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/product-service:latest" \
                              --cleanup

                            echo "PRODUCT-SERVICE PUSHED SUCCESSFULLY."


                            # ==================================================
                            # CART SERVICE
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING CART-SERVICE"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/cart-service" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/cart-service/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/cart-service:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/cart-service:latest" \
                              --cleanup

                            echo "CART-SERVICE PUSHED SUCCESSFULLY."


                            # ==================================================
                            # ORDER SERVICE
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING ORDER-SERVICE"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/order-service" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/order-service/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/order-service:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/order-service:latest" \
                              --cleanup

                            echo "ORDER-SERVICE PUSHED SUCCESSFULLY."


                            # ==================================================
                            # PAYMENT SERVICE
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING PAYMENT-SERVICE"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/payment-service" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/payment-service/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/payment-service:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/payment-service:latest" \
                              --cleanup

                            echo "PAYMENT-SERVICE PUSHED SUCCESSFULLY."


                            # ==================================================
                            # API GATEWAY
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING API-GATEWAY"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/api-gateway" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/api-gateway/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/api-gateway:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/api-gateway:latest" \
                              --cleanup

                            echo "API-GATEWAY PUSHED SUCCESSFULLY."


                            # ==================================================
                            # FRONTEND
                            # ==================================================

                            echo ""
                            echo "================================================"
                            echo "BUILDING FRONTEND"
                            echo "================================================"

                            /kaniko/executor \
                              --context \
                              "$WORKSPACE/.kaniko-context/frontend" \
                              --dockerfile \
                              "$WORKSPACE/.kaniko-context/frontend/Dockerfile" \
                              --destination \
                              "$ECR_PREFIX/frontend:$BUILD_NUMBER" \
                              --destination \
                              "$ECR_PREFIX/frontend:latest" \
                              --cleanup \
                              --build-arg \
                              VITE_API_URL=

                            echo "FRONTEND PUSHED SUCCESSFULLY."


                            echo ""
                            echo "================================================"
                            echo "ALL IMAGES BUILT AND PUSHED SUCCESSFULLY"
                            echo "================================================"
                        '''
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

                        echo "================================================"
                        echo "CONFIGURING KUBERNETES ACCESS"
                        echo "================================================"

                        rm -f "$KUBECONFIG"

                        aws eks update-kubeconfig \
                          --region "$AWS_REGION" \
                          --name "$EKS_CLUSTER_NAME" \
                          --kubeconfig "$KUBECONFIG"

                        echo ""
                        echo "Kubeconfig created."

                        ls -l "$KUBECONFIG"
                    '''
                }
         container('kubectl') {

    sh '''
        set -e

        echo "================================================"
        echo "TESTING KUBERNETES ACCESS"
        echo "================================================"

        export KUBECONFIG="$WORKSPACE/kubeconfig"

        echo ""
        echo "===== Ecommerce Namespace ====="

        kubectl get namespace "$KUBE_NAMESPACE" \
          || kubectl create namespace "$KUBE_NAMESPACE"

        echo ""
        echo "===== Ecommerce Pods ====="

        kubectl get pods -n "$KUBE_NAMESPACE"

        echo ""
        echo "===== Ecommerce Services ====="

        kubectl get services -n "$KUBE_NAMESPACE"

        echo ""
        echo "===== Ecommerce Deployments ====="

        kubectl get deployments -n "$KUBE_NAMESPACE"
    '''
}

            }
        }




	        // ============================================================
        // SYNC RDS CREDENTIALS TO KUBERNETES
        // ============================================================

        stage('Sync RDS Credentials') {

            steps {

                container('aws') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "SYNCING RDS CREDENTIALS TO KUBERNETES"
                        echo "================================================"

                        SECRET_JSON="$(aws secretsmanager get-secret-value \
                          --secret-id secure-ecommerce-monitoring/rds \
                          --region "$AWS_REGION" \
                          --query SecretString \
                          --output text)"

                        echo "AWS Secrets Manager secret retrieved successfully."

                        USERNAME="$(printf '%s' "$SECRET_JSON" | sed -n 's/.*"username":"\\([^"]*\\)".*/\\1/p')"
                        PASSWORD="$(printf '%s' "$SECRET_JSON" | sed -n 's/.*"password":"\\([^"]*\\)".*/\\1/p')"
                        HOST="$(printf '%s' "$SECRET_JSON" | sed -n 's/.*"host":"\\([^"]*\\)".*/\\1/p')"
                        PORT="$(printf '%s' "$SECRET_JSON" | sed -n 's/.*"port":\\([0-9]*\\).*/\\1/p')"
                        DBNAME="$(printf '%s' "$SECRET_JSON" | sed -n 's/.*"dbname":"\\([^"]*\\)".*/\\1/p')"

                        if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ] || [ -z "$HOST" ] || [ -z "$PORT" ] || [ -z "$DBNAME" ]; then
                            echo "ERROR: Required RDS credentials are missing from AWS Secrets Manager."
                            exit 1
                        fi

                        printf 'username=%s\\npassword=%s\\nhost=%s\\nport=%s\\ndbname=%s\\n' \
                          "$USERNAME" \
                          "$PASSWORD" \
                          "$HOST" \
                          "$PORT" \
                          "$DBNAME" \
                          > "$WORKSPACE/rds-credentials.env"

                        chmod 600 "$WORKSPACE/rds-credentials.env"

                        echo "RDS credentials prepared for Kubernetes."
                    '''
                }

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        kubectl create secret generic rds-credentials \
                          --namespace "$KUBE_NAMESPACE" \
                          --from-env-file="$WORKSPACE/rds-credentials.env" \
                          --dry-run=client \
                          -o yaml \
                          | kubectl apply -f -

                        rm -f "$WORKSPACE/rds-credentials.env"

                        echo ""
                        echo "RDS Kubernetes Secret synchronized successfully."

                        kubectl get secret rds-credentials \
                          -n "$KUBE_NAMESPACE"
                    '''
                }
            }
        }


        // ============================================================
        // SYNC JWT SECRET TO KUBERNETES
        // ============================================================

        stage('Sync JWT Secret') {

            steps {

                container('aws') {

                    sh '''
                        set -e

                        echo "================================================"
                        echo "SYNCING JWT SECRET TO KUBERNETES"
                        echo "================================================"

                        JWT_JSON="$(aws secretsmanager get-secret-value \
                          --secret-id secure-ecommerce-monitoring/jwt \
                          --region "$AWS_REGION" \
                          --query SecretString \
                          --output text)"

                        JWT_SECRET="$(printf '%s' "$JWT_JSON" | sed -n 's/.*"JWT_SECRET":"\\([^"]*\\)".*/\\1/p')"

                        if [ -z "$JWT_SECRET" ]; then
                            echo "ERROR: JWT_SECRET is missing from AWS Secrets Manager."
                            exit 1
                        fi

                        printf '%s' "$JWT_SECRET" > "$WORKSPACE/jwt-secret.txt"
                        chmod 600 "$WORKSPACE/jwt-secret.txt"

                        echo "JWT secret retrieved successfully."
                    '''
                }

                container('kubectl') {

                    sh '''
                        set -e

                        export KUBECONFIG="$WORKSPACE/kubeconfig"

                        kubectl create secret generic jwt-secret \
                          --namespace "$KUBE_NAMESPACE" \
                          --from-file=JWT_SECRET="$WORKSPACE/jwt-secret.txt" \
                          --dry-run=client \
                          -o yaml \
                          | kubectl apply -f -

                        rm -f "$WORKSPACE/jwt-secret.txt"

                        echo ""
                        echo "JWT Kubernetes Secret synchronized successfully."

                        kubectl get secret jwt-secret \
                          -n "$KUBE_NAMESPACE"
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

                        echo "================================================"
                        echo "DEPLOYING KUBERNETES MANIFESTS"
                        echo "================================================"

                        echo ""
                        echo "Kubernetes manifests:"

                        find "$WORKSPACE/k8s" \
                          -maxdepth 1 \
                          -type f \
                          -name '*.yaml' \
                          -o \
                          -name '*.yml' \
                          | sort


                        echo ""
                        echo "Applying manifests..."


			for manifest in "$WORKSPACE"/k8s/*.yaml; do
    if [ "$(basename "$manifest")" != "namespace.yaml" ]; then
        kubectl apply -f "$manifest" -n "$KUBE_NAMESPACE"
    fi
done

                        echo ""
                        echo "================================================"
                        echo "KUBERNETES MANIFESTS APPLIED"
                        echo "================================================"

                        kubectl get all \
                          -n "$KUBE_NAMESPACE"
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

                        echo "================================================"
                        echo "UPDATING IMAGE VERSIONS"
                        echo "================================================"

                        echo ""
                        echo "Build number:"
                        echo "$BUILD_NUMBER"


                        echo ""
                        echo "===== Auth Service ====="

                        kubectl set image \
                          deployment/auth-service \
                          auth-service="$ECR_PREFIX/auth-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== Product Service ====="

                        kubectl set image \
                          deployment/product-service \
                          product-service="$ECR_PREFIX/product-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== Cart Service ====="

                        kubectl set image \
                          deployment/cart-service \
                          cart-service="$ECR_PREFIX/cart-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== Order Service ====="

                        kubectl set image \
                          deployment/order-service \
                          order-service="$ECR_PREFIX/order-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== Payment Service ====="

                        kubectl set image \
                          deployment/payment-service \
                          payment-service="$ECR_PREFIX/payment-service:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== API Gateway ====="

                        kubectl set image \
                          deployment/api-gateway \
                          api-gateway="$ECR_PREFIX/api-gateway:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "===== Frontend ====="

                        kubectl set image \
                          deployment/frontend \
                          frontend="$ECR_PREFIX/frontend:$BUILD_NUMBER" \
                          -n "$KUBE_NAMESPACE" \
                          --record=false \
                          || true


                        echo ""
                        echo "================================================"
                        echo "IMAGE VERSION UPDATE COMPLETE"
                        echo "================================================"

                        kubectl get deployments \
                          -n "$KUBE_NAMESPACE" \
                          -o wide
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

                        echo "================================================"
                        echo "WAITING FOR KUBERNETES ROLLOUTS"
                        echo "================================================"


                        echo ""
                        echo "===== Auth Service ====="

                        kubectl rollout status \
                          deployment/auth-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== Product Service ====="

                        kubectl rollout status \
                          deployment/product-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== Cart Service ====="

                        kubectl rollout status \
                          deployment/cart-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== Order Service ====="

                        kubectl rollout status \
                          deployment/order-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== Payment Service ====="

                        kubectl rollout status \
                          deployment/payment-service \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== API Gateway ====="

                        kubectl rollout status \
                          deployment/api-gateway \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "===== Frontend ====="

                        kubectl rollout status \
                          deployment/frontend \
                          -n "$KUBE_NAMESPACE" \
                          --timeout=5m \
                          || true


                        echo ""
                        echo "================================================"
                        echo "ROLLOUT CHECK COMPLETE"
                        echo "================================================"
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

                        echo "================================================"
                        echo "SHOPNEST APPLICATION VERIFICATION"
                        echo "================================================"


                        echo ""
                        echo "===== Pods ====="

                        kubectl get pods \
                          -n "$KUBE_NAMESPACE" \
                          -o wide


                        echo ""
                        echo "===== Services ====="

                        kubectl get svc \
                          -n "$KUBE_NAMESPACE"


                        echo ""
                        echo "===== Deployments ====="

                        kubectl get deployments \
                          -n "$KUBE_NAMESPACE"


                        echo ""
                        echo "===== Frontend Service ====="

                        kubectl get svc frontend \
                          -n "$KUBE_NAMESPACE" \
                          -o wide


                        echo ""
                        echo "===== API Gateway Service ====="

                        kubectl get svc api-gateway \
                          -n "$KUBE_NAMESPACE" \
                          -o wide \
                          || true


                        echo ""
                        echo "===== Application Verification Complete ====="
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
