import { isProxy, isReadonly, readonly } from "../src/reactive"

describe("readonly", () => {
  it("happy path", () => {
    const origin = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(origin)

    expect(wrapped).not.toBe(origin)
    expect(wrapped.foo).toBe(1)

    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(origin)).toBe(false)

    expect(isProxy(wrapped)).toBe(true)
  })

  it("nested readonly", () => {
    const origin = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(origin)

    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(origin.bar)).toBe(false)
  })

  it("should warn after calling set", () => {
    console.warn = vi.fn()

    const user = readonly({
      age: 10,
    })

    user.age = 11

    expect(console.warn).toBeCalled()
  })
})
