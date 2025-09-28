import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export class DataStack extends Stack {

  public readonly table: dynamodb.ITable 

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope,id, props)

    this.table = new dynamodb.Table(this, 'SpacesTable', {
      tableName: 'SpacesTable',
      partitionKey: { 
        name: 'id', 
        type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    })

  }
}