const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

var params = {
  QueueUrl: 'http://localhost:4566/000000000000/QueueName_Sample', /* required */
  ReceiptHandle: 'axuksyekkvxsiemsefejtekgpslsuofevfedsxqngyraojkpyainujhctuggsuigfyshzxhzukifkbkrvlqavbfmimumvpeajudasigzquvlcfmkauahyvagczpetxnfucmeugmnddeuvkpxdvbasgdksyvturgdmousmrishmegemaoihdnnisez'
};

sqs.deleteMessage(params, function (err, data) {
  if (err) console.log(err)
  else console.log(data)
})