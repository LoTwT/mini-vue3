export const App = {
  render() {
    // 视图逻辑 (ui 逻辑)
    return h("div", `hello, ${this.msg}`)
  },
  setup() {
    // composition api

    return {
      msg: "mini-vue",
    }
  },
}
