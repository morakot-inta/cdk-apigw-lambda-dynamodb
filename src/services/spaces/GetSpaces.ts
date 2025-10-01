import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {ScanCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { dbconnect } from './config/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow all origins
  'Access-Control-Allow-Methods': 'OPTIONS',
};

export const GetSpaces = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {

  // Get item by id
  if(event.queryStringParameters){
    const itemId = event.queryStringParameters['id'];
    const result = await dbconnect.send(new GetItemCommand({
      TableName: process.env.TABLE_NAME, 
      Key: {
        id: { S: itemId || '' },
      },
    }));
    const response: APIGatewayProxyResultV2 = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item retrieved', item: result.Item }),
      // headers: corsHeaders
    };
    return response;
  }

  // Get all items
  const result = await dbconnect.send(new ScanCommand({
    TableName: process.env.TABLE_NAME, 
  }));
  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Items retrieved', items: result.Items }),
    // headers: corsHeaders
  };
  return response;
}