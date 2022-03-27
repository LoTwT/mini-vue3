import { createApp } from "../../packages/runtime-core/dist/index.mjs"
import { App } from "./App.js"

const rootContainer = document.querySelector("#app")
createApp(App).mount(rootContainer)
