import { camelize, toHandlerKey } from "../shared/index"

export function emit(instance, event, ...args) {
  // 用函数柯里化得到组件实例 instance

  // instance.props -> event
  const { props } = instance

  // TPP
  // 先写一个特定的行为 -> 重构成通用的行为
  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}
