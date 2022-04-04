import { NodeTypes } from "./ast"

export function baseParse(content: string) {
  const context = createParserContext(content)
  return createRoot(parseChildren(context))
}

function parseInterpolation(context) {
  const openDelimiter = "{{"
  const closeDelimiter = "}}"

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length,
  )

  advanceBy(context, openDelimiter.length)

  // 内容长度
  const rawContentLength = closeIndex - openDelimiter.length
  // 截取内容
  const rawContent = context.source.slice(0, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, rawContentLength + closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  }
}

/**
 * 解析推进
 * 去除已解析部分
 */
function advanceBy(context, length: number) {
  context.source = context.source.slice(length)
}

function parseChildren(context) {
  const nodes: any[] = []
  let node

  if (context.source.startsWith("{{")) {
    node = parseInterpolation(context)
    nodes.push(node)
  }

  return nodes
}

function createRoot(children) {
  return {
    children,
  }
}

function createParserContext(content: string) {
  return {
    source: content,
  }
}
