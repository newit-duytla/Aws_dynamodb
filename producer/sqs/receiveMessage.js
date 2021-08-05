const {sqs} = require('./config');

const receiveMessage = async (params) => {
    return sqs.receiveMessage(params).promise();
}

module.exports = {
    receiveMessage
}