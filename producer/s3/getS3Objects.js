const { s3 } = require('./config');

const getAllObject = async (params) => {
    return s3.listObjectsV2(params).promise();
}

module.exports = {
    getAllObject
}