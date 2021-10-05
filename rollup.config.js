import pkg from "./package.json"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "./src/index.ts",
  output: [
    {
      // cjs -> commonjs
      format: "cjs",
      file: pkg.main, // "lib/mini-vue.cjs.js"
    },
    {
      // esm
      format: "es",
      file: pkg.module, // "lib/mini-vue.esm.js"
    },
  ],
  plugins: [typescript()],
}
