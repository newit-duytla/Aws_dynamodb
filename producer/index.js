require('dotenv').config();

const {createBucket} = require('./s3/createBucketS3');
const {uploadFile} = require('./s3/uploadS3Object');

const {createQueue} = require('./sqs/createQueue');
const {sendMessage} = require('./sqs/sendMessage');

const path = require('path');
const fs = require('fs');

const run = async () => {
    try {
        // Create S3 Bucket
        await createBucket({
            Bucket: process.env.BucketName
        })

        // Create SQS Queue
        const createQueues = await createQueue({
            QueueName: process.env.QueueName, Attributes: {
                FifoQueue: 'true'
            }
        })

        //Upload Images
        const directoryPath = path.join(__dirname, 'assets');
        fs.readdir(directoryPath, async function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            for (const file of files) {
                await uploadFile(process.env.BucketName, file, file);
                const bodyParams = {
                    Key: file,
                    BucketName: process.env.BucketName
                }

                await sendMessage({
                    MessageBody: JSON.stringify(bodyParams), /* required */
                    QueueUrl: createQueues.QueueUrl, /* required */
                    MessageGroupId: "ImageUploaded",
                })
            }
        });
    } catch (e) {
        console.log(e)
    }
}

run().then(result => {
    return result
}).catch(err => {
    return err
})