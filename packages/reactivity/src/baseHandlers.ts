import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"
import { isObject } from "@mini-vue3/shared"

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

export const mutableHandlers = {
  get,
  set,
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`can't set ${String(key)} to a readonly object.`)
    return true
  },
}

function createGetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) return !isReadonly
    else if (key === ReactiveFlags.IS_READONLY) return isReadonly

    const res = Reflect.get(target, key)

    // 嵌套 reactive
    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res)

    if (!isReadonly) {
      // 依赖收集
      track(target, key)
    }

    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    // 依赖触发
    trigger(target, key)

    return res
  }
}
