import { reactive } from "../src/reactive"

describe("reactive", () => {
  it("happy path", () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)

    // origin 被代理
    expect(observed).not.toBe(origin)
    // 代理的 observed 能正常访问 foo
    expect(observed.foo).toBe(1)
  })
})
