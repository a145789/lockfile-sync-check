#!/usr/bin/env node

import {
  checkLockfileSync,
  type PackageManager,
  detectPackageManager,
} from "./index.js"
import { installDependencies } from "./install.js"

const args = process.argv.slice(2)
const packageManager =
  (args[0] as PackageManager | undefined) || detectPackageManager()
const shouldInstall = args.includes("--install")

const isNeedSync = checkLockfileSync(packageManager)

if (!isNeedSync) {
  console.log("❗ \x1b[31mWarning: Lockfile has been updated!\x1b[0m")
  if (shouldInstall) {
    installDependencies(packageManager)
  } else {
    process.exit(1)
  }
} else {
  console.log("✨ \x1b[32mLockfile is in sync\x1b[0m")
  process.exit(0)
}
