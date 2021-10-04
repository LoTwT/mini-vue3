export const extend = Object.assign

export const isObject = (obj) => obj != null && typeof obj === "object"

export const hasChanged = (value, newValue) => !Object.is(value, newValue)
