import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import { dbconnect } from './config/db';

export const DeleteSpaces = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
  console.log("debug Event: ", event);

  const id = event.queryStringParameters?.['id'];
  if(!id){
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'id is required' }),
    };
  }

  await dbconnect.send(new DeleteItemCommand({
    TableName: process.env.TABLE_NAME, 
    Key: {
      id: { S: id },
    },
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: `Item ${id} deleted `, 
    }),
  };

}