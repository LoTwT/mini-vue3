import { isObject } from "@mini-vue3/shared"
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

/**
 * 创建 Proxy 的包装方法
 * 更便于阅读
 * @param raw
 * @param baseHandlers
 * @returns
 */
function createReactiveObject(raw, baseHandlers) {
  if (!isObject(raw)) {
    console.warn(`target ${raw} is not an object!`)
    return raw
  }

  return new Proxy(raw, baseHandlers)
}
