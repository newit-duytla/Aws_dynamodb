const AWS = require('aws-sdk');
const fs = require('fs');
var path = require('path');

const credentials = {
  accessKeyId: 'temp',
  secretAccessKey: 'temp',
};

AWS.config.update({
  credentials,
  endpoint: 'http://localhost:4566',
  s3ForcePathStyle: true,
});

var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const params = {
  Bucket: 'sampleBucket',
  Key: "moviedata.json"
};

s3.deleteObject(params, function (err, data) {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
