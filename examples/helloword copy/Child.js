import { h } from "../../packages/vue3/dist/index.mjs"

export const Child = {
  name: "Child",
  setup(props) {},
  render() {
    return h("div", {}, [
      h("div", {}, [h("div", {}, "child - props - msg: " + this.$props.msg)]),
    ])
  },
}
