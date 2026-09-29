variable "aws_region" {
  description = "AWS region for the project"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "secure-ecommerce-monitoring"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}
