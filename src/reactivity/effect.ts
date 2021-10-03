import { extend } from "../shared"

class ReactiveEffect {
  private _fn: Function
  public deps: Set<any>[] = []
  private active = true
  public onStop?: () => void
  constructor(fn: Function, public scheduler?: Function) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

const cleanupEffect = (effect) => {
  effect.deps.forEach((dep) => dep.delete(effect))
}

let activeEffect
export const effect = (fn, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  _effect.run()

  const runner = _effect.run.bind(_effect) as any
  runner.effect = _effect

  return runner
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

  if (!activeEffect) return

  dep.add(activeEffect)
  activeEffect.deps.push(dep)
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

export const stop = (runner) => {
  runner.effect.stop()
}
