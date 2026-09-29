resource "aws_db_subnet_group" "this" {
  name       = "${var.project_name}-${var.environment}-rds"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "${var.project_name}-${var.environment}-rds-subnet-group"
  }
}

resource "aws_db_instance" "this" {
  identifier = "${var.project_name}-${var.environment}-postgres"

  engine         = "postgres"
  engine_version = var.engine_version

  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 50
  storage_type          = "gp3"
  storage_encrypted     = true

  db_name  = var.database_name
  username = var.database_username
  port     = 5432

  manage_master_user_password = true

  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [var.rds_security_group_id]

  publicly_accessible = false

  multi_az = false

  backup_retention_period = 1

  deletion_protection = false
  skip_final_snapshot = true

  auto_minor_version_upgrade = true

  tags = {
    Name = "${var.project_name}-${var.environment}-postgres"
  }
}
