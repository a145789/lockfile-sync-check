import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { execSync } from "node:child_process"
import { getLockfilePath, checkLockfileSync } from "../src/index.ts"

vi.mock("node:fs")
vi.mock("node:child_process")

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
  })

  it("should return false when lockfile is not in git diff", () => {
    vi.mocked(execSync).mockReturnValue("other-file.js\nanother-file.js")
    expect(checkLockfileSync("pnpm")).toBe(false)
  })

  it("should handle git command error", () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error("Git command failed")
    })

    const mockConsoleError = vi.spyOn(console, "log").mockImplementation(() => {})

    expect(checkLockfileSync("pnpm")).toBe(false)

    expect(mockConsoleError).toHaveBeenCalledWith("Error checking lockfile, please check manually.")

    mockConsoleError.mockRestore()
  })
})
