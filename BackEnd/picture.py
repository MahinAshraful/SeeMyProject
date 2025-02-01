from flask import Flask, request
from flask_cors import CORS
import boto3
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

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


@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        if not BUCKET_NAME:
            raise ValueError("AWS_BUCKET_NAME not set in environment variables")

        file = request.files["image"]
        filename = secure_filename(file.filename)

        # Upload to S3
        s3.upload_fileobj(
            file, BUCKET_NAME, filename, ExtraArgs={"ContentType": file.content_type}
        )

        # Get the URL of the uploaded file
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"
        return {"message": "File uploaded", "url": file_url}, 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": str(e)}, 500


if __name__ == "__main__":
    app.run(debug=True, port=5004)
