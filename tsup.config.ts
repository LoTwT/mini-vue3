import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["packages/*/index.ts"],
  format: ["esm", "cjs"],
  minify: true,
})
