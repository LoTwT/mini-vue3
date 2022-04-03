import { h, ref } from "../../packages/vue3/dist/index.mjs"

const nextChildren = "nextChildren"
const prevChildren = "prevChildren"

export default {
  name: "TextToText",
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
