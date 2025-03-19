import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { syncMessage, init } from "../src/cli.ts"
import * as installModule from "../src/install.ts"
import * as indexModule from "../src/index.ts"

// Mock the external modules
vi.mock("../src/install.ts", () => ({
  installDependencies: vi.fn(),
}))

vi.mock("../src/index", () => ({
  checkLockfileSync: vi.fn(),
}))

describe("init function", () => {
  // Setup console.log spy
  let consoleLogSpy: any
  let originalProcessArgv: string[]

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log")
    // Save the original process.argv
    originalProcessArgv = process.argv
  })

  afterEach(() => {
    // Restore original process.argv
    process.argv = originalProcessArgv
    vi.resetAllMocks()
  })

  it("should use pnpm as default package manager if no args provided", () => {
    // Setup
    process.argv = ["node", "script.js"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(true)

    // Execute
    init()

    // Verify
    expect(indexModule.checkLockfileSync).toHaveBeenCalledWith("pnpm")
  })

  it("should use the provided package manager", () => {
    // Setup
    process.argv = ["node", "script.js", "npm"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(true)

    // Execute
    init()

    // Verify
    expect(indexModule.checkLockfileSync).toHaveBeenCalledWith("npm")
  })

  it("should print sync message if lockfile needs sync and no install flag", () => {
    // Setup
    process.argv = ["node", "script.js"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(true)

    // Execute
    init()

    // Verify
    expect(consoleLogSpy).toHaveBeenCalledWith(syncMessage)
    expect(installModule.installDependencies).not.toHaveBeenCalled()
  })

  it("should run install dependencies if lockfile needs sync and install flag is present", () => {
    // Setup
    process.argv = ["node", "script.js", "--install"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(true)

    // Execute
    init()

    // Verify
    expect(installModule.installDependencies).toHaveBeenCalledWith("pnpm")
    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it("should run install dependencies with custom package manager and install flag", () => {
    // Setup
    process.argv = ["node", "script.js", "yarn", "--install"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(true)

    // Execute
    init()

    // Verify
    expect(installModule.installDependencies).toHaveBeenCalledWith("yarn")
  })

  it("should do nothing if lockfile does not need sync", () => {
    // Setup
    process.argv = ["node", "script.js"]
    vi.mocked(indexModule.checkLockfileSync).mockReturnValue(false)

    // Execute
    init()

    // Verify
    expect(consoleLogSpy).not.toHaveBeenCalled()
    expect(installModule.installDependencies).not.toHaveBeenCalled()
  })
})
