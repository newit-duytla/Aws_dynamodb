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
* Ở trong dynamoDb có hỗ trợ atomic counter, khi sử dụng update method để có
* thể tăng hoặc giảm value của một cái attribute đang tồn tại khi mỗi request
* Gán attribute value ở phần UpdateExpression ví dụ là :val
* Và định nghĩa :val ở phần ExpressionAttributeValues khởi tạo giá trị ban đầu là 1
* Sau mỗi request giá trị này sẽ được :val lần (1 lần)
*/
 var params = {
  TableName: TABLE_NAME,
  Key:{
      "year": year,
      "title": title
  },
  UpdateExpression: "set info.rating = info.rating + :val",
  ExpressionAttributeValues:{
      ":val": 1
  },
  ReturnValues:"UPDATED_NEW"
};


console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});