import { h } from "../../packages/vue3/dist/index.mjs"
import { Foo } from "./Foo.js"

window.self = null
export const App = {
  name: "App",
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
        onClick() {
          console.log("click")
        },
        onMousedown() {
          console.log("mousedown")
        },
      },
      // string
      // "hi, mini-vue3!",

      // setup varibles
      // "hi, mini-vue3!" + this.msg,

      // array
      // [
      //   h("p", { class: "red" }, "hi"),
      //   h("p", { class: "lightblue" }, "mini-vue3!"),
      // ],

      // component
      [h("div", {}, "hi, " + this.msg), h(Foo, { count: 1 })],
    )
  },
}
