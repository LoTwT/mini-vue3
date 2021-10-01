# miniVue

study from coderwhy

---

对 vue 部分模块的最简单实现
仅用作个人学习 :smile:

---

- 渲染器 renderer
  - h()
  - mount()
  - patch()
- 响应式 reactivity
  - 响应式的思想：
    1. 收集副作用 (依赖的函数)
    1. 数据发生变化后，通知管理器依次重新执行副作用
- mini-vue
  - createApp()
  - 最简单的 vue 核心功能的实现
