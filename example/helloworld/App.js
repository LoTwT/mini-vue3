import { h } from "../../lib/mini-vue.esm.js"

window.self = null
export const App = {
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
      `hello, ${this.msg}`,
      // `hello, mini-vue`,
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")],
    )
  },
  setup() {
    // composition api

    return {
      msg: "mini-vue",
    }
  },
}
