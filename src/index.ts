import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

export type PackageManager = 'npm' | 'yarn' | 'pnpm'

export function detectPackageManager(): PackageManager {
  if (existsSync('yarn.lock')) return 'yarn'
  if (existsSync('package-lock.json')) return 'npm'
  return 'pnpm'
}

export function getLockfilePath(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'pnpm':
      return 'pnpm-lock.yaml'
    case 'yarn':
      return 'yarn.lock'
    case 'npm':
      return 'package-lock.json'
  }
}

export function checkLockfileSync(packageManager: PackageManager = detectPackageManager()): boolean {
  const lockfile = getLockfilePath(packageManager)
  
  try {
    const diffOutput = execSync("git diff --name-only ORIG_HEAD HEAD", { encoding: 'utf-8' })
    return diffOutput.includes(lockfile)
  } catch (error) {
    console.error('Error checking lockfile:', error)
    process.exit(1)
  }
}
