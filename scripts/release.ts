import { $ } from "bun"
import { release } from "@varlet/release"

release({
  checkRemoteVersion: true,
  task: async () => {
    await $`npx oxfmt package.json`
  },
})
