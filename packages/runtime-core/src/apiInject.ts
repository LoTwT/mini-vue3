import { getCurrentInstance } from "./component"

export function provide(key, value) {
  // 存
  const currentInstance = getCurrentInstance() as any

  if (currentInstance) {
    let { provides } = currentInstance
    const parentProvides = currentInstance.parent.provides

    // 初始化时调用一次
    if (provides === parentProvides) {
      // 原型链
      provides = currentInstance.provides = Object.create(parentProvides)
    }

    provides[key] = value
  }
}

export function inject(key, defaultValue) {
  // 取
  const currentInstance = getCurrentInstance() as any

  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides

    if (key in parentProvides) return parentProvides[key]
    else if (defaultValue) {
      if (typeof defaultValue === "function") return defaultValue()
      return defaultValue
    }
  }
}
