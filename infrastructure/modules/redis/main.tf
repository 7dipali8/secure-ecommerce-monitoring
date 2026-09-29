resource "aws_elasticache_subnet_group" "this" {
  name       = "${var.project_name}-${var.environment}-redis"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "${var.project_name}-${var.environment}-redis-subnet-group"
  }
}

resource "aws_elasticache_replication_group" "this" {
  replication_group_id = "secm-${var.environment}-redis"
  description          = "Redis cache for secure ecommerce monitoring"

  engine         = "redis"
  engine_version = var.engine_version
  node_type      = var.node_type

  num_cache_clusters = 1

  automatic_failover_enabled = false
  multi_az_enabled           = false

  port = 6379

  subnet_group_name  = aws_elasticache_subnet_group.this.name
  security_group_ids = [var.redis_security_group_id]

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  auto_minor_version_upgrade = true

  tags = {
    Name = "${var.project_name}-${var.environment}-redis"
  }
}
