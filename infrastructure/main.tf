module "vpc" {
  source = "./modules/vpc"

  project_name = var.project_name
  environment  = var.environment
}

module "security_groups" {
  source = "./modules/security-groups"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_id
}

module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment

  repository_names = [
    "frontend",
    "api-gateway",
    "auth-service",
    "product-service",
    "cart-service",
    "order-service",
    "payment-service"
  ]
}
module "iam" {
  source = "./modules/iam"

  project_name = var.project_name
  environment  = var.environment
}
module "eks" {
  source = "./modules/eks"

  project_name = var.project_name
  environment  = var.environment

  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids

  cluster_role_arn = module.iam.eks_cluster_role_arn
  node_role_arn    = module.iam.eks_node_role_arn

  node_security_group_id = module.security_groups.eks_nodes_security_group_id

  ebs_csi_role_arn = module.iam.ebs_csi_role_arn

  kubernetes_version  = "1.35"
  node_instance_types = ["t3.small"]

  desired_nodes = 4
  min_nodes     = 3
  max_nodes     = 5
}
module "rds" {
  source = "./modules/rds"

  project_name = var.project_name
  environment  = var.environment

  private_subnet_ids    = module.vpc.private_subnet_ids
  rds_security_group_id = module.security_groups.rds_security_group_id

  database_name     = "ecommerce_db"
  database_username = "ecommerce_admin"

  engine_version = "16"
}

module "redis" {
  source = "./modules/redis"

  project_name = var.project_name
  environment  = var.environment

  private_subnet_ids      = module.vpc.private_subnet_ids
  redis_security_group_id = module.security_groups.redis_security_group_id

  node_type      = "cache.t3.micro"
  engine_version = "7.1"
}

data "aws_caller_identity" "current" {}

data "aws_secretsmanager_secret" "rds" {
  name = "secure-ecommerce-monitoring/rds"
}

module "jenkins" {
  source = "./modules/jenkins"

  project_name     = var.project_name
  environment      = var.environment
  aws_account_id   = data.aws_caller_identity.current.account_id
  aws_region       = var.aws_region
  eks_cluster_name = module.eks.cluster_name
  rds_secret_arn   = data.aws_secretsmanager_secret.rds.arn
}

resource "aws_eks_pod_identity_association" "jenkins" {
  cluster_name    = module.eks.cluster_name
  namespace       = "jenkins"
  service_account = "jenkins"
  role_arn        = module.jenkins.jenkins_role_arn
}

resource "aws_eks_access_entry" "jenkins" {
  cluster_name  = module.eks.cluster_name
  principal_arn = module.jenkins.jenkins_role_arn

  kubernetes_groups = [
    "jenkins-deployer"
  ]

  type = "STANDARD"
}
