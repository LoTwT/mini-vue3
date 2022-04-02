import { h, getCurrentInstance } from "../../dist/index.mjs"

export const Foo = {
  setup() {
    const instance = getCurrentInstance()
    console.log("Foo instance: ", instance)
  },
  render() {
    return h("div", {}, "foo")
  },
}
