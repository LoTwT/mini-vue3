/**
 * 响应式管理器
 */
class Dep {
    constructor() {
        // 存放副作用 (依赖的函数) 的集合
        this.subscribers = new Set()
    }

    /**
     * 数据更改后，需要重新执行的函数被称为副作用 (effect)
     */
    addEffect(effect) {
        this.subscribers.add(effect)
    }

    /**
     * 通知
     * 执行所有被收集的副作用
     */
    notify() {
        this.subscribers.forEach(effect => effect())
    }
}

module.exports = Dep
