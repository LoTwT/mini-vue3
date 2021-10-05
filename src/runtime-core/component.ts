export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  }

  return component
}

export function setupComponent(instance) {
  // initProps()
  // initSlots()

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  const component = instance.type
  const { setup } = component

  if (setup) {
    // 如果是 function，则认为是 render 函数
    // 如果是 object，注入到组件上下文中
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  // todo function
  // object
  if (typeof setupResult === "object") {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const component = instance.type

  // 此处默认组件必须有 render 函数
  instance.render = component.render
}
