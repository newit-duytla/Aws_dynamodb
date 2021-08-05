const AWS = require('aws-sdk')

const credentials = {
    accessKeyId: 'temp',
    secretAccessKey: 'temp',
};

AWS.config.update({
    credentials,
    endpoint: process.env.LOCALSTACK_URL,
    s3ForcePathStyle: true,
})

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = {
    s3
}