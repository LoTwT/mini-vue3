import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./vnode"

export function render(vnode, container) {
  // 调用 patch 方法
  patch(vnode, container, null)
}

export function patch(vnode, container, parentComponent) {
  // ShapeFlags
  // vnode -> flag

  const { type, shapeFlag } = vnode

  // Fragment => 只渲染 children
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break
    case Text:
      processText(vnode, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        // 处理 element
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        // STATEFUL_COMPONENT
        // 处理 component
        processComponent(vnode, container, parentComponent)
        break
      }
  }
}

function processFragment(vnode, container, parentComponent) {
  mountChildren(vnode, container, parentComponent)
}

function processText(vnode, container) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}

function processElement(vnode, container, parentComponent) {
  mountElement(vnode, container, parentComponent)
}

function mountElement(vnode, container, parentComponent) {
  const { type, props, children, shapeFlag } = vnode
  // type
  const el = (vnode.el = document.createElement(type))

  // props
  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }

  // children -> Array String
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // TEXT_CHILDREN
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // ARRAY_CHILDREN
    mountChildren(vnode, el, parentComponent)
  }

  container.append(el)
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach((v) => patch(v, container, parentComponent))
}

function processComponent(vnode, container, parentComponent) {
  mountComponent(vnode, container, parentComponent)
}

function mountComponent(initialVNode, container, parentComponent) {
  const instance = createComponentInstance(initialVNode, parentComponent)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container, instance)

  // element -> mount
  initialVNode.el = subTree.el
}
