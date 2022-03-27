import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // patch 递归处理
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  // 判断是不是 element
  processComponent(vnode, container)
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  // 创建组件实例
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  // vnode => patch
  // vnode => element => mountElement
  patch(subTree, container)
}
