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
  // 仅用作 examples 使用，将所有用到 API 打包到一个文件中
  // 不要用包名作导出，会强依赖单个包的打包结果进行二次打包
  {
    name: "mini-vue3",
    entry: ["packages/index.ts"],
    format: ["esm", "cjs"],
    clean: true,
    outDir: "dist",
    // minify: true,
    target: "node16",
  },
])
