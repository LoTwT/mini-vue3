import { isProxy, isReactive, reactive } from "../src/reactive"

describe("reactive", () => {
  it("happy path", () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)

    // origin 被代理
    expect(observed).not.toBe(origin)
    // 代理的 observed 能正常访问 foo
    expect(observed.foo).toBe(1)

    expect(isReactive(observed)).toBe(true)
    expect(isReactive(origin)).toBe(false)

    expect(isProxy(observed)).toBe(true)
  })

  it("nested reactive", () => {
    const origin = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    }

    const observed = reactive(origin)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
