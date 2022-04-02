import { h, createTextVNode } from "../../packages/vue3/dist/index.mjs"
import { Foo } from "./Foo.js"

export const App = {
  name: "App",
  setup(props) {},
  render() {
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h("p", {}, "123" + age),
          createTextVNode("text node"),
        ],
        footer: () => h("p", {}, "456"),
      },
    )
    return h("div", {}, [app, foo])
  },
}
