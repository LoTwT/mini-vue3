import { defineConfig } from "tsup"

export default defineConfig({
  name: "mini-vue3",
  entry: [`./src/index.ts`],
  format: ["esm", "cjs"],
  clean: true,
  // minify: true,
  outDir: `dist`,
  target: "node16",
  noExternal: ["@mini-vue3/reactivity", "@mini-vue3/runtime-dom"]
})
