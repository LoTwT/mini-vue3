import { h } from "../../lib/mini-vue.esm.js"
import { Foo } from "./Foo.js"

export const App = {
  name: "App",
  setup() {},
  render() {
    // emit
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        onAdd(a, b) {
          console.log("onAdd", a, b)
        },
        onAddFoo() {
          console.log("onAddFoo")
        },
      }),
    ])
  },
}
