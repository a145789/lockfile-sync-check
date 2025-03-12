# lockfile-sync-check

<p align="center">
  <a href="https://www.npmjs.com/package/lockfile-sync-check" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/lockfile-sync-check" alt="NPM Version" /></a>
  <a href="https://github.com/a145789/lockfile-sync-check/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/a145789/lockfile-sync-check" alt="License" /></a>
</p>

[中文文档](https://github.com/a145789/lockfile-sync-check/blob/master/README.zh-CN.md)

A command-line tool to check if your package manager's lockfile is in sync with the latest changes in your Git repository.

## Features

- Supports multiple package managers (npm, yarn, pnpm)
- Optional automatic dependency installation
- Easy integration with Git hooks

## Installation

```bash
npm install -D lockfile-sync-check
# or
yarn add -D lockfile-sync-check
# or
pnpm add -D lockfile-sync-check
```

## Usage

```bash
lockfile-sync-check [package-manager] [--install]
```

### Options

- `package-manager`: Optional. Specify the package manager to use ("npm", "yarn", or "pnpm"). If not provided, default `pnpm`.
- `--install`: Optional. Automatically install dependencies if the lockfile is out of sync.

### Example

```bash
# Check if lockfile is in sync using auto-detected package manager
lockfile-sync-check

# Check using specific package manager
lockfile-sync-check pnpm

# Check and auto-install if out of sync
lockfile-sync-check --install
```

## Git Hook Integration

### Using simple-git-hooks

1. Install simple-git-hooks:

```bash
npm install -D simple-git-hooks
# or
yarn add -D simple-git-hooks
# or
pnpm add -D simple-git-hooks
```

2. Add configuration to your package.json:

```json
{
  "simple-git-hooks": {
    "post-merge": "lockfile-sync-check --install",
    "post-rewrite": "lockfile-sync-check --install"
  }
}
```

3. Initialize git hooks:

```bash
npx simple-git-hooks
```

### Using Husky

1. Install Husky:

```bash
npm install -D husky
# or
yarn add -D husky
# or
pnpm add -D husky
```

2. Initialize Husky:

```bash
npx husky install
```

3. Add hooks:

```bash
npx husky add .husky/post-merge "lockfile-sync-check --install"
npx husky add .husky/post-rewrite "lockfile-sync-check --install"
```

### Manual Setup

Alternatively, you can manually add the script to your `.git/hooks/post-merge` or `.git/hooks/post-rewrite`:
