variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs"
  type        = list(string)
}

variable "rds_security_group_id" {
  description = "RDS security group ID"
  type        = string
}

variable "database_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "ecommerce_db"
}

variable "database_username" {
  description = "PostgreSQL username"
  type        = string
  default     = "ecommerce_admin"
}

variable "engine_version" {
  description = "PostgreSQL engine version"
  type        = string
  default     = "16"
}
