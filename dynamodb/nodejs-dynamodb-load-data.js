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
 * Khởi tạo docClient
 */
var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

/**
 * Đọc file moviedata.json và parse qua kiểu utf8
 */
var allMovies = JSON.parse(fs.readFileSync('./moviedata.json', 'utf8'));

/**
 * Loop qua các movies đã đọc được trong file moviedata.json
 * Định nghĩa TableName
 * gán movie.year cho year field, gán movie.title cho year title, và gán movie.info cho info field
 * Sử dụng method put để create new item vào bảng
 */
allMovies.forEach(function(movie) {
    var params = {
        TableName: TABLE_NAME,
        Item: {
            "year":  movie.year,
            "title": movie.title,
            "info":  movie.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});