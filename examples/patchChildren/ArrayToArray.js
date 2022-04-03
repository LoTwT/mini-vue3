import { h, ref } from "../../packages/vue3/dist/index.mjs"

// 1. 左侧对比
// (a b) c
// (a b) d e
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "E" }, "E"),
// ]

// 2. 右侧对比
// a (b c)
// d e (b c)
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ]

// 3. 新的比旧的多
// 创建新的
// 左侧
// (a b)
// (a b) c d
// const prevChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")]
// const nextChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ]

// 右侧
// (a b)
// d c (a b)
// const prevChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")]
// const nextChildren = [
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
// ]

// 4. 新的比旧的少
// 删除旧的多的
// 左侧
// (a b) c
// (a b)
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")]

// 右侧
// a (b c)
// (b c)
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [h("div", { key: "B" }, "B"), h("div", { key: "C" }, "C")]

// 5. 中间 (乱序)
// 删除旧的 (在旧的里面存在，新的里面不存在)
// 5.1
// a b (c d) f g
// a b (e c) f g
// d 在新的里面没有 => 删除
// c props 变化
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C", id: "c-prev" }, "C"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "F" }, "F"),
//   h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "C", id: "c-next" }, "C"),
//   h("div", { key: "F" }, "F"),
//   h("div", { key: "G" }, "G"),
// ]

// 5.1.1
// a b (c e d) f g
// a b (e c ) f g
// 中间，旧的比新的多，多出来的可以直接删除
const prevChildren = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "C", id: "c-prev" }, "C"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "D" }, "D"),
  h("div", { key: "F" }, "F"),
  h("div", { key: "G" }, "G"),
]
const nextChildren = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "C", id: "c-next" }, "C"),
  h("div", { key: "F" }, "F"),
  h("div", { key: "G" }, "G"),
]

export default {
  name: "ArrayToArray",
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange,
    }
  },
  render() {
    const self = this
    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren)
  },
}
