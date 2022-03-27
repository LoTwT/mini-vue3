import { h } from "../../dist/index.mjs"

export const App = {
  setup() {
    // composition api
    return {
      msg: "Here is setup msg!",
    }
  },
  render() {
    // 渲染函数 ( <template></template> )
    return h(
      "div",
      {
        id: "root",
        class: ["red", "bold"],
      },
      // "hi, mini-vue3!",
      // "hi, mini-vue3!" + this.msg,
      [
        h("p", { class: "red" }, "hi"),
        h("p", { class: "lightblue" }, "mini-vue3!"),
      ],
    )
  },
}
