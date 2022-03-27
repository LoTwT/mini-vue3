# mini-vue3

pnpm + monorepo + tsup + vitest 实现一个简单的 [vue3](https://github.com/vuejs/core)

## scripts

```bash
# 因为 monorepo，需要先 build，模块间才能正确互相引用
pnpm build

# build 的 watch 模式
pnpm dev

# 运行测试
pnpm test
```

## reactivity

`@mini-vue3/reactivity`

- [x] reactive
- [x] ref
- [x] readonly
- [x] computed
- [x] track 依赖收集
- [x] trigger 依赖触发
- [x] isReactive
- [x] 嵌套 reactive
- [x] toRaw
- [x] effect.scheduler
- [x] effect.stop
- [x] isReadonly
- [x] isProxy
- [x] shallowReadonly
- [x] proxyRefs

## runtime-core

`@mini-vue3/runtime-core`

- [ ] 支持组件类型
- [x] 支持 element 类型
- [ ] 初始化 props
- [ ] setup 可获取 props 和 context
- [ ] 支持 component emit
- [ ] 支持 proxy
- [ ] 可以在 render 函数中获取 setup 返回的对象
- [ ] nextTick 的实现
- [ ] 支持 getCurrentInstance
- [ ] 支持 provide/inject
- [ ] 支持最基础的 slots
- [ ] 支持 Text 类型节点
- [x] 支持 $el api

## shared

`@mini-vue3/shared`

- [x] extend
- [x] isObject
- [x] hasChanged

## compiler-core

- [ ] 解析插值
- [ ] 解析 element
- [ ] 解析 text

## runtime-dom

- [ ] 支持 custom renderer
