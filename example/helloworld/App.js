import { h } from "../../lib/mini-vue.esm.js"
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  name: "App",
  render() {
    window.self = this

    // 视图逻辑 (ui 逻辑)
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log("trigger click")
        },
        onMousedown() {
          console.log("trigger mousedown")
        },
      },
      // from
      // 1. setupState
      // 2. $el
      // `hello, ${this.msg}`,
      // `hello, mini-vue`,
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")],
      [h("div", {}, `hi, ${this.msg}`), h(Foo, { count: 1 })],
    )
  },
  setup() {
    // composition api

    return {
      msg: "mini-vue",
    }
  },
}
