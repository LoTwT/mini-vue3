import { defineConfig, Options } from "tsup"
import fg from "fast-glob"

const packageNames = fg
  .sync("packages/*", { onlyDirectories: true })
  .map((p) => p.split("/")[1])

export default defineConfig([
  // {
  //   name: "mini-vue3",
  //   entry: ["packages/**/src/index.ts"],
  //   format: ["esm", "cjs"],
  //   minify: true,
  //   target: "node16",
  // },
  ...packageNames.map(
    (n): Options => ({
      name: n,
      entry: [`packages/${n}/src/index.ts`],
      format: ["esm", "cjs"],
      clean: true,
      // minify: true,
      outDir: `packages/${n}/dist`,
      target: "node16",
    }),
  ),
  // 依赖各 package 的打包结果进行整体的二次打包
  // 仅用作 examples 使用
  {
    name: "mini-vue3",
    entry: ["packages/index.ts"],
    format: ["esm", "cjs"],
    clean: true,
    // minify: true,
    target: "node16",
  },
])
