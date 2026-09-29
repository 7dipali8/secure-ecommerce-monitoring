data "aws_eks_cluster" "current" {
  name = module.eks.cluster_name
}

data "aws_eks_cluster_auth" "current" {
  name = module.eks.cluster_name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.current.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.current.certificate_authority[0].data)

  token = data.aws_eks_cluster_auth.current.token
}

provider "helm" {
  kubernetes {
    host = data.aws_eks_cluster.current.endpoint

    cluster_ca_certificate = base64decode(
      data.aws_eks_cluster.current.certificate_authority[0].data
    )

    token = data.aws_eks_cluster_auth.current.token
  }
}
