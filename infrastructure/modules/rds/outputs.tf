output "endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.this.address
}

output "port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.this.port
}

output "database_name" {
  description = "Database name"
  value       = aws_db_instance.this.db_name
}

output "username" {
  description = "Database username"
  value       = aws_db_instance.this.username
  sensitive   = true
}
