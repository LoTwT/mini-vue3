import { h, getCurrentInstance } from "../../dist/index.mjs"
import { Foo } from "./Foo.js"

export const App = {
  name: "App",
  setup() {
    const instance = getCurrentInstance()
    console.log("App instance: ", instance)
  },
  render() {
    return h("div", {}, [h("p", {}, "currentInstance demo"), h(Foo)])
  },
}
