const {sqs} = require('./config');

const deleteMessage = async (params) => {
    return sqs.deleteMessage(params).promise();
}

module.exports = {
    deleteMessage
}