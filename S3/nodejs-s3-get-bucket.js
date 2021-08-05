const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: 'temp',
  secretAccessKey: 'temp',
};

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
