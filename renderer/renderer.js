const h = (tag, props, children) => {
    // vnode => javascrip 对象
    return {
        tag,
        props,
        children
    }
}

/**
 * 挂载 vnode
 */
const mount = (vnode, container) => {
    // vnode => element
    // 1. 创建出真实的原生 dom，并且在 vnode 上保留 el
    const el = vnode.el = document.createElement(vnode.tag)

    // 2. 处理 props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key]

            // 边界条件处理：事件 or 属性
            if (key.startsWith("on")) {
                el.addEventListener(key.slice(2).toLowerCase(), value)
            } else {
                el.setAttribute(key, value)
            }
        }
    }

    // 3. 处理 children
    // 简单处理，只判断 string 和 Array
    if (vnode.children) {
        if (typeof vnode.children === "string") {
            el.textContent = vnode.children
        } else {
            vnode.children.forEach(item => mount(item, el))
        }
    }

    // 4. 将 el 挂载到 container 上
    container.appendChild(el)
}