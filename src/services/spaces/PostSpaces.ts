import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { dbconnect } from './config/db';

export const PostSpaces = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
  const randomId = uuidv4();

  if(!event.body){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'body is required' }),
    };
  }
  const parsedBody = JSON.parse(event.body);
  if(!parsedBody.space_location){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'space_location is required in body' }),
    };
  }

  const result = await dbconnect.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME, 
    Item: {
      id: { S: randomId },
      space_location: { S: parsedBody.space_location },
    },
  }));

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify({ message: 'added new space', itemId: randomId }),
  };
  return response;
};
