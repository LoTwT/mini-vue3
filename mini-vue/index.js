const createApp = (rootComponent) => {
    return {
        mount(selector) {
            // 根元素
            const container = document.querySelector(selector)
            // 是否已被挂载
            let isMounted = false
            // 原来的 VNode
            let oldVNode = null

            watchEffect(() => {
                // 未挂载时先挂载
                if (!isMounted) {
                    oldVNode = rootComponent.render()
                    mount(oldVNode, container)
                    isMounted = true
                } else {
                    // 已挂载后则更新
                    const newVNode = rootComponent.render()
                    patch(oldVNode, newVNode)
                    oldVNode = newVNode
                }
            })
        }
    }
}