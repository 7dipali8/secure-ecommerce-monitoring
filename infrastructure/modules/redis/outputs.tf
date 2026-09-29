output "primary_endpoint" {
  description = "Redis primary endpoint"
  value       = aws_elasticache_replication_group.this.primary_endpoint_address
}

output "port" {
  description = "Redis port"
  value       = aws_elasticache_replication_group.this.port
}

output "replication_group_id" {
  description = "Redis replication group ID"
  value       = aws_elasticache_replication_group.this.id
}
