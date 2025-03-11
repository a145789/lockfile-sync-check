import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { existsSync } from "node:fs"
import { execSync } from "node:child_process"
import {
  detectPackageManager,
  getLockfilePath,
  checkLockfileSync,
} from "../src/index.ts"

vi.mock("node:fs")
vi.mock("node:child_process")

describe("Package Manager Detection", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("should detect yarn when yarn.lock exists", () => {
    vi.mocked(existsSync).mockImplementation((path) => path === "yarn.lock")
    expect(detectPackageManager()).toBe("yarn")
  })

  it("should detect npm when package-lock.json exists", () => {
    vi.mocked(existsSync).mockImplementation(
      (path) => path === "package-lock.json",
    )
    expect(detectPackageManager()).toBe("npm")
  })

  it("should default to pnpm when no lockfile exists", () => {
    vi.mocked(existsSync).mockReturnValue(false)
    expect(detectPackageManager()).toBe("pnpm")
  })
})

describe("Lockfile Path", () => {
  it("should return correct lockfile path for pnpm", () => {
    expect(getLockfilePath("pnpm")).toBe("pnpm-lock.yaml")
  })

  it("should return correct lockfile path for yarn", () => {
    expect(getLockfilePath("yarn")).toBe("yarn.lock")
  })

  it("should return correct lockfile path for npm", () => {
    expect(getLockfilePath("npm")).toBe("package-lock.json")
  })
})

describe("Lockfile Sync Check", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("should return true when lockfile is in git diff", () => {
    vi.mocked(execSync).mockReturnValue("pnpm-lock.yaml\nother-file.js")
    const isNeedSync = checkLockfileSync("pnpm")
    expect(isNeedSync).toBe(true)

    const consoleSpy = vi.spyOn(console, "log")
    if (isNeedSync) {
      console.log("❗ \x1b[31mWarning: Lockfile has been updated!\x1b[0m")
    }
    expect(consoleSpy).toHaveBeenCalledWith(
      "❗ \x1b[31mWarning: Lockfile has been updated!\x1b[0m",
    )
  })

  it("should return false when lockfile is not in git diff", () => {
    vi.mocked(execSync).mockReturnValue("other-file.js\nanother-file.js")
    expect(checkLockfileSync("pnpm")).toBe(false)
  })

  it("should handle git command error", () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error("Git command failed")
    })
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never)
    const mockConsoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    checkLockfileSync("pnpm")

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error checking lockfile:",
      expect.any(Error),
    )
    expect(mockExit).toHaveBeenCalledWith(1)

    mockExit.mockRestore()
    mockConsoleError.mockRestore()
  })
})
