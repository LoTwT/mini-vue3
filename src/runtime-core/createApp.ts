import { createVNode } from "./vnode"

export function createAppApi(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先转化为 vnode
        // 后续所有逻辑操作，都基于 vnode 做处理
        // component => vnode
        const vnode = createVNode(rootComponent)

        render(vnode, rootContainer)
      },
    }
  }
}
