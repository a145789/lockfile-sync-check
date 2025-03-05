import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { execSync } from "node:child_process"
import { installDependencies } from "../src/install"

vi.mock("node:child_process")

describe("Install Dependencies", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("should execute correct install command for npm", () => {
    const mockExecSync = vi.mocked(execSync)
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never)
    const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {})

    installDependencies("npm")

    expect(mockExecSync).toHaveBeenCalledWith("npm install", expect.any(Object))
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "📦 \x1b[33mInstalling dependencies...\x1b[0m",
    )
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "✨ \x1b[32mDependencies installed successfully\x1b[0m",
    )
    expect(mockExit).toHaveBeenCalledWith(0)

    mockExit.mockRestore()
    mockConsoleLog.mockRestore()
  })

  it("should execute correct install command for yarn", () => {
    const mockExecSync = vi.mocked(execSync)
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never)
    const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {})

    installDependencies("yarn")

    expect(mockExecSync).toHaveBeenCalledWith("yarn", expect.any(Object))
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "📦 \x1b[33mInstalling dependencies...\x1b[0m",
    )
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "✨ \x1b[32mDependencies installed successfully\x1b[0m",
    )
    expect(mockExit).toHaveBeenCalledWith(0)

    mockExit.mockRestore()
    mockConsoleLog.mockRestore()
  })

  it("should execute correct install command for pnpm", () => {
    const mockExecSync = vi.mocked(execSync)
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never)
    const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {})

    installDependencies("pnpm")

    expect(mockExecSync).toHaveBeenCalledWith(
      "pnpm install",
      expect.any(Object),
    )
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "📦 \x1b[33mInstalling dependencies...\x1b[0m",
    )
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "✨ \x1b[32mDependencies installed successfully\x1b[0m",
    )
    expect(mockExit).toHaveBeenCalledWith(0)

    mockExit.mockRestore()
    mockConsoleLog.mockRestore()
  })

  it("should handle installation errors", () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error("Installation failed")
    })
    const mockExit = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined as never)
    const mockConsoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    installDependencies("npm")

    expect(mockConsoleError).toHaveBeenCalledWith(
      "❌ \x1b[31mFailed to install dependencies:\x1b[0m",
      expect.any(Error),
    )
    expect(mockExit).toHaveBeenCalledWith(1)

    mockExit.mockRestore()
    mockConsoleError.mockRestore()
  })
})
