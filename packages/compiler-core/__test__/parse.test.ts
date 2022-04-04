import { NodeTypes } from "../src/ast"
import { baseParse } from "../src/parse"

describe("parse", () => {
  describe("interpolation", () => {
    it("simple interpolation", () => {
      const ast = baseParse("{{ message }}")

      // root
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: "message",
        },
      })
    })
  })

  describe("element", () => {
    it("simple element div", () => {
      const ast = baseParse("<div></div>")

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: "div",
        children: [],
      })
    })
  })

  describe("text", () => {
    it("simple text", () => {
      const ast = baseParse("some text")

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.TEXT,
        content: "some text",
      })
    })
  })

  describe("comprehensive", () => {
    it("should parse three types", () => {
      const ast = baseParse("<div>hi,{{message}}</div>")

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: "div",
        children: [
          {
            type: NodeTypes.TEXT,
            content: "hi,",
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: "message",
            },
          },
        ],
      })
    })

    it("should parse nested types", () => {
      const ast = baseParse("<div><p>hi</p>{{message}}</div>")

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: "div",
        children: [
          {
            type: NodeTypes.ELEMENT,
            tag: "p",
            children: [
              {
                type: NodeTypes.TEXT,
                content: "hi",
              },
            ],
          },
          {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: "message",
            },
          },
        ],
      })
    })

    it("should throw an error when lack of end tag", () => {
      expect(() => {
        baseParse("<div><span></div>")
      }).toThrow(new Error("lack of end tag: span"))
    })
  })
})
