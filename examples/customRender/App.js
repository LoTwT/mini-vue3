import { h } from "../../packages/vue3/dist/index.mjs"

export const App = {
  name: "App",
  setup() {
    return {
      x: 100,
      y: 100,
    }
  },
  render() {
    return h("rect", { x: this.x, y: this.y })
  },
}
