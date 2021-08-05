const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

var params = {
  MessageBody: 'This is Message in Sample Queue 1',
  QueueUrl: 'http://localhost:4566/000000000000/QueueName_Sample',
  DelaySeconds: 2000,
  MessageAttributes: {
    'MessageAttributes_Sample': {
      DataType: 'String', /* required */
      StringValue: 'STRING_VALUE'
    },
    /* '<String>': ... */
  },
};

sqs.sendMessage(params, function (err, data) {
  if (err) console.log(err)
  else console.log(data)
})