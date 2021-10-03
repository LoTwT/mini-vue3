class ReactiveEffect {
  private _fn: Function
  constructor(fn: Function, public scheduler?: Function) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}

let activeEffect
export const effect = (fn, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()

  return _effect.run.bind(_effect)
}

// 依赖收集容器 Map<target, Map<key, dep>>
const targetMap = new Map<any, Map<any, Set<ReactiveEffect>>>()

// 依赖收集
export const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(activeEffect)
}

// 触发依赖
export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  const depSet = depsMap?.get(key)

  if (depSet) {
    depSet.forEach((dep) => (dep.scheduler ? dep.scheduler() : dep.run()))
  } else {
    throw Error("empty depSet")
  }
}
