const {sqs} = require('./config');

const sendMessage = async (params) => {
    sqs.sendMessage(params).promise();
}

module.exports = {
    sendMessage
}