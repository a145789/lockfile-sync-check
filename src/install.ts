import { execSync } from "node:child_process"
import type { PackageManager } from "./index.js"

export const installStartMessage = "📦 Installing dependencies..."
export const installSuccessMessage =
  "✨ \x1b[32mDependencies installed successfully\x1b[0m"
export const installErrorMessage =
  "❌ \x1b[31mFailed to install dependencies:\x1b[0m"

export function installDependencies(packageManager: PackageManager): void {
  const installCommand =
    packageManager === "npm"
      ? "npm install"
      : packageManager === "yarn"
        ? "yarn"
        : "pnpm install"

  try {
    console.log(installStartMessage)
    execSync(installCommand, { stdio: "inherit" })
    console.log(installSuccessMessage)
    process.exit(0)
  } catch (error) {
    console.error(installErrorMessage, error)
    process.exit(1)
  }
}
