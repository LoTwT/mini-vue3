import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // 调用 patch 方法
  patch(vnode, container)
}

export function patch(vnode, container) {
  // 判断是 component 还是 element
  // 处理 component
  processComponent(vnode, container)
}

export function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

export function mountComponent(vnode, container) {
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
