const {s3} = require('./config');

const uploadFile = async (BucketName, fileKey ,fileContent) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: BucketName,
        Key: fileKey, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params).promise();
};

module.exports = {
    uploadFile
}