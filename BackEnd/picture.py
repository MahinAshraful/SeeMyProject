from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

if not os.path.exists("uploads"):
    os.makedirs("uploads")


@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["image"]
    file.save(f"uploads/{file.filename}")
    return "File uploaded"


if __name__ == "__main__":
    app.run(debug=True, port=5004)
