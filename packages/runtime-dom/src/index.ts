import { createRenderer } from "@mini-vue3/runtime-core"

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, val) {
  // 判断 key 是不是以 on 开头
  const isOn = (key: string) => /^on[A-Z]/.test(key)

  if (isOn(key)) {
    // 事件
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, val)
  } else {
    // 属性
    el.setAttribute(key, val)
  }
}

function insert(el, parent) {
  parent.append(el)
}

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
}) as any

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from "@mini-vue3/runtime-core"
