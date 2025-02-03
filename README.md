# SeeMyProject

Transform your project ideas into actionable development roadmaps.

## Overview

SeeMyProject is an intuitive web application designed to bridge the gap between project conception and implementation. By leveraging AI and modern development tools, it helps developers create clear, visual project roadmaps and system architectures.

## Features

- **Project Visualization**

  - Automated system architecture diagram generation
  - Component breakdown for frontend, backend, and database
  - Visual tech stack integration mapping

- **Smart Technology Integration**

  - AI-powered technology stack recommendations
  - Real-time compatibility validation
  - Integrated documentation and learning resources

- **Interactive Learning**
  - Component-based exploration
  - Curated tutorial and guide links
  - Technology-specific best practices

## Tech Stack

- **Frontend**: React
- **Backend**: Python Flask
- **Database**: MongoDB
- **Cloud Infrastructure**: AWS (EC2, S3)
- **Infrastructure as Code**: Terraform
- **AI Integration**: OpenAI

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB
- AWS CLI configured
- Terraform

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Backend Setup:

   ```bash
   cd BackEnd
   pip install -r requirements.txt
   ```

3. Frontend Setup:

   ```bash
   cd FrontEnd
   npm install
   ```

4. Terraform Setup:
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

## Environment Variables

Create a `.env` file in both the backend and frontend directories with the following configurations:

```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
MONGO_DB=test

# Flask
PORT=5001
JWT_SECRET=<your_jwt_secret>

# AWS
AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
AWS_SESSION_TOKEN=<your_aws_session_token>
AWS_BUCKET_NAME=<your_bucket_name>

# OpenAI
OPENAI_API_KEY=<your_openai_api_key>

# Mailtrap
MAILTRAP_TOKEN=<your_mailtrap_token>

# Client URL
CLIENT_URL=http://localhost:5173
```

## Running the Application

1. Start the backend server:

   ```bash
   cd BackEnd
   python app.py
   ```

2. Start the frontend development server:
   ```bash
   cd FrontEnd
   npm run dev
   ```

The application will be available at http://localhost:5173

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support and questions, please open an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Inspiration

SeeMyProject was born from the observation that:

- 30% of beginner programmers abandon their projects before completion
- Developers spend an average of 15% of their time on planning
- Many talented developers struggle with initial project setup and technology choices

Our goal is to streamline the project planning process and help developers turn their ideas into reality more efficiently.
