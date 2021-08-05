require('dotenv').config();

const {receiveMessage} = require('./sqs/receiveMessage');
const {deleteMessage} = require('./sqs/deleteMessage');
const {getObject} = require('./s3/getS3Object');

const run = async () => {
    try {
        const getMessages = await receiveMessage({
            QueueUrl: 'http://localhost:4566/000000000000/SampleQueue.fifo', /* required */
            WaitTimeSeconds: 0,
            VisibilityTimeout: 10,
        })
        let showObject;
        if (getMessages.Messages) {
            for (const aElement of getMessages.Messages) {
                const parserObjectKey = JSON.parse(aElement.Body)
                showObject = await getObject({
                    Bucket: parserObjectKey.BucketName,
                    Key: parserObjectKey.Key,
                })

                if(showObject) {
                    await deleteMessage({
                        QueueUrl: 'http://localhost:4566/000000000000/SampleQueue.fifo', /* required */
                        ReceiptHandle: aElement.ReceiptHandle /* required */
                    })
                }
            }
        }
        if (showObject) {
            console.log(showObject.Body.toString('utf-8'))
        }
        else {
            console.log(showObject);
        }
    } catch (e) {
        console.log(e)
    }
}

run().then(result => {
    return result
}).catch(err => {
    return err
})