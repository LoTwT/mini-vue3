import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
  }

  return component
}

export function setupComponent(instance) {
  // 初始化 props
  // 初始化 slots

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
    const setupResult = setup()
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: object | Function) {
  // object => 注入组件实例
  if (typeof setupResult === "object") {
    instance.setupState = setupResult
  }

  // Function => 渲染函数

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render
}
