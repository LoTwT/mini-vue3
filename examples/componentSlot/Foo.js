import { h, renderSlots } from "../../packages/vue3/dist/index.mjs"
export const Foo = {
  name: "Foo",
  setup(props) {},
  render() {
    const foo = h("p", {}, "foo")
    const age = 18
    return h("div", {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer"),
    ])
  },
}
