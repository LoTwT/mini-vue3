import { extend } from "@mini-vue3/shared"

// 存放 依赖收集Map 的 Map
// Map<target, Map<key, Set<ReactiveEffect>>>
const targetMap = new Map<any, Map<any, Set<ReactiveEffect>>>()

// 存放当前 effect 的 ReactiveEffect 类实例
let activeEffect: ReactiveEffect

class ReactiveEffect {
  /**
   * 反向收集的所有依赖的 Set 容器
   */
  public deps: Set<ReactiveEffect>[] = []

  /**
   * stop 的回调
   */
  public onStop?: () => void

  /**
   * 当前 effect 状态 ( 激活 / 失活 )
   */
  private active = true

  constructor(private _fn: Function, public scheduler?: Function) {}

  run() {
    activeEffect = this
    return this._fn()
  }

  /**
   * 失活 effect
   */
  stop() {
    if (this.active) {
      cleanupEffect(this)

      // 调用 onStop 回调
      if (this.onStop) this.onStop()

      this.active = false
    }
  }
}

/**
 * 清除依赖
 * @param { ReactiveEffect } effect
 */
function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => dep.delete(effect))
}

interface EffectOptions {
  scheduler?: Function
  onStop?: () => void
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect(fn: Function, options?: EffectOptions) {
  const _effect = new ReactiveEffect(fn, options?.scheduler)

  // 将 options 注入到 _effect 上
  extend(_effect, options)
  _effect.run()

  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect

  return runner
}

/**
 * 依赖收集
 */
export function track(target, key) {
  // todo 一个优雅的注释
  if (!activeEffect) return

  // target => key => dep
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map<any, Set<ReactiveEffect>>()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  dep.add(activeEffect)

  // 反向收集所有依赖的 Set 容器
  activeEffect.deps.push(dep)
}

/**
 * 依赖触发
 */
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const dep = depsMap?.get(key)

  if (dep) {
    dep.forEach((effect) => {
      if (effect.scheduler) effect.scheduler()
      else effect.run()
    })
  }
}

/**
 * 使被收集的依赖失活
 * deactive effect
 */
export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop()
}
