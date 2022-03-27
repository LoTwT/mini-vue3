import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "@mini-vue3/shared"

export function render(vnode, container) {
  // patch 递归处理
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  // 判断是不是 element

  if (typeof vnode.type === "string") {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode

  const el = (vnode.el = document.createElement(type))

  if (typeof children === "string") {
    el.textContent = children
  } else if (Array.isArray(children)) {
    // vnode
    mountChildren(vnode, el)
  }

  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function mountComponent(initialVNode, container) {
  // 创建组件实例
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode => patch
  // vnode => element => mountElement
  patch(subTree, container)

  // 初始化完成
  initialVNode.el = subTree.el
}
