import { createApp } from "../../lib/mini-vue.esm.js"
import { App } from "./App.js"

// 和 vue3 api 保持一致
const rootContainer = document.querySelector("#app")
createApp(App).mount(rootContainer)
