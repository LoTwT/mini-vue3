import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  private _getter: Function
  private _dirty = true
  private _value: any
  private _effect: any

  constructor(getter) {
    this._getter = getter
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }

  get value() {
    // 当依赖的响应式对象的值发生改变的时候
    // 引入 effect 进行收集
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}

export const computed = (getter) => new ComputedRefImpl(getter)
