import { NodeTypes } from "./ast"
import { helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers"

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
      genExpression(node, context)
      break

    default:
      break
  }
}

function genExpression(node, context) {
  context.push(`${node.content}`)
}

function genInterpolation(node, context) {
  context.push(`${context.helper(TO_DISPLAY_STRING)}(`)
  genNode(node.content, context)
  context.push(")")
}

function genText(node, context) {
  context.push(`'${node.content}'`)
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
