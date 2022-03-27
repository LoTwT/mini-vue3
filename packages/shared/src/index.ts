export const extend = Object.assign

export const isObject = (val) => val != null && typeof val === "object"

export const hasChanged = (v1, v2) => !Object.is(v1, v2)

export { ShapeFlags } from "./shapeFlags"
