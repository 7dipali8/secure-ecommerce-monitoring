variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones for the infrastructure"
  type        = list(string)
  default = [
    "ap-south-1a",
    "ap-south-1b"
  ]
}
variable "single_nat_gateway" {
  description = "Use a single NAT Gateway to reduce costs"
  type        = bool
  default     = true
}
