import { $ } from "bun"
import { release } from "@varlet/release"

try {
  await release({
    checkRemoteVersion: true,
    task: async () => {
      await $`npx oxfmt package.json`
    },
  })
} catch (error) {
  console.log(error)
}
