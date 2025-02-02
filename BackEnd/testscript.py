import boto3
import json
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


def test_aws_credentials():
    try:
        # Print the credentials we're using (without session token for brevity)
        print("Testing with credentials:")
        print(f"Region: {os.getenv('AWS_DEFAULT_REGION')}")
        print(f"Access Key ID: {os.getenv('AWS_ACCESS_KEY_ID')}")
        print(f"Secret Key ends with: ...{os.getenv('AWS_SECRET_ACCESS_KEY')[-4:]}")
        print(f"Bucket: {os.getenv('AWS_BUCKET_NAME')}")
        print("\nTesting S3 connection...")

        # Initialize the S3 client
        s3 = boto3.client(
            "s3",
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            aws_session_token=os.getenv("AWS_SESSION_TOKEN"),
            region_name=os.getenv("AWS_DEFAULT_REGION"),
        )

        # Try to list buckets
        response = s3.list_buckets()
        print("\nSuccessfully connected to S3!")
        print("Available buckets:")
        for bucket in response["Buckets"]:
            print(f"- {bucket['Name']}")

        # Try to list objects in the specified bucket
        bucket_name = os.getenv("AWS_BUCKET_NAME")
        if bucket_name:
            print(f"\nListing objects in bucket: {bucket_name}")
            response = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=5)
            if "Contents" in response:
                print("Recent objects:")
                for obj in response["Contents"][:5]:
                    print(f"- {obj['Key']}")
            else:
                print("Bucket is empty or you don't have permission to list objects")

        # Test upload
        print("\nTesting file upload...")
        test_content = json.dumps({"test": "content"})
        s3.put_object(
            Bucket=bucket_name,
            Key="test_file.json",
            Body=test_content,
            ContentType="application/json",
        )
        print("Successfully uploaded test file!")

    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        print("\nThis could be due to:")
        print("1. Expired credentials")
        print("2. Invalid credentials")
        print("3. Insufficient permissions")
        print("4. Invalid bucket name")
        print("5. Network connectivity issues")


if __name__ == "__main__":
    test_aws_credentials()
