output "alb_security_group_id" {
  description = "Public application ALB security group ID"
  value       = aws_security_group.alb.id
}

output "eks_nodes_security_group_id" {
  description = "EKS nodes security group ID"
  value       = aws_security_group.eks_nodes.id
}

output "rds_security_group_id" {
  description = "RDS PostgreSQL security group ID"
  value       = aws_security_group.rds.id
}

output "redis_security_group_id" {
  description = "ElastiCache Redis security group ID"
  value       = aws_security_group.redis.id
}

output "monitoring_alb_security_group_id" {
  description = "Private monitoring ALB security group ID"
  value       = aws_security_group.monitoring_alb.id
}
