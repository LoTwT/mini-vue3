import { createRenderer } from "@mini-vue3/runtime-core"

function createElement(type) {
  return document.createElement(type)
}

function patchProp(el, key, prevVal, nextVal) {
  // 判断 key 是不是以 on 开头
  const isOn = (key: string) => /^on[A-Z]/.test(key)

  if (isOn(key)) {
    // 事件
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, nextVal)
  } else {
    // 属性
    if (nextVal === undefined || nextVal === null) el.removeAttribute(key)
    else el.setAttribute(key, nextVal)
  }
}

function insert(child, parent, anchor) {
  // parent.append(child)
  parent.insertBefore(child, anchor || null)
}

function remove(child) {
  const parent = child.parentNode

  if (parent) {
    parent.removeChild(child)
  }
}

function setElementText(el, text) {
  el.textContent = text
}

const renderer = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
}) as any

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from "@mini-vue3/runtime-core"
