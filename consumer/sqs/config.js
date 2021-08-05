const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
    apiVersion: process.env.apiVersionSQS,
    region: process.env.region,
    endpoint: process.env.LOCALSTACK_URL,
});

module.exports = {
    sqs
}