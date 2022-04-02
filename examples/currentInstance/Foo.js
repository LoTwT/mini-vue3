import { h, getCurrentInstance } from "../../packages/vue3/dist/index.mjs"

export const Foo = {
  setup() {
    const instance = getCurrentInstance()
    console.log("Foo instance: ", instance)
  },
  render() {
    return h("div", {}, "foo")
  },
}
