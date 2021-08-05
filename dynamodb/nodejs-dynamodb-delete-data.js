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
 * Sử dụng biểu thức điều kiện ConditionExpression để kiểm tra điều kiện
 * nếu field info.rating <= :val (Expression Attribute Values)
 * Sử dụng biểu thức AttributeValues để gán :val là 5
 */
var params = {
  TableName:TABLE_NAME,
  Key:{
      "year": year,
      "title": title
  },
  ConditionExpression: "info.rating <= :val",
  ExpressAttributeValues: {
    ":val": 5.0
  }
};

console.log("Updating the item...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});