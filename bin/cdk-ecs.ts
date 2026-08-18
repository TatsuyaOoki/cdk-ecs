#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { CdkEcsStack } from "../lib/cdk-ecs-stack";

const app = new cdk.App();
new CdkEcsStack(app, "CdkEcsStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
cdk.Tags.of(app).add("Env", "Education");
