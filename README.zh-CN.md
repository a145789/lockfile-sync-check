# lockfile-sync-check

一个命令行工具，用于检查你的包管理器的锁文件是否与 Git 仓库中的最新更改同步。

<p align="center">
  <a href="https://www.npmjs.com/package/lockfile-sync-check" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/lockfile-sync-check" alt="NPM Version" /></a>
  <a href="https://github.com/a145789/lockfile-sync-check/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/a145789/lockfile-sync-check" alt="License" /></a>
</p>

## 特性

- 支持多种包管理器（npm、yarn、pnpm）
- 自动检测你使用的包管理器
- 可选的自动依赖安装
- 易于与 Git 钩子集成

## 安装

```bash
npm install -D lockfile-sync-check
# 或
yarn add -D lockfile-sync-check
# 或
pnpm add -D lockfile-sync-check
```

## 使用方法

```bash
lockfile-sync-check [包管理器] [--install]
```

### 选项

- `包管理器`：可选。指定要使用的包管理器（"npm"、"yarn"或"pnpm"）。如果不提供，默认 `pnpm`。
- `--install`：可选。如果锁文件不同步，自动安装依赖。

### 示例

```bash
# 使用自动检测的包管理器检查锁文件是否同步
lockfile-sync-check

# 使用指定的包管理器检查
lockfile-sync-check pnpm

# 检查并在不同步时自动安装
lockfile-sync-check --install
```

## Git 钩子集成

你可以使用以下两种流行的 Git 钩子管理工具来集成 lockfile-sync-check：

### 使用 simple-git-hooks

1. 安装依赖：

```bash
npm install -D simple-git-hooks
# 或
yarn add -D simple-git-hooks
# 或
pnpm add -D simple-git-hooks
```

2. 在 `package.json` 中添加配置：

```json
{
  "simple-git-hooks": {
    "post-merge": "lockfile-sync-check --install",
    "post-rewrite": "lockfile-sync-check --install"
  }
}
```

### 使用 Husky

1. 安装依赖：

```bash
npm install -D husky
# 或
yarn add -D husky
# 或
pnpm add -D husky
```

2. 启用 Git 钩子：

```bash
npx husky install
```

3. 添加 post-merge 钩子：

```bash
npx husky add .husky/post-merge "lockfile-sync-check --install"
npx husky add .husky/post-rewrite "lockfile-sync-check --install"
```

4. 在 `package.json` 中添加 prepare 脚本：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

这样，每当你执行 git pull、git merge 或 git rebase 操作时，lockfile-sync-check 都会自动运行并确保你的依赖是最新的。
