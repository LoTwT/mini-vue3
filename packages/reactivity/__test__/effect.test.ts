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
})
