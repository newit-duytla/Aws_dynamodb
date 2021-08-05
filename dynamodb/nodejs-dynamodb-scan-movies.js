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
 * Sử dụng ProjectionExpression để lấy ra #yr, title
 * Sử dụng FilterExpression để tạo điều kiện sau khi query đã kết thúc
 * thu hẹp giá trị giá trị trả về
 */
var params = {
  TableName: TABLE_NAME,
  ProjectionExpression: '#yr, title',
  FilterExpression: '#yr between :start_yr and :end_yr',
  ExpressionAttributeNames: {
    '#yr': 'year',
  },
  ExpressionAttributeValues: {
    ':start_yr': 1950,
    ':end_yr': 2013
  },
};

docClient.scan(params, onScan);

function onScan(err, data) {
  if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      // print all the movies
      console.log("Scan succeeded.");
      console.log(data)
  }
}
