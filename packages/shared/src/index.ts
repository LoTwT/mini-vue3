export const extend = Object.assign

export const isObject = (val) => val != null && typeof val === "object"

export const hasChanged = (v1, v2) => !Object.is(v1, v2)

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)

export { ShapeFlags } from "./shapeFlags"
