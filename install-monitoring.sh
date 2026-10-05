#!/usr/bin/env bash
set -euo pipefail

CLUSTER="secure-ecommerce-monitoring-production-eks"
NAMESPACE="monitoring"

echo "Checking cluster..."
CONTEXT=$(kubectl config current-context)

if [[ "$CONTEXT" != *"$CLUSTER"* ]]; then
  echo "ERROR: Current context does not match the expected EKS cluster."
  echo "Current context: $CONTEXT"
  exit 1
fi

kubectl get nodes

echo "Installing Metrics Server..."
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/ --force-update
helm repo update metrics-server

helm upgrade --install metrics-server metrics-server/metrics-server \
  --namespace kube-system \
  --set resources.requests.cpu=50m \
  --set resources.requests.memory=64Mi \
  --set resources.limits.cpu=200m \
  --set resources.limits.memory=128Mi \
  --wait --timeout 5m

echo "Adding Prometheus Helm repository..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts --force-update
helm repo update prometheus-community

kubectl create namespace "$NAMESPACE" \
  --dry-run=client -o yaml | kubectl apply -f -

echo "Generating a Grafana admin password..."
GRAFANA_PASSWORD=$(openssl rand -base64 36 | tr -dc 'A-Za-z0-9' | head -c 24)

cat > monitoring-values.yaml <<'VALUES'
grafana:
  enabled: true
  service:
    type: ClusterIP
  resources:
    requests:
      cpu: 50m
      memory: 128Mi
    limits:
      cpu: 300m
      memory: 512Mi
  persistence:
    enabled: false

prometheus:
  enabled: true
  service:
    type: ClusterIP
  prometheusSpec:
    replicas: 1
    retention: 3d
    scrapeInterval: 30s
    evaluationInterval: 30s
    resources:
      requests:
        cpu: 100m
        memory: 512Mi
      limits:
        cpu: 500m
        memory: 1Gi

alertmanager:
  enabled: true
  service:
    type: ClusterIP
  alertmanagerSpec:
    replicas: 1
    resources:
      requests:
        cpu: 50m
        memory: 128Mi
      limits:
        cpu: 200m
        memory: 256Mi

kube-state-metrics:
  enabled: true
  resources:
    requests:
      cpu: 50m
      memory: 64Mi
    limits:
      cpu: 200m
      memory: 128Mi

prometheus-node-exporter:
  enabled: true
  resources:
    requests:
      cpu: 25m
      memory: 32Mi
    limits:
      cpu: 100m
      memory: 128Mi

defaultRules:
  create: true
VALUES

echo "Installing Prometheus, Grafana, and Alertmanager..."
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  --namespace "$NAMESPACE" \
  --values monitoring-values.yaml \
  --set grafana.adminPassword="$GRAFANA_PASSWORD" \
  --wait --timeout 15m

echo "Saving Grafana password in Kubernetes Secret..."
kubectl create secret generic shopnest-grafana-login \
  --namespace "$NAMESPACE" \
  --from-literal=admin-password="$GRAFANA_PASSWORD" \
  --dry-run=client -o yaml | kubectl apply -f -

unset GRAFANA_PASSWORD

echo "Installation commands completed."
echo "Checking monitoring pods..."
kubectl get pods -n "$NAMESPACE"
kubectl get svc -n "$NAMESPACE"
echo "Checking Metrics Server..."
kubectl top nodes || true
