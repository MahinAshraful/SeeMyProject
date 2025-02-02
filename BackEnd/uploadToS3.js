const s3 = require('./awsConfig');
const fs = require('fs');

const uploadToS3 = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `surveys/${Date.now()}_survey.json`,
    Body: fileContent,
    ContentType: 'application/json',
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    console.log('File uploaded successfully:', uploadResult.Location);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

module.exports = uploadToS3;