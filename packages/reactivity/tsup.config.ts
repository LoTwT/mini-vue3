import { defineConfig } from "tsup"

export default defineConfig({
  name: "@mini-vue3/reactivity",
  entry: [`./src/index.ts`],
  format: ["esm", "cjs"],
  clean: true,
  // minify: true,
  outDir: `dist`,
  target: "node16",
})
