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
 * Để sử dụng batchGetItems input phải có một object là RequestItems
 * Truyền vào Movies là Database Name
 * Key array là multiple input params để thực thi nhiều getItems phía dưới
 * Trong RequestItems chỉ có thể dùng những Expression sau
 *  - ProjectionExpress: Lấy những field ra khi return data
 *  - ExpressionAttirbuteNames: Tạo alias với fields
 *  - ConsistentRead :
 *    + true : sẽ dùng Strongly consistent
 *    + false(default): sẽ dùng Eventually consistent
 */
var params = {
  RequestItems: {
    Movies: {
      Keys: [
        {
          year: {
            N: '2013',
          },
          title: {
            S: 'Carrie',
          },
        },
        {
          year: {
            N: '2014',
          },
          title: {
            S: 'X-Men: Days of Future Past',
          },
        },
      ],
      ProjectionExpression: '#t, #y, #i.#g',
      ExpressionAttributeNames: {
        '#t': 'title',
        '#y': 'year',
        '#i': 'info',
        '#g': 'genres'
      },
    },
  },
};

/**
 * Dùng method batchGetItem trong dynamoDB instance để thực thi nhiều
 *  getItem với map with RequestItems Key
 */
dynamoDB.batchGetItem(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to read item. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
  }
});
