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

const TABLE_NAME = "Movies"

/**
 * Khởi tạo document Client
 */
var docClient = new AWS.DynamoDB.DocumentClient();

const year = 2015;
const title = 'The Big New Movie';

/**
 * Khởi tao input để put data vào table
 */
const params = {
  TableName: TABLE_NAME,
  Item: {
    "year": year,
    "title": title,
    "info": {
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  }
}

console.log('Adding a new item...')

/**
 * Dùng method put ở trong docClient để thử hiện put data vào table
 */
docClient.put(params, function (err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
  }
})