const { s3 } = require('./config');

const getObject = async (params) => {
    return s3.getObject(params).promise();
}

module.exports = {
    getObject
}