import { track, trigger } from "./effect"
import { ReactiveFlags } from "./reactive"

const createGetter =
  (isReadonly = false) =>
  (target, key) => {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)

    if (!isReadonly) {
      // 依赖收集
      track(target, key)
    }

    return res
  }

const createSetter = () => (target, key, value) => {
  const res = Reflect.set(target, key, value)

  // 触发依赖
  trigger(target, key)

  return res
}

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
    console.warn(`key: ${key} set failed, target is readonly`, target)
    return true
  },
}
