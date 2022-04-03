import {
  h,
  ref,
  getCurrentInstance,
  nextTick,
} from "../../packages/vue3/dist/index.mjs"

export const App = {
  name: "App",
  setup() {
    const instance = getCurrentInstance()
    const count = ref(1)

    const onClick = () => {
      for (let i = 0; i < 100; i++) {
        console.log("update")
        count.value = i
      }

      console.log("outer instance => ", instance.vnode.el.innerHTML)
      nextTick(() => {
        console.log("nextTick instance => ", instance.vnode.el.innerHTML)
      })
    }

    return {
      count,
      onClick,
    }
  },
  render() {
    const button = h("button", { onClick: this.onClick }, "update")
    const p = h("p", {}, "count: " + this.count)

    return h("div", {}, [button, p])
  },
}
