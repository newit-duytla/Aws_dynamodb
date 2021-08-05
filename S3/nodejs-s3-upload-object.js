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

const fileName = 'moviedata.json';

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(`${path.dirname(__filename)}/${fileName}`);
  // Setting up S3 upload parameters
  const params = {
      Bucket: 'sampleBucket',
      Key: fileName, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile(fileName);
