#!/usr/bin/env node

import { type PackageManager, checkLockfileSync } from "./index"
import { installDependencies } from "./install"

export const syncMessage = "\x1b[35mLockfile has been updated!\x1b[0m"

const args = process.argv.slice(2)
const packageManager =
  (args.filter((arg) => arg !== "--install")[0] as PackageManager) || "pnpm"

const shouldInstall = args.includes("--install")

const isNeedSync = checkLockfileSync(packageManager)

if (isNeedSync) {
  console.log(syncMessage)
  if (shouldInstall) {
    installDependencies(packageManager)
  }
}
