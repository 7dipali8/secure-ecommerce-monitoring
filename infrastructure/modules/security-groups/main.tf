# ---------------------------------------------------------
# Public ALB Security Group
# ---------------------------------------------------------

resource "aws_security_group" "alb" {
  name        = "${var.project_name}-${var.environment}-alb-sg"
  description = "Security group for public application ALB"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-alb-sg"
  }
}

# ---------------------------------------------------------
# EKS Node Security Group
# ---------------------------------------------------------

resource "aws_security_group" "eks_nodes" {
  name        = "${var.project_name}-${var.environment}-eks-nodes-sg"
  description = "Security group for EKS worker nodes"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project_name}-${var.environment}-eks-nodes-sg"
  }
}

# ---------------------------------------------------------
# ALB -> EKS worker nodes
# ---------------------------------------------------------

resource "aws_vpc_security_group_ingress_rule" "alb_to_eks_nodes" {
  security_group_id            = aws_security_group.eks_nodes.id
  referenced_security_group_id = aws_security_group.alb.id

  ip_protocol = "tcp"
  from_port   = 3000
  to_port     = 4000

  description = "Application traffic from ALB"
}

# ---------------------------------------------------------
# EKS worker node -> worker node
# Required for Kubernetes networking, DNS and EKS components
# ---------------------------------------------------------

resource "aws_vpc_security_group_ingress_rule" "eks_nodes_self" {
  security_group_id            = aws_security_group.eks_nodes.id
  referenced_security_group_id = aws_security_group.eks_nodes.id

  ip_protocol = "-1"

  description = "Node to node communication"
}

# ---------------------------------------------------------
# EKS worker nodes -> internet
# ---------------------------------------------------------

resource "aws_vpc_security_group_egress_rule" "eks_nodes_all" {
  security_group_id = aws_security_group.eks_nodes.id

  ip_protocol = "-1"
  cidr_ipv4   = "0.0.0.0/0"

  description = "Allow outbound traffic"
}

# ---------------------------------------------------------
# RDS PostgreSQL Security Group
# ---------------------------------------------------------

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-${var.environment}-rds-sg"
  description = "Security group for PostgreSQL RDS"
  vpc_id      = var.vpc_id

  ingress {
    description     = "PostgreSQL from EKS nodes"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-rds-sg"
  }
}

# ---------------------------------------------------------
# Redis Security Group
# ---------------------------------------------------------

resource "aws_security_group" "redis" {
  name        = "${var.project_name}-${var.environment}-redis-sg"
  description = "Security group for Redis"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Redis from EKS nodes"
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_nodes.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-redis-sg"
  }
}


# ---------------------------------------------------------
# Monitoring ALB Security Group
# ---------------------------------------------------------

resource "aws_security_group" "monitoring_alb" {
  name        = "${var.project_name}-${var.environment}-monitoring-alb-sg"
  description = "Security group for private monitoring ALB"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  ingress {
    description = "HTTPS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-monitoring-alb-sg"
  }
}
