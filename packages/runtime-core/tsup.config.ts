import { defineConfig } from "tsup"

export default defineConfig({
  name: "@mini-vue3/runtime-core",
  entry: [`./src/index.ts`],
  format: ["esm", "cjs"],
  clean: true,
  // minify: true,
  outDir: `dist`,
  target: "node16",
})
