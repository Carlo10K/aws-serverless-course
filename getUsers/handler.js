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

const getUsers = async (event, context) => {
    let userId = event.pathParameters.id;

    var params = {
        ExpressionAttributeValues: {
            ':pk': userId,
        },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };

    return dynamodb.query(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': res })
        }
    })
}



module.exports = {
    getUsers
}
