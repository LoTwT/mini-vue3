import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  // 调用 patch 方法
  patch(vnode, container)
}

export function patch(vnode, container) {
  // ShapeFlags
  // vnode -> flag

  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    // 处理 element
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // STATEFUL_COMPONENT
    // 处理 component
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const { type, props, children, shapeFlag } = vnode
  // type
  const el = (vnode.el = document.createElement(type))

  // props
  for (const key in props) {
    el.setAttribute(key, props[key])
  }

  // children -> Array String
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // TEXT_CHILDREN
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // ARRAY_CHILDREN
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

function mountComponent(initialVNode, container) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container)

  // element -> mount
  initialVNode.el = subTree.el
}
