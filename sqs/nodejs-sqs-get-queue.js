const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

var params = {
  QueueName: 'QueueName_Sample', /* required */
  QueueOwnerAWSAccountId: '4JHX5KZYCTZYBP00R5XDVHB9BL6JO0G3X750275ANVM5JPFI92BM'
};

sqs.getQueueUrl(params, function (err, data) {
  if (err) console.log(err)
  else console.log(data)
})