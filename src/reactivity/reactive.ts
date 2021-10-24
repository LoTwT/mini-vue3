import { isObject } from "../shared/index"
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

const createActiveObject = (raw, baseHandlers) => {
  if (!isObject(raw)) {
    console.warn(`raw ${raw} must be an object`)
    return
  }

  return new Proxy(raw, baseHandlers)
}

export const reactive = (raw) => createActiveObject(raw, mutableHandlers)

export const readonly = (raw) => createActiveObject(raw, readonlyHandlers)
export const shallowReadonly = (raw) =>
  createActiveObject(raw, shallowReadonlyHandlers)

export const isReactive = (value) => !!value[ReactiveFlags.IS_REACTIVE]
export const isReadonly = (value) => !!value[ReactiveFlags.IS_READONLY]
export const isProxy = (value) => isReactive(value) || isReadonly(value)
