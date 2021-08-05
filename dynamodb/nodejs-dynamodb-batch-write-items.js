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
var dynamoDB = new AWS.DynamoDB();

/**
 * Để sử dụng batchWriteItems input phải có một object là PutRequest
 * Truyền vào Movies là Database Name
 * PutRequest object là multiple input params để thực thi nhiều putItem phía dưới
 * Trong RequestItems chỉ có thể dùng những Expression sau
 *  - ProjectionExpress: Lấy những field ra khi return data
 *  - ExpressionAttirbuteNames: Tạo alias với fields
 *  - ConsistentRead :
 *    + true : sẽ dùng Strongly consistent
 *    + false(default): sẽ dùng Eventually consistent
 */
// var params = {
//   RequestItems: {
//     Movies: [
//       {
//         PutRequest: {
//           Item: {
//             year: {
//               N: "2011"
//             },
//             title: {
//               S: "This Batch Write Item Request"
//             }
//           }
//         },

//         PutRequest: {
//           Item: {
//             year: {
//               N: "2010"
//             },
//             title: {
//               S: "This Batch Write Item Request 1"
//             }
//           }
//         }
//       }
//     ]
//   },
// };

/**
 * Để sử dụng batchWriteItems input phải có một object là DeleteRequest
 * Truyền vào Movies là Database Name
 * DeleteRequest object là multiple input params để thực thi nhiều deleteItem phía dưới
 */
var params = {
  RequestItems: {
    Movies: [
      {
        DeleteRequest: {
          Key: {
            year: {
              N: "2011"
            },
            title: {
              S: "This Batch Write Item Request"
            }
          }
        },

        DeleteRequest: {
          Key: {
            year: {
              N: "2010"
            },
            title: {
              S: "This Batch Write Item Request 1"
            }
          }
        }
      }
    ]
  },
};

/**
 * Dùng method batchWriteItem trong dynamoDB instance để thực thi nhiều
 *  putItem với map with PutRequest Item
 */
dynamoDB.batchWriteItem(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to read item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('Write Items succeeded:', JSON.stringify(data, null, 2));
  }
});
