import { h } from "../../packages/vue3/dist/index.mjs"
export const Foo = {
  setup(props) {
    // props.count
    console.log("foo props before: ", props)

    // readonly props (imutable)
    props.count++
    console.log("foo props after: ", props)
  },
  render() {
    return h("div", {}, "foo: " + this.count)
  },
}
