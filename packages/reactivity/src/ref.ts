import { hasChanged, isObject } from "@mini-vue3/shared"
import {
  isTracking,
  ReactiveEffect,
  trackEffects,
  triggerEffects,
} from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  // ref 的值
  private _value
  // 原始值
  private _rawValue
  // ref 的依赖
  public dep: Set<ReactiveEffect>
  public __v_isRef = true

  constructor(value) {
    // 存储原始值
    this._rawValue = value
    // 如果 value 是对象，需要用 reactive 包裹
    this._value = convert(value)

    this.dep = new Set()
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 用原始值进行比较！
    if (!hasChanged(this._rawValue, newValue)) return

    // 一定先修改了 value 的值
    this._rawValue = newValue
    this._value = convert(newValue)

    triggerEffects(this.dep)
  }
}

/**
 * 值转换
 * @param value
 * @returns
 */
function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref: RefImpl) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      // 使用 unRef 解包
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    },
  })
}
