const aws = require("aws-sdk")

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://0.0.0.0:8000',
        accessKeyId: 'MockAccessKeyId',
        secretAccessKey: 'MockSecretAccessKey'
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const updateUser = async (event, context) => {
    let userId = event.pathParameters.id;
    const userBody = JSON.parse(event.body);

    var params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: 'set #name = :name, #tel = :tel', 
        ExpressionAttributeNames: { '#name' : "name", '#tel': "tel" },
        ExpressionAttributeValues: {':name': userBody.name, ":tel": userBody.tel},
        ReturnValues: 'ALL_NEW'
    };

    return dynamodb.update(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': res.Attributes })
        }
    });
}

module.exports = {
    updateUser
}
