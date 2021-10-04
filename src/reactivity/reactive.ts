import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

const createActiveObject = (raw, baseHandlers) => new Proxy(raw, baseHandlers)

export const reactive = (raw) => createActiveObject(raw, mutableHandlers)
export const readonly = (raw) => createActiveObject(raw, readonlyHandlers)
