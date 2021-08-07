/**
 * 响应式管理器
 */
class Dep {
    constructor() {
        // 存放副作用 (依赖的函数) 的集合
        this.subscribers = new Set()
    }

    /**
     * 通知
     * 执行所有被收集的副作用
     */
    notify() {
        this.subscribers.forEach(effect => effect())
    }

    /**
     * 收集副作用
     */
    depend() {
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }
}

// Map(): key 可以是对象或任何原始值
// WeakMap(): key 只能是对象，弱引用，便于 gc

// 存放不同对象响应式管理器的容器 targetMap: WeakMap<target, Map<key, Dep>>
const targetMap = new WeakMap()
const getDep = (target, key) => {
    // 1. 根据对象 (target) 取出对应的 Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    // 2. 取出具体的 dep
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }

    return dep
}


/**
 * vue3 对 raw 进行数据劫持
 * Proxy()
 * @param {*} raw 原始数据
 */
const reactive = (raw) => {
    return new Proxy(raw, {
        get(target, key) {
            const dep = getDep(target, key)
            dep.depend()
            return target[key]
        },
        set(target, key, newValue) {
            if (newValue !== target[key]) {
                const dep = getDep(target, key)
                target[key] = newValue
                dep.notify()
            }
        }
    })
}


// 协助收集副作用
let activeEffect = null
const watchEffect = (effect) => {
    activeEffect = effect
    effect() // 收集时就执行一次 (立即执行)
    activeEffect = null
}

// 测试代码
// const info = reactive({
//     counter: 100,
//     name: "lo",
// })
// const foo = reactive({
//     title: "foo"
// })

// watchEffect(() => console.log("effect1: ", info.counter * 2, info.name))
// watchEffect(() => console.log("effect2: ", info.counter * info.counter))
// watchEffect(() => console.log("effect3: ", info.counter + 10, info.name))
// watchEffect(() => console.log("effect4: ", foo.title))

// info.counter++
// info.name = "loo"