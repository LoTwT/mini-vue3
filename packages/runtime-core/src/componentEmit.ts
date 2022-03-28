import { camelize, toHandlerKey } from "@mini-vue3/shared"

export function emit(instance, event, ...args) {
  // instance.props => event
  // 取到对应的事件监听函数
  const { props } = instance

  // TPP
  // 先写一个特定的行为 => 重构成通用的行为

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)
}
