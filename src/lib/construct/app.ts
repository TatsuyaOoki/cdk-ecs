import * as cdk from "aws-cdk-lib";
import { aws_ec2 as ec2, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface Ec2Props {
  vpc: ec2.IVpc;
}

export class Ec2App extends Construct {
  public readonly linuxinstance: ec2.IInstance;

  constructor(scope: Construct, id: string, props: Ec2Props) {
    super(scope, id);

    const accountId = cdk.Stack.of(this).account;

    // ========= EC2 Instance Connect =============== //
    const eicSecurityGroup = new ec2.SecurityGroup(this, "EicSg", {
      vpc: props.vpc,
      allowAllOutbound: true, //EIC Endopoint does not support connections as of 2025/3.
    });

    new ec2.CfnInstanceConnectEndpoint(this, "Eic", {
      subnetId: props.vpc.isolatedSubnets[0].subnetId,
      securityGroupIds: [eicSecurityGroup.securityGroupId],
    });

    /* ============ KeyPair ============ */
    const keyPair = new ec2.KeyPair(this, "KeyPair", {});

    /* ============ InstanceProfile ============ */
    const instanceRole = new iam.Role(this, "InstanceRole", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      path: "/",
      managedPolicies: [
        {
          managedPolicyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
        },
        {
          managedPolicyArn: "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy",
        },
      ],
    });

    /* ============ EC2 Instance for Linux ============ */

    // UserData for Linux (setup Nginx)
    const linuxUserdata = ec2.UserData.forLinux({ shebang: "#!/bin/bash" });
    linuxUserdata.addCommands(
      "sudo dnf -y install nginx",
      'echo "<h1>Hello from $(hostname)</h1>" | sudo tee /usr/share/nginx/html/index.html > /dev/null',
      "sudo chown nginx:nginx /usr/share/nginx/html/index.html",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    );

    // AMI (Linux)
    const linuxAmi = ec2.MachineImage.latestAmazonLinux2023({
      cachedInContext: true,
    });

    // const linuxAmi = ec2.MachineImage.lookup({
    //   name: 'al2023-ami-2023.6.20250303.0-kernel-6.1-x86_64',
    //   owners: [
    //     'amazon',
    //     accountId,
    //   ],
    // });

    // EC2 instance (Linux)
    const linuxInstance = new ec2.Instance(this, "linuxInstance", {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: linuxAmi,
      role: instanceRole,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      userData: linuxUserdata,
      keyPair: keyPair,
      blockDevices: [
        {
          deviceName: "/dev/xvda",
          volume: ec2.BlockDeviceVolume.ebs(10, {
            encrypted: true,
            volumeType: ec2.EbsDeviceVolumeType.GP3,
          }),
        },
      ],
    });

    this.linuxinstance = linuxInstance;

    linuxInstance.connections.allowFromAnyIpv4(ec2.Port.HTTP);
    linuxInstance.connections.allowFrom(eicSecurityGroup, ec2.Port.SSH);
  }
}
