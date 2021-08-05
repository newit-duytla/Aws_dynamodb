const AWS = require('aws-sdk');
var fs = require('fs');

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

var year = 2015;
var title = "The Big New Movie";

/**
 * Khởi tao input để get data từ table
 * Sẽ get data theo condition ở trong Key object
 */
var params = {
    TableName: TABLE_NAME,
    Key:{
        "year": year,
        "title": title
    }
};

/**
 * Dùng method get trong docClient để thực hiện get data từ table
 */
docClient.get(params, function(err, data) {
  if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});