import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as integration from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as iam from 'aws-cdk-lib/aws-iam'

interface LambdaStackProps extends StackProps {
  table: dynamodb.ITable
}

export class LambdaStack extends Stack {

  public readonly spacesIntegration: integration.HttpLambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope,id, props)

    const spacesFunction = new nodejs.NodejsFunction(this, 'SpacesLambda', {
      functionName: 'SpacesLambda',
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      entry: 'src/services/spaces/handler.ts',
      environment: {
        TABLE_NAME: props.table.tableName
      }
    })
    this.spacesIntegration = new integration.HttpLambdaIntegration('SpacesIntegration', spacesFunction)

    // Grant the Lambda function read/write permissions to the DynamoDB table
    spacesFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:Scan', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
      resources: [props.table.tableArn],
    }));
  }
}