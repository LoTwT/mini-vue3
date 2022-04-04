import { createVNodeCall, NodeTypes } from "../ast"
import { CREATE_ELEMENT_VNODE } from "../runtimeHelpers"

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      // 中间处理
      // tag
      const vnodeTag = `"${node.tag}"`
      // props
      let vnodeProps
      // children
      const children = node.children
      let vnodeChildren = children[0]

      node.codegenNode = createVNodeCall(
        context,
        vnodeTag,
        vnodeProps,
        vnodeChildren,
      )
    }
  }
}
