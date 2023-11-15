const aws = require("aws-sdk")
const { randomUUID } = require("crypto")

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

const createUser = async (event, context) => {
    const id = randomUUID();

    let userBody = JSON.parse(event.body);
    userBody.pk = id;

    var params = {
        TableName: 'usersTable',
        Item: userBody
    };

    console.log(params.Item);

    return dynamodb.put(params).promise().then(res => {
        console.log(res);
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': params.Item })
        }
    })
}



module.exports = {
    createUser
}
