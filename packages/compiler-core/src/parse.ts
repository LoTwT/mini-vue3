import { NodeTypes } from "./ast"

const enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParserContext(content)
  return createRoot(parseChildren(context, []))
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
  const rawContent = parseTextData(context, rawContentLength)

  const content = rawContent.trim()

  advanceBy(context, closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
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

function parseChildren(context, ancestors) {
  const nodes: any[] = []

  while (!isEnd(context, ancestors)) {
    const s = context.source
    let node

    if (s.startsWith("{{")) {
      // 插值
      node = parseInterpolation(context)
    } else if (s[0] === "<") {
      // 标签
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors)
      }
    }

    if (!node) {
      // 文本
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}

function isEnd(context, ancestors) {
  const s = context.source

  // 2. 遇到结束标签
  if (s.startsWith("</")) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag
      if (startsWithEndTagOpen(s, tag)) return true
    }
  }

  // 1. source length 为 0 或不存在
  return !s
}

function parseText(context) {
  let endIndex = context.source.length
  const endTokens = ["<", "{{"]

  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i])
    if (index !== -1 && endIndex > index) endIndex = index
  }

  const content = parseTextData(context, endIndex)

  return {
    type: NodeTypes.TEXT,
    content,
  }
}

function parseTextData(context, length: number) {
  const content = context.source.slice(0, length)
  advanceBy(context, length)

  return content
}

function parseElement(context, ancestors) {
  const element = parseTag(context, TagType.Start) as any

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (startsWithEndTagOpen(context.source, element.tag))
    parseTag(context, TagType.End)
  else throw new Error(`lack of end tag: ${element.tag}`)

  return element
}

function startsWithEndTagOpen(source, tag) {
  return (
    source.startsWith("</") &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag
  )
}

function parseTag(context, type: TagType) {
  // 1. 解析 tag
  const match = /^<\/?([a-z]*)/i.exec(context.source)!
  const tag = match[1]

  // 2. 推进解析
  advanceBy(context, match[0].length + 1)

  if (type === TagType.End) return

  return {
    type: NodeTypes.ELEMENT,
    tag,
  }
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
