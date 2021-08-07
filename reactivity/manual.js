// 手动实现最简单的响应式管理

const Dep = require("./dep")

const info = {
    counter: 100
}

const doubleCounter = () => console.log(info.counter * 2)
const powerCounter = () => console.log(info.counter * info.counter)

// 实例化响应式管理器
const dep = new Dep()

// 收集副作用
dep.addEffect(doubleCounter)
dep.addEffect(powerCounter)

// 改变数据
info.counter++

// 数据变化，通知执行副作用
dep.notify()