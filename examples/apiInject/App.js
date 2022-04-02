import { h, provide, inject } from "../../packages/vue3/dist/index.mjs"

const Provider = {
  name: "Provider",
  setup() {
    provide("foo", "fooVal")
    provide("bar", "barVal")
  },
  render() {
    return h("div", {}, [h("p", {}, "Provider"), h(ProviderTwo)])
  },
}

const ProviderTwo = {
  name: "ProviderTwo",
  setup() {
    provide("foo", "fooTwo")
    const foo = inject("foo")

    return { foo }
  },
  render() {
    return h("div", {}, [
      h("p", {}, `ProviderTwo foo: ${this.foo}`),
      h(Consumer),
    ])
  },
}

const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo")
    const bar = inject("bar")
    const baz = inject("baz", () => "bazDefault")

    return {
      foo,
      bar,
      baz,
    }
  },
  render() {
    return h(
      "div",
      {},
      `Consumer: - foo: ${this.foo} - bar: ${this.bar} - baz: ${this.baz}`,
    )
  },
}

export const App = {
  name: "App",
  setup() {},
  render() {
    return h("div", {}, [h("p", {}, "apiInject"), h(Provider)])
  },
}
