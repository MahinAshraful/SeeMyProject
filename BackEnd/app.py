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
    print("Generating system design for:", json.dumps(user_input, indent=2))

    try:
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

        IMPORTANT: Return ONLY the raw JSON array without any markdown formatting or code blocks.
        DO NOT include ```json or ``` markers. The response should be pure, valid JSON.
        """

        print("Calling OpenAI API...")
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a system design expert. You must return ONLY raw JSON without any markdown formatting or code blocks. No ```json markers or any other decorators.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,
            max_tokens=4000,
            presence_penalty=0.1,
            frequency_penalty=0.1,
        )

        content = response.choices[0].message.content.strip()
        print(
            "OpenAI Response received:", content[:200] + "..."
        )  # Print first 200 chars

        # Remove any potential markdown code block markers
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        content = content.strip()

        # Validate JSON
        try:
            json.loads(content)  # Validate JSON structure
            print("Response is valid JSON")
            return content
        except json.JSONDecodeError as e:
            print("Invalid JSON received:", str(e))
            print("Raw content:", content)
            return None

    except Exception as e:
        print("Error in generate_system_design:", str(e))
        return None


def upload_to_s3(file_content, file_name):
    if not file_content:
        print("No content to upload")
        return None

    try:
        print(f"Uploading to S3... Content length: {len(file_content)}")
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
        print("Error uploading file:", str(e))
        return None


@app.route("/get-input", methods=["POST"])
def generate():
    try:
        user_input = request.json
        print("Received request with input:", json.dumps(user_input, indent=2))

        user_email = user_input.get("userEmail")
        print("User email:", user_email)

        # Generate system design
        system_design = generate_system_design(user_input)
        if not system_design:
            print("No system design generated")
            return jsonify({"error": "Failed to generate system design"}), 500

        # Upload to S3
        file_name = f"system_design_{uuid.uuid4()}.json"
        file_url = upload_to_s3(system_design, file_name)
        if not file_url:
            print("Failed to upload to S3")
            return jsonify({"error": "Failed to upload to S3"}), 500

        # Add URL to user's links array
        if user_email:
            try:
                db.links.update_one(
                    {"email": user_email},
                    {"$push": {"links": file_url}},
                )
                print(f"Successfully added link for user: {user_email}")
            except Exception as e:
                print(f"Error updating links for {user_email}: {e}")

        return jsonify({"s3_link": file_url,
                        "system_design": system_design})

    except Exception as e:
        print("Error in generate endpoint:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/links", methods=["GET"])
def get_user_links():
    user_email = request.args.get("email")
    if not user_email:
        return jsonify({"error": "Email is required"}), 400

    try:
        user_doc = db.links.find_one({"email": user_email})
        if user_doc and "links" in user_doc:
            return jsonify({"links": user_doc["links"]})
        return jsonify({"links": []})
    except Exception as e:
        print(f"Error fetching links for {user_email}: {e}")
        return jsonify({"error": "Failed to fetch links"}), 500


if __name__ == "__main__":
    app.run(debug=True)
