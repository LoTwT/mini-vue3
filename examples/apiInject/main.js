import { createApp } from "../../packages/vue3/dist/index.mjs"
import { App } from "./App.js"

const rootContainer = document.querySelector("#app")
createApp(App).mount(rootContainer)
