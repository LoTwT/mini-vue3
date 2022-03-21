import { effect } from "../src/effect"
import { reactive } from "../src/reactive"

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    })

    let nextAge = 0

    effect(() => {
      nextAge = user.age + 1
    })

    // 初始化
    expect(nextAge).toBe(11)

    // 更新
    user.age++
    expect(nextAge).toBe(12)
  })

  it("should return runner after calling effect", () => {
    // effect(fn) => runner() => fn() => fn return
    let foo = 10
    const runner = effect(() => {
      foo++
      return "foo"
    })

    expect(foo).toBe(11)
    const r = runner()
    expect(foo).toBe(12)
    expect(r).toBe("foo")
  })
})
