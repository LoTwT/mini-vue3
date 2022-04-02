import { h } from "../../packages/vue3/dist/index.mjs"
import { Foo } from "./Foo.js"

export const App = {
  name: "App",
  setup(props) {},
  render() {
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        onAdd(a, b) {
          console.log("App onAdd", a, b)
        },
        onAddFoo() {
          console.log("App onAddFoo")
        },
      }),
    ])
  },
}
