import { createComponentInstance, setupComponent } from "./component"
import { ShapeFlags } from "@mini-vue3/shared"

export function render(vnode, container) {
  // patch 递归处理
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  const { shapeFlag } = vnode

  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
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
  const { type, props, children, shapeFlag } = vnode

  const el = (vnode.el = document.createElement(type))

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // vnode
    mountChildren(vnode, el)
  }

  for (const key in props) {
    const val = props[key]

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
