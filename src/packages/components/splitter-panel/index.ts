
import type { App } from "vue";
import SplitterPanel from './src/index.vue'

SplitterPanel.name = 'YlSplitterPanel'

SplitterPanel.install = (app: App) => {
    app.component(SplitterPanel.name!, SplitterPanel)
}

export default SplitterPanel
export * from './src/types'
