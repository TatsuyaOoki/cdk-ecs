import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as logs from "aws-cdk-lib/aws-logs";

export interface AppProps {
  vpc: ec2.IVpc;
}

export class App extends Construct {
  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id);

    // Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDef", {
      cpu: 256,
      memoryLimitMiB: 512,
      runtimePlatform: {
        cpuArchitecture: ecs.CpuArchitecture.X86_64,
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
      },
    });

    const webContainer = taskDefinition.addContainer("WebContainer", {
      image: ecs.ContainerImage.fromAsset("./assets/ecs/web/"),
      enableRestartPolicy: true,
      healthCheck: {
        command: ["CMD-SHELL", "curl -f http://localhost/healthcheck.html"],
        interval: cdk.Duration.seconds(30),
        retries: 3,
        startPeriod: cdk.Duration.seconds(60),
      },
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: "web-container",
        logRetention: logs.RetentionDays.THREE_DAYS,
        mode: ecs.AwsLogDriverMode.NON_BLOCKING,
      }),
    });

    webContainer.addPortMappings({
      containerPort: 80,
      hostPort: 80,
      protocol: ecs.Protocol.TCP,
    });

    // Cluster
    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc: props.vpc,
      containerInsightsV2: ecs.ContainerInsights.DISABLED,
      enableFargateCapacityProviders: true,
    });

    // Service
    const service = new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      taskDefinitionRevision: ecs.TaskDefinitionRevision.LATEST,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      desiredCount: 2,
      assignPublicIp: true,
      enableExecuteCommand: true,
      capacityProviderStrategies: [
        {
          capacityProvider: "FARGATE",
          base: 1,
          weight: 1,
        },
        {
          capacityProvider: "FARGATE_SPOT",
          weight: 3,
        },
      ],
    });
    service.connections.allowFromAnyIpv4(ec2.Port.HTTP);
  }
}
