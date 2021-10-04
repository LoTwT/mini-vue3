import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

const createActiveObject = (raw, baseHandlers) => new Proxy(raw, baseHandlers)

export const reactive = (raw) => createActiveObject(raw, mutableHandlers)
export const readonly = (raw) => createActiveObject(raw, readonlyHandlers)

export const isReactive = (value) => !!value[ReactiveFlags.IS_REACTIVE]
export const isReadonly = (value) => !!value[ReactiveFlags.IS_READONLY]
