const AWS = require("aws-sdk");
let dynamoDBClientParams = {}
const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoDBClientParams);

function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const likeuser = async (event, context) => {
    const body = event.Records[0].body;
    const userId = JSON.parse(body).id;
    console.log(userId);
    const params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: "ADD likes :inc",
        ExpressionAttributeValues: {
            ':inc': 1
        },
        ReturnValues: 'ALL_NEW'
    }

const result = await dynamodb.update(params).promise();
await sleep(4000);
console.log(result);

}


module.exports = {
    likeuser
}

