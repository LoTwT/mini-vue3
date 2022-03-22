import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

/**
 * 创建 Proxy 的包装方法
 * 更便于阅读
 * @param raw
 * @param baseHandlers
 * @returns
 */
function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
