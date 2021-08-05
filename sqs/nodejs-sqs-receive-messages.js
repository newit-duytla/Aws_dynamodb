const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

var params = {
  QueueUrl: 'http://localhost:4566/000000000000/QueueName_Sample', /* required */
  AttributeNames: [
    'All',
  ],
  MaxNumberOfMessages: '5',
  VisibilityTimeout: '45',
  WaitTimeSeconds: '2'
};

sqs.receiveMessage(params, function (err, data) {
  if (err) console.log(err)
  else {
    console.log(data)
    if (data.Messages) {
      data.Messages.forEach(mgs => {
        console.log(mgs)
      })
    }
  }
})