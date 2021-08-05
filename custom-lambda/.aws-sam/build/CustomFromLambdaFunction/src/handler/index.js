require('dotenv').config();

exports.customLambda = async (event, context) => {
  console.info('This is custom Lambda function');

  console.log(process.env.TABLE_NAME)
  return 'This is custom Lambda function';
}