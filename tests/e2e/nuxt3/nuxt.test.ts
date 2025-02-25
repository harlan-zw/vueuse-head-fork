import { fileURLToPath } from "node:url"
import { $fetch, setup } from "@nuxt/test-utils"
import { expectNoClientErrors } from "./utils"
import { load } from "cheerio"

await setup({
  rootDir: fileURLToPath(new URL("../../../examples/nuxt3", import.meta.url)),
  server: true,
  browser: true,
})

describe("e2e: nuxt 3", () => {
  it("basic", async () => {
    const html = await $fetch("/")
    const $ = load(html as string)
    expect($("title").text()).equals("Home | Nuxt")
    expect($('meta[name="head:count"]').attr("content")).toMatch("4")
    await expectNoClientErrors("/")
  })
})
