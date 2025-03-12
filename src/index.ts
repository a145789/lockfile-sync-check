import { execSync } from "node:child_process"

export type PackageManager = "npm" | "yarn" | "pnpm"

export function getLockfilePath(packageManager: PackageManager): string {
  switch (packageManager) {
    case "pnpm":
      return "pnpm-lock.yaml"
    case "yarn":
      return "yarn.lock"
    case "npm":
      return "package-lock.json"
  }
}

export function checkLockfileSync(packageManager: PackageManager): boolean {
  const lockfile = getLockfilePath(packageManager)

  try {
    const diffOutput = execSync("git diff --name-only ORIG_HEAD HEAD", {
      encoding: "utf-8",
    })
    return diffOutput.includes(lockfile)
  } catch {
    console.log("Error checking lockfile, please check manually.")
    return false
  }
}
