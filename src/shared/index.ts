export const extend = Object.assign

export const isObject = (obj) => obj != null && typeof obj === "object"

export const hasChanged = (value, newValue) => !Object.is(value, newValue)

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)

// add -> Add
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

// add-foo -> addFoo
export const camelize = (str: string) =>
  str.replace(/-(\w)/g, (_, c: string) => (c ? c.toUpperCase() : ""))

export const toHandlerKey = (str: string) => (str ? "on" + capitalize(str) : "")
