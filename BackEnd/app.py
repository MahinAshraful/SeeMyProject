from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI
import boto3
import json
import uuid
from pymongo import MongoClient
from datetime import datetime
import certifi

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Connect to MongoDB using your env variables
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

# Test connection
db = client.test

# Initialize S3 client
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    aws_session_token=os.getenv("AWS_SESSION_TOKEN"),
    region_name=os.getenv("AWS_DEFAULT_REGION", "us-east-1"),
)

# Get bucket name from environment variables
BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_system_design(user_input):
    # Structured prompt for OpenAI
    prompt = f"""
    Create a detailed development workflow for {user_input['project_name']} as a structured JSON array.
    
    Project Context:
    - Description: {user_input['project_description']}
    - Core technologies: {', '.join(user_input['technologies'])}
    - New technologies used in this project: {', '.join(user_input['new_technologies'])}
    - Additional info: {user_input['additional_info']}
    
    Generate an array of workflow cards where each card follows this exact structure:
    {{
        "id": "unique_string",
        "name": "component/task name",
        "type": "learn" | "build" | "deploy",
        "description": "detailed description of the task",
        "technologies": ["specific technologies needed"],
        "dependencies": ["ids of prerequisite cards"],
        "category": "frontend" | "backend" | "database" | "deployment",
        "resources": ["relevant documentation links or learning resources"]
    }}

    Requirements:
    1. Be specific dont just say learn this technology
    2. Pay attention to what they already know and dont know
    3. You may use relevant technologies from the project context
    4. Include 1-2 resources for each card
    5. Each catergory(frontend, backend, database, deployment) must have at least 1 card
    6. Include specific implementation details and unqiue resources
    7. Ensure proper dependency chains between cards
    8. ONLY Return only the JSON array without any additional text
    """

    try:
        # Call OpenAI API with structured prompt
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a system design expert specialized in creating detailed technical workflows. Structure all responses as valid JSON arrays with comprehensive implementation details.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,  # Lower temperature for more consistent, structured outputs
            max_tokens=4000,  # Ensure enough space for detailed workflows
            presence_penalty=0.1,  # Slight penalty to prevent repetition
            frequency_penalty=0.1,  # Slight penalty to encourage diverse technology suggestions
        )

        # Extract and return the JSON content
        return response.choices[0].message.content

    except Exception as e:
        return f"Error generating workflow: {str(e)}"


def upload_to_s3(file_content, file_name):
    try:
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=file_name,
            Body=file_content,
            ContentType="application/json",
        )
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_name}"
        print("File uploaded successfully:", file_url)
        return file_url
    except Exception as e:
        print("Error uploading file:", e)
        return None


@app.route("/get-input", methods=["POST"])
def generate():
    user_input = request.json
    user_email = user_input.get("userEmail")

    # Generate and upload to S3 as before
    system_design = generate_system_design(user_input)
    file_name = f"system_design_{uuid.uuid4()}.json"
    file_url = upload_to_s3(system_design, file_name)

    # Add just the URL string to user's links array
    if user_email:
        try:
            db.links.update_one(
                {"email": user_email},
                {"$push": {"links": file_url}},  # Correct syntax: push to 'links' array
            )
            print(f"Successfully added link for user: {user_email}")
        except Exception as e:
            print(f"Error updating links for {user_email}: {e}")

    return jsonify({"s3_link": file_url})

@app.route("/get-json", methods=["POST"])
def generate_json():
    user_input = request.json
    user_email = user_input.get("userEmail")

    # Generate and upload to S3 as before
    system_design = generate_system_design(user_input)
    return jsonify({"json": system_design})


if __name__ == "__main__":
    app.run(debug=True)
