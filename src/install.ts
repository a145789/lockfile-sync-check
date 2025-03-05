import { execSync } from "node:child_process"
import type { PackageManager } from "./index.js"

export function installDependencies(packageManager: PackageManager): void {
  const installCommand =
    packageManager === "npm"
      ? "npm install"
      : packageManager === "yarn"
        ? "yarn"
        : "pnpm install"

  try {
    console.log("📦 \x1b[33mInstalling dependencies...\x1b[0m")
    execSync(installCommand, { stdio: "inherit" })
    console.log("✨ \x1b[32mDependencies installed successfully\x1b[0m")
    process.exit(0)
  } catch (error) {
    console.error("❌ \x1b[31mFailed to install dependencies:\x1b[0m", error)
    process.exit(1)
  }
}
