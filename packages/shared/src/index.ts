export const extend = Object.assign

export const isObject = (val) => val != null && typeof val === "object"

export const hasChanged = (v1, v2) => !Object.is(v1, v2)

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)

// camelCase: add => Add
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toHandlerKey = (str: string) => {
  return str ? `on${capitalize(str)}` : ""
}

// kebabCase: add-foo => addFoo
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ""
  })
}

export { ShapeFlags } from "./shapeFlags"
