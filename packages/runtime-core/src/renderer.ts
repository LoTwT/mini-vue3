import { createComponentInstance, setupComponent } from "./component"
import { ShapeFlags } from "@mini-vue3/shared"
import { Fragment, Text } from "./vnode"
import { createAppApi } from "./createApp"

export function createRenderer(options) {
  const { createElement, patchProp, insert } = options

  function render(vnode, container) {
    // patch 递归处理
    patch(vnode, container, null)
  }

  function patch(vnode, container, parentComponent) {
    // 处理组件
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
          processElement(vnode, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent)
        }

        break
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

  function processComponent(vnode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent)
  }

  function mountElement(vnode, container, parentComponent) {
    const { type, props, children, shapeFlag } = vnode

    const el = (vnode.el = createElement(type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // vnode
      mountChildren(vnode, el, parentComponent)
    }

    // DOM
    // for (const key in props) {
    //   const val = props[key]

    //   // 判断 key 是不是以 on 开头
    //   const isOn = (key: string) => /^on[A-Z]/.test(key)

    //   if (isOn(key)) {
    //     // 事件
    //     const event = key.slice(2).toLowerCase()
    //     el.addEventListener(event, val)
    //   } else {
    //     // 属性
    //     el.setAttribute(key, val)
    //   }
    // }

    // container.append(el)

    for (const key in props) {
      patchProp(el, key, props[key])
    }

    insert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(v, container, parentComponent)
    })
  }

  function mountComponent(initialVNode, container, parentComponent) {
    // 创建组件实例
    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)

    // vnode => patch
    // vnode => element => mountElement
    patch(subTree, container, instance)

    // 初始化完成
    initialVNode.el = subTree.el
  }

  return {
    createApp: createAppApi(render),
  }
}
