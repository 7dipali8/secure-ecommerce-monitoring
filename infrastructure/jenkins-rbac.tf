resource "kubernetes_role_v1" "jenkins_deployer" {
  metadata {
    name      = "jenkins-deployer"
    namespace = "ecommerce"
  }

  rule {
    api_groups = ["", "apps", "batch"]
    resources = [
      "pods",
      "pods/log",
      "services",
      "configmaps",
      "secrets",
      "deployments",
      "deployments/scale",
      "replicasets",
      "jobs"
    ]
    verbs = [
      "get",
      "list",
      "watch",
      "create",
      "update",
      "patch",
      "delete"
    ]
  }
}

resource "kubernetes_role_binding_v1" "jenkins_deployer" {
  metadata {
    name      = "jenkins-deployer"
    namespace = "ecommerce"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role_v1.jenkins_deployer.metadata[0].name
  }

  subject {
    kind      = "Group"
    name      = "jenkins-deployer"
    api_group = "rbac.authorization.k8s.io"
  }
}
