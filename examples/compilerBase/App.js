import { ref } from "../../packages/vue3/dist/index.mjs"

export const App = {
  name: "App",
  template: `<div>hi,{{message}} count: {{count}}</div>`,
  setup() {
    const count = (window.count = ref(1))

    return {
      message: "mini-vue3",
      count,
    }
  },
}
