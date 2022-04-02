import { createRenderer } from "../../packages/vue3/dist/index.mjs"
import { App } from "./App.js"

const game = new PIXI.Application({
  width: 500,
  height: 500,
})

document.body.append(game.view)

const render = createRenderer({
  createElement(type) {
    if (type === "rect") {
      const rect = new PIXI.Graphics()
      rect.beginFill(0xff0000)
      rect.drawRect(0, 0, 100, 100)
      rect.endFill()

      return rect
    }
  },
  patchProp(el, key, val) {
    el[key] = val
  },
  insert(el, parent) {
    parent.addChild(el)
  },
})

render.createApp(App).mount(game.stage)
