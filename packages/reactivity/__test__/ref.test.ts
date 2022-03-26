import { effect } from "../src/effect"
import { reactive } from "../src/reactive"
import { isRef, ref, unRef } from "../src/ref"

describe("ref", () => {
  it("happy path", () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it("should be reactive", () => {
    const a = ref(1)
    let dummy
    let calls = 0

    effect(() => {
      calls++
      dummy = a.value
    })

    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2

    expect(calls).toBe(2)
    expect(dummy).toBe(2)

    // same value should not trigger
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })

  it("should make nested properties reactive", () => {
    const a = ref({ count: 1 })
    let dummy

    effect(() => {
      dummy = a.value.count
    })

    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  it("isRef", () => {
    const a = ref(1)
    const p = reactive({ age: 10 })

    expect(isRef(a)).toBe(true)
    expect(isRef(1)).toBe(false)
    expect(isRef(p)).toBe(false)
  })

  it("unRef", () => {
    const a = ref(1)

    expect(unRef(a)).toBe(1)
    expect(unRef(1)).toBe(1)
  })
})
