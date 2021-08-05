const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: 'temp',
  secretAccessKey: 'temp',
};

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  credentials,
});

const TABLE_NAME = 'Movies';

/**
 * Khởi tạo docClient
 */
var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Khởi tạo điều kiện để tìm theo year và title
 */
var year = 2015;
var title = 'The Big New Movie';

/**
 * Sử dụng UpdateExpression để remove array có index là 0 trong field info.actors
 * Kiểm tra điều kiện ConditionExpression nếu size của field info.actors
 *  lớn hơn :num (expression attribute values)
 * ExpressionAttributeValues: gán :num đã sử dụng ở ConditionExpression
 *  là 3
 */

var params = {
  TableName: TABLE_NAME,
  Key: {
    year: year,
    title: title,
  },
  UpdateExpression: 'remove info.actors[0]',
  ConditionExpression: 'size(info.actors) > :num',
  ExpressionAttributeValues: {
    ':num': 3,
  },
  ReturnValues: 'UPDATED_NEW',
};

console.log('Attempting a conditional update...');
docClient.update(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to update item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
  }
});
