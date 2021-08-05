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
 * Input đầu vào dùng để update lại field ở trong database
 * UpdateExpression: gán giá trị :r cho field info.rating
 *                   (sử dụng projection expression để lấy field info.rating ra)
 *                   gán giá trị :p cho field info.plot
 *                   (sử dụng projection expression để lấy field info.plot ra)
 *                   gán giá trị :a cho field info.actors
 *                   (sử dụng projection expression để lấy field info.actors ra)
 * ExpressionAttributeValues: gán value cho UpdateExpression alias đã khai báo
 *  ở trên
 * ReturnValues: sau khi update thành công sẽ trả về fields và value đã được update
 */
var params = {
  TableName:TABLE_NAME,
  Key:{
      "year": year,
      "title": title
  },
  UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
  ExpressionAttributeValues:{
      ":r":5.5,
      ":p":"Everything happens all at once.",
      ":a":["Larry", "Moe", "Curly", "Duy"]
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