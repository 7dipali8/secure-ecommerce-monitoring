data "aws_iam_policy_document" "jenkins_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole",
      "sts:TagSession"
    ]
  }
}

resource "aws_iam_role" "jenkins" {
  name = "${var.project_name}-${var.environment}-jenkins-role"

  assume_role_policy = data.aws_iam_policy_document.jenkins_assume_role.json

  tags = {
    Name = "${var.project_name}-${var.environment}-jenkins-role"
  }
}

data "aws_iam_policy_document" "jenkins" {
  statement {
    sid    = "ECRAuthentication"
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]

    resources = ["*"]
  }

  statement {
    sid    = "ECRRepositoryAccess"
    effect = "Allow"

    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:GetDownloadUrlForLayer",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
      "ecr:DescribeRepositories",
      "ecr:DescribeImages"
    ]

    resources = [
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/frontend",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/api-gateway",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/auth-service",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/product-service",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/cart-service",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/order-service",
      "arn:aws:ecr:${var.aws_region}:${var.aws_account_id}:repository/${var.project_name}/payment-service"
    ]
  }

  statement {
    sid    = "ReadRDSSecret"
    effect = "Allow"

    actions = [
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret"
    ]

    resources = [
      var.rds_secret_arn
    ]
  }


  statement {
    sid    = "EKSDescribeCluster"
    effect = "Allow"

    actions = [
      "eks:DescribeCluster"
    ]

    resources = [
      "arn:aws:eks:${var.aws_region}:${var.aws_account_id}:cluster/${var.project_name}-${var.environment}-eks"
    ]
  }
}
resource "aws_iam_role_policy" "jenkins" {
  name   = "${var.project_name}-${var.environment}-jenkins-policy"
  role   = aws_iam_role.jenkins.id
  policy = data.aws_iam_policy_document.jenkins.json
}
