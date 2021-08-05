const {sqs} = require('./config');

const createQueue = async (params) => {
    return await sqs.createQueue(params).promise();
}

module.exports = {
    createQueue
}