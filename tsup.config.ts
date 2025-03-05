import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  splitting: true,
  clean: true,
  format: ["esm"],
  dts: true,
  outDir: "dist",
})
