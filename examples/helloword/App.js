import { h } from "../../dist/index.mjs"

window.self = null
export const App = {
  setup() {
    // composition api
    return {
      msg: "Here is setup msg!",
    }
  },
  render() {
    window.self = this

    // 渲染函数 ( <template></template> )
    return h(
      "div",
      {
        id: "root",
        class: ["red", "bold"],
      },
      // string
      // "hi, mini-vue3!",

      // setup varibles
      "hi, mini-vue3!" + this.msg,

      // array
      // [
      //   h("p", { class: "red" }, "hi"),
      //   h("p", { class: "lightblue" }, "mini-vue3!"),
      // ],
    )
  },
}
