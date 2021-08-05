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

console.log('Querying for movies from 2014.');

/**
 * Sử dụng KeyConditionExpression cho Query data
 * Kiểm tra điều kiện #yr = :yyyy (year = 2014)
 * Trong đó #yr là ExpressionAttributeNames của year field
 *          :yyyy là ExpressionAttributeValues là 2014
 */
// var params = {
//   TableName: TABLE_NAME,
//   KeyConditionExpression: '#yr = :yyyy',
//   ExpressionAttributeNames: {
//     '#yr': 'year',
//   },
//   ExpressionAttributeValues: {
//     ':yyyy': 2014,
//   },
// };

/**
 * ProjectExpression lấy ra các field #yr, title, info.genres, info.actors[0],
 * Sử dụng KeyConditionExpression để kiểm tra điều kiện cho fields #yr = :yyyy và letter1 <= title <= letter2
 * Sử dụng ExpressionAttributeNames để tạo alias cho field year là #yr
 * Sử dụng ExpressionAttributeValues để gán value của alias fields
 */
const newParams = {
  TableName: TABLE_NAME,
  ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
  KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
  ExpressionAttributeNames: {
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":yyyy": 2014,
    ":letter1": 'A',
    ":letter2": "L",
  }
}

docClient.query(newParams, function (err, data) {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
  } else {
    console.log('Query succeeded.');
    console.log(data)
  }
});
