const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  //console.log(JSON.stringify(event, undefined, 2));

  const body = JSON.parse(event.body);
  const url = body.url;
  console.log(url);

  const id = Math.floor(Math.random()*1000000000).toString(26);

  await ddb.put({
    TableName: process.env.TABLE_NAME,
    Item: {
      id,
      url
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      id
    })
  };
};
