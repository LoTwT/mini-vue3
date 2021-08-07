/**
 * 响应式管理
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

const dep = new Dep()

const info = {
    counter: 100
}

const doubleCounter = () => console.log(info.counter * 2)
const powerCounter = () => console.log(info.counter * info.counter)

// 收集副作用
dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)

info.counter++

// 数据变化，通知执行副作用
dep.notify()