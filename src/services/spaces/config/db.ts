import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dbconnect = new DynamoDBClient({ region: 'ap-southeast-1' });
