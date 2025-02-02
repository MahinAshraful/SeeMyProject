terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Create S3 bucket
resource "aws_s3_bucket" "upload_bucket" {
  bucket = "image-upload-bucket-hackbrown-2025"
}

# Enable CORS for the bucket
resource "aws_s3_bucket_cors_configuration" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://${aws_instance.web_server.public_dns}:5173",
    "http://${aws_instance.web_server.public_dns}:5000",
    "http://${aws_instance.web_server.public_dns}:5001"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# Enable static website hosting
resource "aws_s3_bucket_website_configuration" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Disable block public access settings
resource "aws_s3_bucket_public_access_block" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Add bucket policy for public access
resource "aws_s3_bucket_policy" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.upload_bucket.arn}/*"
      },
    ]
  })

  # This dependency ensures the public access block is removed before applying the bucket policy
  depends_on = [aws_s3_bucket_public_access_block.upload_bucket]
}

# Enable bucket versioning (optional but recommended)
resource "aws_s3_bucket_versioning" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Configure bucket ownership (recommended)
resource "aws_s3_bucket_ownership_controls" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Configure default encryption (recommended)
resource "aws_s3_bucket_server_side_encryption_configuration" "upload_bucket" {
  bucket = aws_s3_bucket.upload_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main"
  }
}

# Create public subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main"
  }
}

# Create Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public"
  }
}

# Associate subnet with route table
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Create security group for EC2
resource "aws_security_group" "web_server" {
  name        = "web_server"
  description = "Security group for web server"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP
  }

    ingress {
    description = "Backend 1"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend 2"
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web_server"
  }
}

# Create EC2 instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c7217cdde317cfec"  # Amazon Linux 2023 AMI (update as needed)
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id

  vpc_security_group_ids = [aws_security_group.web_server.id]
  key_name              = "SeeMyProject"  

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name = "web_server"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Update system
              yum update -y

              # Install Node.js
              curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
              yum install -y nodejs

              # Install Python and pip
              yum install -y python3 python3-pip

              # Install development tools
              yum groupinstall -y "Development Tools"

              # Install PM2 globally
              npm install -y pm2 -g

              # Install nginx
              amazon-linux-extras install -y nginx1
              systemctl start nginx
              systemctl enable nginx

              # Install Git
              yum install -y git

              EOF
}

# Create Elastic IP
resource "aws_eip" "web_server" {
  instance = aws_instance.web_server.id
}

# Output values
output "public_ip" {
  value = aws_eip.web_server.public_ip
}

output "public_dns" {
  value = aws_instance.web_server.public_dns
}
