import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // 调用 patch 方法
  patch(vnode, container)
}

export function patch(vnode, container) {
  // todo 判断是 component 还是 element
  if (typeof vnode.type === "string") {
    // 处理 element
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    // 处理 component
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode
  // type
  const el = document.createElement(type)

  // props
  for (const key in props) {
    el.setAttribute(key, props[key])
  }

  // children -> Array String
  if (typeof children === "string") {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => patch(v, container))
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container)
}
