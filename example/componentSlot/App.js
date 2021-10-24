import { h } from "../../lib/mini-vue.esm.js"
import { Foo } from "./Foo.js"

export const App = {
  name: "App",
  setup() {},
  render() {
    const app = h("div", {}, "App")
    // 支持传入多种数据格式的 slots
    // single
    // const foo = h(Foo, {}, h("p", {}, "123"))
    // array
    // const foo = h(Foo, {}, [h("p", {}, "123"), h("p", {}, "456")])
    // 用对象包裹 slots，根据 key 定位渲染位置
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => h("p", {}, "header" + age),
        footer: () => h("p", {}, "footer"),
      },
    )

    return h("div", {}, [app, foo])
  },
}
