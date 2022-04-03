import { h, ref } from "../../packages/vue3/dist/index.mjs"

const nextChildren = [h("div", {}, "C"), h("div", {}, "D")]
const prevChildren = [h("div", {}, "A"), h("div", {}, "B")]

export default {
  name: "ArrayToArray",
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange,
    }
  },
  render() {
    const self = this
    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren)
  },
}
