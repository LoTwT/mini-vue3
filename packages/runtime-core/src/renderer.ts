import { createComponentInstance, setupComponent } from "./component"
import { ShapeFlags } from "@mini-vue3/shared"
import { Fragment, Text } from "./vnode"
import { createAppApi } from "./createApp"
import { effect } from "@mini-vue3/reactivity"

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options

  function render(vnode, container) {
    // patch 递归处理
    patch(null, vnode, container, null)
  }

  /**
   * @param n1 old VNode
   * @param n2 new VNode
   */
  function patch(n1, n2, container, parentComponent) {
    // 处理组件
    const { type, shapeFlag } = n2

    // Fragment => 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent)
        }

        break
    }
  }

  function processFragment(n1, n2, container, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function processText(n1, n2, container) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }

  function processElement(n1, n2, container, parentComponent) {
    // 初始化
    if (!n1) mountElement(n2, container, parentComponent)
    // 更新
    else patchElement(n1, n2, container)
  }

  function patchElement(n1, n2, container) {
    console.log("patch element")
    console.log("n1", n1)
    console.log("n2", n2)
  }

  function processComponent(n1, n2, container, parentComponent) {
    mountComponent(n2, container, parentComponent)
  }

  function mountElement(vnode, container, parentComponent) {
    const { type, props, children, shapeFlag } = vnode

    const el = (vnode.el = hostCreateElement(type))

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
      hostPatchProp(el, key, props[key])
    }

    hostInsert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent)
    })
  }

  function mountComponent(initialVNode, container, parentComponent) {
    // 创建组件实例
    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance, initialVNode, container) {
    effect(() => {
      if (!instance.isMounted) {
        console.log("init")
        const { proxy } = instance
        const subTree = (instance.subTree = instance.render.call(proxy))

        // vnode => patch
        // vnode => element => mountElement
        patch(null, subTree, container, instance)

        // 初始化完成
        initialVNode.el = subTree.el
        instance.isMounted = true
      } else {
        console.log("update")
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree

        patch(prevSubTree, subTree, container, instance)
      }
    })
  }

  return {
    createApp: createAppApi(render),
  }
}
