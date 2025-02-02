const uploadToS3 = require('./uploadToS3');

const handleSurveySubmission = async (surveyData) => {
  const filePath = './temp/survey.json';
  fs.writeFileSync(filePath, JSON.stringify(surveyData));

  await uploadToS3(filePath);

  // Clean up the temporary file
  fs.unlinkSync(filePath);
};

module.exports = handleSurveySubmission;