const { s3 } = require('./config');

const createBucket = async (params) => {
    s3.createBucket(params).promise();
}

module.exports = {
    createBucket
}