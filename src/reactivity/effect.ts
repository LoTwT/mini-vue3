import { extend } from "../shared"

let activeEffect
let shouldTrack
// 依赖收集容器 Map<target, Map<key, dep>>
const targetMap = new Map<any, Map<any, Set<ReactiveEffect>>>()

export class ReactiveEffect {
  private _fn: Function
  public deps: Set<any>[] = []
  private active = true
  public onStop?: () => void
  constructor(fn: Function, public scheduler?: Function) {
    this._fn = fn
  }

  run() {
    // 会收集依赖，用 shouldTrack 区分
    if (!this.active) {
      return this._fn()
    }

    // 应该收集
    shouldTrack = true
    activeEffect = this
    const result = this._fn()
    // reset
    shouldTrack = false

    return result
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
  effect.deps.length = 0
}

export const effect = (fn, options: any = {}) => {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  extend(_effect, options)
  _effect.run()

  const runner = _effect.run.bind(_effect) as any
  runner.effect = _effect

  return runner
}

export const isTracking = () => shouldTrack && activeEffect !== undefined

// 依赖收集
export const track = (target, key) => {
  if (!isTracking()) return

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

  trackEffects(dep)
}

export const trackEffects = (dep) => {
  // 看看 dep 之前有没有添加过，添加过的话，就不添加了
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

// 触发依赖
export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  const dep = depsMap?.get(key)
  triggerEffects(dep)
}

export const triggerEffects = (dep) => {
  if (dep) {
    dep.forEach((effect) =>
      effect.scheduler ? effect.scheduler() : effect.run(),
    )
  } else {
    throw Error("empty dep")
  }
}

export const stop = (runner) => {
  runner.effect.stop()
}
