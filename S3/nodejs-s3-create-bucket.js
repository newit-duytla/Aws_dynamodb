const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: 'temp',
  secretAccessKey: 'temp',
};

AWS.config.update({
  credentials,
  endpoint: 'http://localhost:4566',
  s3ForcePathStyle: true,
})

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

var params = {
  Bucket: "sampleBucket",
 };

 s3.createBucket(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});
