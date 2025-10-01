import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { PostSpaces } from './PostSpaces';
import { GetSpaces } from './GetSpaces';
import { UpdateSpace } from './UpdateSpace';
import { DeleteSpaces } from './DeleteSpace';


export const handler = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {

  let message:string = 'undefined';

  switch (event.requestContext.http.method) {
    case 'GET':
      const getResponse = await GetSpaces(event, context);
      return getResponse;
    case 'POST':
      const postResponse = await PostSpaces(event, context); 
      return postResponse;
    case 'PUT':
      const updateResponse = await UpdateSpace(event, context);
      return updateResponse;
    case 'DELETE':
      const deleteResponse = await DeleteSpaces(event, context);
      return deleteResponse;
    default:
      break;
  }

  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
  return response;
};