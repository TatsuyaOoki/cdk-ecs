import { Environment } from "aws-cdk-lib";
import * as dotenv from "dotenv";

export interface AppParameter {
  env?: Environment;
  envName: string;
  repository: string;
  projectName: string;
  vpcCidr: string;
}

dotenv.config();

export const devParameter: AppParameter = {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION,
  },
  envName: "Develop",
  repository: "TatsuyaOoki/cdk-ecs",
  projectName: "CdkEcs",

  vpcCidr: "172.16.0.0/16",
};
