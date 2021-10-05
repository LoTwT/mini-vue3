import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _rawValue: any
  private _value: any
  public dep
  public __v_isRef = true

  constructor(value) {
    // 存储原始值
    this._rawValue = value
    // 判断 value 是否是对象
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 判断是否改变，需要比较原始值
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      // 一定先修改了 _value
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}

const trackRefValue = (ref) => {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

const convert = (value) => (isObject(value) ? reactive(value) : value)

export const ref = (value) => new RefImpl(value)

export const isRef = (ref) => !!ref.__v_isRef
export const unRef = (ref) => (isRef(ref) ? ref.value : ref)

// 用于模板 (template) 中...
export const proxyRefs = (objectWithRefs) =>
  new Proxy(objectWithRefs, {
    get(target, key) {
      // get => isRef ? .value : value
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      // set => isRef ? .value = : value =
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    },
  })
