const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  //console.log(JSON.stringify(event, undefined, 2));

  const id = event.pathParameters.shortened;
  console.log(id);

  const { Item: item } = await ddb.get({
    TableName: process.env.TABLE_NAME,
    Key: {
      id
    }
  }).promise();

  console.log(item.url);

  return {
    statusCode: 301,
    headers: {
      Location: item.url
    }
  };
};
