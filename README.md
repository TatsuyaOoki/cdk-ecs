# replace this

## projenの初期セットアップ

> [!NOTE]
> リポジトリをCloneして使用する場合は不要な操作です。
> プロジェクトを1から作成する際の備忘になります。

以下のコマンドを実行し、プロジェクトディレクトリを作成する。

```text
npx projen new awscdk-app-ts
```

<details><summary>実行結果</summary>

```python
$ npx projen new awscdk-app-ts
Need to install the following packages:
projen@0.95.2
Ok to proceed? (y) y

👾 Project definition file was created at /workspaces/cdk-ecs/.projenrc.ts
👾 Installing dependencies...
👾 install | yarn install --check-files
yarn install v1.22.22
[1/4] Resolving packages...
warning jest > jest-cli > jest-config > babel-jest > babel-plugin-istanbul > test-exclude > glob@7.2.3: Glob versions prior to v9 are no longer supported
warning jest > jest-cli > jest-config > babel-jest > babel-plugin-istanbul > test-exclude > glob > inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 56.22s.
👾 Installing dependencies...
👾 install | yarn install --check-files
yarn install v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 7.27s.

> cdk-ecs@0.0.0 eslint
> npx projen eslint

Initialized empty Git repository in /workspaces/cdk-ecs/.git/
[main (root-commit) f1a4c75] chore: project created with projen
 24 files changed, 6208 insertions(+)
 create mode 100644 .devcontainer/devcontainer.json
 create mode 100644 .eslintrc.json
 create mode 100644 .gitattributes
 create mode 100644 .github/dependabot.yml
 create mode 100644 .github/pull_request_template.md
 create mode 100644 .github/workflows/build.yml
 create mode 100644 .github/workflows/pull-request-lint.yml
 create mode 100644 .github/workflows/upgrade.yml
 create mode 100644 .gitignore
 create mode 100644 .mergify.yml
 create mode 100644 .npmignore
 create mode 100644 .projen/deps.json
 create mode 100644 .projen/files.json
 create mode 100644 .projen/tasks.json
 create mode 100644 .projenrc.ts
 create mode 100644 LICENSE
 create mode 100644 README.md
 create mode 100644 cdk.json
 create mode 100644 package.json
 create mode 100644 src/main.ts
 create mode 100644 test/main.test.ts
 create mode 100644 tsconfig.dev.json
 create mode 100644 tsconfig.json
 create mode 100644 yarn.lock
node ➜ /workspaces/cdk-ecs (main) $ 
```　
</details>