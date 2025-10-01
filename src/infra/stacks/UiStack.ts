import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment } from 'aws-cdk-lib/aws-s3-deployment'
import * as cdk from 'aws-cdk-lib'
import { OriginAccessIdentity, Distribution } from 'aws-cdk-lib/aws-cloudfront'

interface UiStackProps extends StackProps {
}

export class UiStack extends Stack {


  constructor(scope: Construct, id: string, props: UiStackProps) {
    super(scope,id, props)


    // Frontend Step:
    // 1. create s3 bucket from Bucket construct
    // 2. deploy website file to s3 bucket from BucketDeployment construct
    // 3. create origin access identity from OriginAccessIdentity construct of cloudfront
    // 4. grant read permission to origin access identity
    // 5. create cloudfront distribution from Distribution construct
    // 6. output the cloudfront distribution domain name

    const randomId = 458 

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: `website-bucket-${randomId}`, // Change to a globally unique name
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
    })

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [cdk.aws_s3_deployment.Source.asset('./src/frontend/dist')],
      destinationBucket: websiteBucket,
    })

    const originAccessIdentity = new OriginAccessIdentity(this, 'OAI');
    
    websiteBucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(this, 'WebsiteDistribution', {
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(websiteBucket, { originAccessIdentity }),
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: 'index.html'
    });


    new cdk.CfnOutput(this, 'CloudFrontDistributionDomain', {
      value: distribution.domainName,
      description: 'The domain name of the CloudFront distribution',
    })


  }
}