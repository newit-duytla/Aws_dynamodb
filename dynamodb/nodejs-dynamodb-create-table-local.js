const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: 'temp',
  secretAccessKey: 'temp',
};

AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:4566',
});

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  credentials,
});

const TABLE_NAME ="Movies"

/**
 * Xác định table name
 * KeySchme xác định primary key (HASH key "partition key" cho year field - Range key "sort key" cho title field)
 *  Sẽ đưa tất cả fields year vào 1 vùng partition và các key year sẽ được sắp xếp theo sort key
 * AttributeDefinitions định nghĩa type của attribute (year field là N = number - title field là S = string)
 */
var paramsCreateNewTable = {
  TableName: TABLE_NAME,
  KeySchema: [
    {AttributeName: "year", KeyType: 'HASH'},
    {AttributeName: "title", KeyType: 'RANGE'}
  ],
  AttributeDefinitions: [
    {AttributeName: "year", AttributeType: "N"},
    {AttributeName: "title", AttributeType: "S"},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

/**
 * Dùng hàm createTable trong dynamoDB sdk để tạo ra table mới
 */
dynamodb.createTable(paramsCreateNewTable,function(err, data) {
  if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
})
