# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   type-check the project
* `npm run watch`   watch for changes and type-check
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## 説明

ECS(Fargate)でNginxのコンテナをデプロイします。
Dockerfileはローカル環境上でビルドし、CDKが自動作成したECRへプッシュします。
ECSサービスでは、キャパシティプロバイダー戦略を設定し、FARGATE/FARGATE_SPOTで2つのタスクを起動します。
