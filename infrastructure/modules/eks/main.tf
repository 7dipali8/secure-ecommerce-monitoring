resource "aws_eks_cluster" "this" {
  name     = "${var.project_name}-${var.environment}-eks"
  role_arn = var.cluster_role_arn
  version  = var.kubernetes_version

  vpc_config {
    subnet_ids              = var.private_subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = true
  }

  access_config {
    authentication_mode                         = "API_AND_CONFIG_MAP"
    bootstrap_cluster_creator_admin_permissions = true
  }

  enabled_cluster_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  tags = {
    Name = "${var.project_name}-${var.environment}-eks"
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_policy
  ]
}

resource "aws_iam_role_policy_attachment" "cluster_policy" {
  role       = split("/", var.cluster_role_arn)[1]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_launch_template" "nodes" {
  name_prefix = "${var.project_name}-${var.environment}-nodes-"

  vpc_security_group_ids = [
    var.node_security_group_id
  ]

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "${var.project_name}-${var.environment}-eks-node"
    }
  }
}

resource "aws_eks_node_group" "this" {
  cluster_name    = aws_eks_cluster.this.name
  node_group_name = "${var.project_name}-${var.environment}-nodes"
  node_role_arn   = var.node_role_arn
  subnet_ids      = var.private_subnet_ids

  instance_types = var.node_instance_types

  launch_template {
    id      = aws_launch_template.nodes.id
    version = aws_launch_template.nodes.latest_version
  }

  scaling_config {
    desired_size = var.desired_nodes
    min_size     = var.min_nodes
    max_size     = var.max_nodes
  }

  capacity_type = "ON_DEMAND"

  update_config {
    max_unavailable = 1
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-eks-node"
  }

  depends_on = [
    aws_eks_cluster.this
  ]
}

resource "aws_eks_addon" "vpc_cni" {
  cluster_name = aws_eks_cluster.this.name
  addon_name   = "vpc-cni"

  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"

  depends_on = [
    aws_eks_node_group.this
  ]
}

resource "aws_eks_addon" "coredns" {
  cluster_name = aws_eks_cluster.this.name
  addon_name   = "coredns"

  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"

  depends_on = [
    aws_eks_node_group.this
  ]
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name = aws_eks_cluster.this.name
  addon_name   = "kube-proxy"

  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"

  depends_on = [
    aws_eks_node_group.this
  ]
}

resource "aws_eks_addon" "ebs_csi" {
  cluster_name = aws_eks_cluster.this.name
  addon_name   = "aws-ebs-csi-driver"

  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"

  pod_identity_association {
    service_account = "ebs-csi-controller-sa"
    role_arn        = var.ebs_csi_role_arn
  }

  depends_on = [
    aws_eks_node_group.this,
    aws_eks_addon.pod_identity_agent
  ]
}

resource "aws_eks_addon" "pod_identity_agent" {
  cluster_name = aws_eks_cluster.this.name
  addon_name   = "eks-pod-identity-agent"

  resolve_conflicts_on_create = "OVERWRITE"
  resolve_conflicts_on_update = "OVERWRITE"

  depends_on = [
    aws_eks_node_group.this
  ]
}



# ---------------------------------------------------------
# EKS control plane <-> worker node communication
# ---------------------------------------------------------

resource "aws_vpc_security_group_ingress_rule" "cluster_to_nodes" {
  security_group_id            = var.node_security_group_id
  referenced_security_group_id = aws_eks_cluster.this.vpc_config[0].cluster_security_group_id

  ip_protocol = "tcp"
  from_port   = 10250
  to_port     = 10250

  description = "Allow EKS control plane to kubelet on worker nodes"
}

resource "aws_vpc_security_group_ingress_rule" "nodes_to_cluster" {
  security_group_id            = aws_eks_cluster.this.vpc_config[0].cluster_security_group_id
  referenced_security_group_id = var.node_security_group_id

  ip_protocol = "tcp"
  from_port   = 443
  to_port     = 443

  description = "Allow worker nodes to EKS control plane"
}
