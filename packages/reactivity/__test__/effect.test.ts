import { effect, stop } from "../src/effect"
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

  it("scheduler", () => {
    // 1. 通过 effect 的第二个参数，给定一个 scheduler 函数
    // 2. effect 第一次执行 ( 依赖收集 )，执行 fn
    // 3. 当触发响应式对象修改 ( set ) 时，不执行 fn 而是执行 scheduler
    // 4. 当执行 runner 时，正常执行 fn
    let dummy
    let run

    const scheduler = vi.fn(() => {
      run = runner
    })

    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      {
        scheduler,
      },
    )

    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1)
    // manually run
    run()
    // should have run
    expect(dummy).toBe(2)
  })

  // 失活 effect
  it("should stop", () => {
    let dummy

    const obj = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2

    expect(dummy).toBe(2)
    stop(runner)

    obj.prop = 3
    expect(dummy).toBe(2)

    // stopped effect should be actived after calling runner
    runner()
    expect(dummy).toBe(3)
  })

  // effect 失活后的回调函数
  it("onStop", () => {
    let dummy

    const obj = reactive({
      foo: 1,
    })
    const onStop = vi.fn()

    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { onStop },
    )

    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
