#!/usr/bin/env node

import { checkLockfileSync, type PackageManager } from "./index"
import { installDependencies } from "./install"

export const syncMessage = "\x1b[35mLockfile has been updated!\x1b[0m"

export function init(): void {
  const args = process.argv.slice(2)
  const pkgManager = (args.find((arg) => arg !== "--install") || "pnpm") as PackageManager

  const installFlag = args.includes("--install")
  const needSync = checkLockfileSync(pkgManager)
  if (needSync) {
    if (installFlag) {
      installDependencies(pkgManager)
      return
    }

    console.log(syncMessage)
  }
}

init()
