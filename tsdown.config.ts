import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  clean: true,
  format: ["esm"],
  dts: true,
  outDir: "dist",
  unbundle: true,
  fixedExtension: false,
})
