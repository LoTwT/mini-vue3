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
            dealProp(el, key, value)
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

/**
 * 处理 props 中的单个键值对
 * 边界条件处理：事件 or 属性
 */
const dealProp = (el, key, value, isAdd = true) => {
    if (isAdd) {
        if (key.startsWith("on")) {
            el.addEventListener(key.slice(2).toLowerCase(), value)
        } else {
            el.setAttribute(key, value)
        }
    } else {
        if (key.startsWith("on")) {
            el.removeEventListener(key.slice(2).toLowerCase(), value)
        }
        el.removeAttribute(key)
    }
}

/**
 * 
 * @param n1 原 vnode
 * @param n2 新 vnode
 */
const patch = (n1, n2) => {
    // 当两个 vnode 的 tag 不同时，直接移除原 vnode，挂载新的 vnode
    if (n1.tag !== n2.tag) {
        // 获得 n1 的父元素
        const n1ElParent = n1.el.parentElement
        // 移除 n1
        n1ElParent.removeChild(n1.el)
        // 挂载 n2
        mount(n2, n1ElParent)
    } else {
        // 两个 vnode 的 tag 相同时
        // 1. 取出 element 对象，并在 n2 中进行保存
        const el = n2.el = n1.el

        // 2. 处理 props
        const oldProps = n1.props || {}
        const newProps = n2.props || {}

        // 2.1 获取所有的 newProps 添加到 el
        for (const key in newProps) {
            const oldValue = oldProps[key]
            const newValue = newProps[key]

            if (newValue !== oldValue) {
                dealProp(el, key, newValue)
            }
        }

        // 2.2 删除旧的 props
        for (const key in oldProps) {
            dealProp(el, key, oldProps[key], false)
            if (!(key in newProps)) {
                dealProp(el, key, oldProps[key], false)
            }
        }

        // 3. 处理 children
        const oldChildren = n1.children || []
        const newChildren = n2.children || []

        // 3.1 情况一：newChildren 本身是一个string
        if (typeof newChildren === "string") {
            // 边界情况 edge case
            if (typeof oldChildren === "string") {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren
                }
            } else {
                el.innerHTML = newChildren
            }
        } else {
            // 3.2 情况二：newChildren 本身是一个数组
            if (typeof oldChildren === "string") {
                el.innerHTML = ""
                newChildren.forEach(vnode => mount(vnode, el))
            } else {
                // 都为数组时
                // 1. 前面有相同节点时，进行 patch 操作
                const commonLength = Math.min(oldChildren.length, newChildren.length)
                for (let i = 0; i < commonLength; i++) {
                    patch(oldChildren[i], newChildren[i])
                }

                // 2. newChildren.length > oldChildren.length，对新增节点进行挂载
                if (newChildren.length > oldChildren.length) {
                    newChildren.slice(commonLength).forEach(vnode => mount(vnode, el))
                }

                // 3. newChildren.length < oldChildren.length，对原有多余节点进行移除
                if (newChildren.length < oldChildren.length) {
                    oldChildren.slice(commonLength).forEach(vnode => el.removeChild(vnode.el))
                }
            }
        }
    }
}