import { h } from "../../lib/mini-vue.esm.js"

// props 功能点
// 1. 传入 setup()
// 2. 在 render() 内用 this 访问到 props 内的属性
// 3. shallowReadonly

export const Foo = {
  name: "Foo",
  setup(props) {
    console.log(props)
    props.count++
    console.log(props)
  },
  render() {
    return h("div", {}, "foo: " + this.count)
  },
}
