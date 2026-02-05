
import type { App } from "vue";
import ScrollBar from './src/index.vue'

ScrollBar.name = 'YlScrollBar'

ScrollBar.install = (app: App) => {
    app.component(ScrollBar.name!, ScrollBar)
}

export default ScrollBar
export * from './src/types'
