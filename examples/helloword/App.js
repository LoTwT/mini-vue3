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
    return h("div", "hi, mini-vue3!" + this.msg)
  },
}
