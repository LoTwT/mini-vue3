import { getCurrentInstance } from "./component"

export function provide(key, value) {
  const currentInsitance: any = getCurrentInstance()

  // getCurrentInstance() 需要在 setup() 中才能使用
  if (currentInsitance) {
    let { provides } = currentInsitance
    const parentProvides = currentInsitance.parent.provides

    if (provides === parentProvides) {
      provides = currentInsitance.provides = Object.create(parentProvides)
    }

    provides[key] = value
  }
}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance()

  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides

    if (key in parentProvides) {
      return parentProvides[key]
    } else if (defaultValue) {
      if (typeof defaultValue === "function") {
        return defaultValue()
      }
      return defaultValue()
    }
  }
}
