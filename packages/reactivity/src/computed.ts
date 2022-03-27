import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  // 判断是否需要重新计算
  private _dirty = true
  // computed 的计算值
  private _value
  // 借用 ReactiveEffect 收集 getter
  private _effect: ReactiveEffect

  constructor(_getter) {
    // 利用 scheduler 比 run 优先级高的特性，当要计算的值改变后
    // 关闭缓存开关，重新计算一次
    this._effect = new ReactiveEffect(_getter, () => {
      if (!this._dirty) this._dirty = true
    })
  }

  get value() {
    // (没有缓存 / 不使用缓存) 计算一次
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }

    return this._value
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter)
}
