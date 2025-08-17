import { awscdk } from "projen";
import { UpdateSnapshot } from "projen/lib/javascript";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "cdk-ecs",
  projenrcTs: true,
  buildWorkflow: false,

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 100,
    },
  },
  jestOptions: {
    updateSnapshot: UpdateSnapshot.NEVER,
  },
  deps: ["dotenv"] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
