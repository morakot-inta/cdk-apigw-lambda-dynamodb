import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as apigw from 'aws-cdk-lib/aws-apigatewayv2'
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations'

interface ApigwStackProps extends StackProps {
  spacesIntegration: integrations.HttpLambdaIntegration 
}

export class ApigwStack extends Stack {
  constructor(scope: Construct, id: string, props: ApigwStackProps) {
    super(scope,id, props)

    // Step for create API Gateway HTTP API
    // 1. create api gateway endpoint
    // 2. create route and integration
    const api = new apigw.HttpApi(this, 'DemoHttpApi', {
      apiName: 'DemoHttpApi',
      description: 'HTTP API for demo purposes',
    })

    api.addRoutes({
      path: '/spaces',
      methods: [apigw.HttpMethod.GET],
      integration: props.spacesIntegration
    })
    api.addRoutes({
      path: '/spaces',
      methods: [apigw.HttpMethod.POST],
      integration: props.spacesIntegration
    })
    api.addRoutes({
      path: '/spaces',
      methods: [apigw.HttpMethod.PUT],
      integration: props.spacesIntegration
    })
    api.addRoutes({
      path: '/spaces',
      methods: [apigw.HttpMethod.DELETE],
      integration: props.spacesIntegration
    })

    // Output the API endpoint
    new CfnOutput(this, 'HttpApiUrl', {
      value: api.apiEndpoint,
      description: 'The endpoint URL of the HTTP API',
    })
  }
}