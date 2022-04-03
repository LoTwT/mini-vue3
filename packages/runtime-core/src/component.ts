import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { proxyRefs, shallowReadonly } from "@mini-vue3/reactivity"
import { emit } from "./componentEmit"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode, parent) {
  const component = {
    vnode,
    type: vnode.type,
    next: null,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    isMounted: false,
    subTree: {},
    emit: (...args) => {},
  }

  component.emit = emit.bind(null, component)

  return component
}

export function setupComponent(instance) {
  // 初始化 props
  initProps(instance, instance.vnode.props)

  // 初始化 slots
  initSlots(instance, instance.vnode.children)

  // 初始化有状态组件
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  // 获取组件实例 (用户写的组件对象)
  const Component = instance.type

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component

  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    })
    setCurrentInstance(null)
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: object | Function) {
  // object => 注入组件实例
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult)
  }

  // Function => 渲染函数

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render
}

let currentInstance = null
export function getCurrentInstance() {
  return currentInstance
}

export function setCurrentInstance(instance) {
  currentInstance = instance
}
