export const extend = Object.assign

export const isObject = (obj) => obj != null && typeof obj === "object"

export const hasChanged = (value, newValue) => !Object.is(value, newValue)

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)
