import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { Network } from "./constructs/network";
import { App } from "./constructs/app";

export interface EcsStackProps {}

export class CdkEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcsStackProps) {
    super(scope, id, props);

    const network = new Network(this, "Network", {});
    new App(this, "App", {
      vpc: network.vpc,
    });
  }
}
