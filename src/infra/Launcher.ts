import { App } from "aws-cdk-lib"
import { LambdaStack } from "./stacks/LambdaStack";
import { ApigwStack } from "./stacks/ApigwStack";
import { DataStack } from "./stacks/DataStack";
import { UiStack } from "./stacks/UiStack";

const app = new App();

const dbStack = new DataStack(app, "DataStack", {
});
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  table: dbStack.table
});
new ApigwStack(app, "ApigwStack", {
  spacesIntegration: lambdaStack.spacesIntegration
});

const uiStack = new UiStack(app, "UiStack", {
});

