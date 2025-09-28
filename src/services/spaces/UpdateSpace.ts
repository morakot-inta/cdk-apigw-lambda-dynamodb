import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { dbconnect } from './config/db';

export const UpdateSpace = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {

  const id = event.queryStringParameters?.['id'];
  if(!id){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'id is required' }),
    };
  }

  if(!event.body){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'body is required' }),
    };
  }
  const parsedBody = JSON.parse(event.body);
  const space_location = parsedBody.space_location;
  if(!space_location){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'space_location is required in body' }),
    };
  }

  await dbconnect.send(new UpdateItemCommand({
    TableName: process.env.TABLE_NAME, 
    Key: {
      id: { S: id },
    },
    UpdateExpression: 'SET space_location = :space_location',
    ExpressionAttributeValues: {
      ':space_location': { S: space_location },
    },
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Item updated', 
    }),
  };

}