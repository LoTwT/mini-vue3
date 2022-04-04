import { NodeTypes } from "./ast"
import {
  CREATE_ELEMENT_VNODE,
  helperMapName,
  TO_DISPLAY_STRING,
} from "./runtimeHelpers"
import { isString } from "@mini-vue3/shared"

export function generate(ast) {
  const context = createCodegenContext()
  const { push } = context

  genFunctionPreamble(ast, context)

  push("return ")
  const functionName = "render"
  const args = ["_ctx", "_cache"]
  const signature = args.join(", ")

  push(`function ${functionName}(${signature}) {`)
  push(`return `)
  genNode(ast.codegenNode, context)
  push(`}`)

  return {
    code: context.code,
  }
}
function genFunctionPreamble(ast, context) {
  if (ast.helpers.length === 0) return

  const VueBinging = "Vue"
  const aliasHelper = (s) => `${helperMapName[s]}: _${helperMapName[s]}`
  context.push(
    `const { ${ast.helpers.map(aliasHelper).join(", ")} } = ${VueBinging}\n`,
  )
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context)
      break

    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break

    case NodeTypes.SIMPLE_EXPRESSION:
      genSimpleExpression(node, context)
      break

    case NodeTypes.ELEMENT:
      genElement(node, context)
      break

    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context)
      break

    default:
      break
  }
}

function genCompoundExpression(node, context) {
  const children = node.children

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (isString(child)) {
      context.push(child)
    } else {
      genNode(child, context)
    }
  }
}

function genElement(node, context) {
  const { tag, children, props } = node
  context.push(`${context.helper(CREATE_ELEMENT_VNODE)}(`)
  genNodeList(genNullable([tag, props, children]), context)
  context.push(")")
}

function genNodeList(nodes, context) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (isString(node)) context.push(node)
    else genNode(node, context)

    if (i < nodes.length - 1) context.push(", ")
  }
}

function genNullable(args) {
  return args.map((arg) => arg || "null")
}

function genSimpleExpression(node, context) {
  context.push(`${node.content}`)
}

function genInterpolation(node, context) {
  context.push(`${context.helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  context.push(")")
}

function genText(node, context) {
  context.push(`"${node.content}"`)
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source
    },
    helper(key) {
      return `_${helperMapName[key]}`
    },
  }

  return context
}
