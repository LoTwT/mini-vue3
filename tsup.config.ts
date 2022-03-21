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
      minify: true,
      outDir: `packages/${n}/dist`,
      target: "node16",
    }),
  ),
])
