const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

var params = {
  QueueName: 'QueueName_Sample', /* required */
  Attributes: {
    'QueueName_Sample_Attribute': 'QueueName_Sample_vale',
  },
  tags: {
    'QueueName_Sample_tag': 'QueueName_Sample_tag-value',
    /* '<TagKey>': ... */
  }
};

sqs.createQueue(params, function (err, data) {
  if (err) console.log(err)
  else console.log(data)
})