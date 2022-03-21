// 存放 依赖收集Map 的 Map
// Map<target, Map<key, Set<ReactiveEffect>>>
const targetMap = new Map<any, Map<any, Set<ReactiveEffect>>>()

// 存放当前 effect 的 ReactiveEffect 类实例
let activeEffect: ReactiveEffect

class ReactiveEffect {
  constructor(private _fn: Function) {}

  run() {
    activeEffect = this
    return this._fn()
  }
}

export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}

/**
 * 依赖收集
 */
export function track(target, key) {
  // target => key => dep
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map<any, Set<ReactiveEffect>>()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  dep.add(activeEffect)
}

/**
 * 依赖触发
 */
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap?.get(key)

  if (dep) {
    dep.forEach((effect) => effect.run())
  }
}
