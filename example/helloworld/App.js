import { h } from "../../lib/mini-vue.esm.js"

export const App = {
  render() {
    // 视图逻辑 (ui 逻辑)
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      // `hello, ${this.msg}`,
      // `hello, mini-vue`,
      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")],
    )
  },
  setup() {
    // composition api

    return {
      msg: "mini-vue",
    }
  },
}
