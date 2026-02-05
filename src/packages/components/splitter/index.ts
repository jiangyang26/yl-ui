
import type { App } from "vue";
import Splitter from './src/index.vue'

Splitter.name = 'YlSplitter'

Splitter.install = (app: App) => {
    app.component(Splitter.name!, Splitter)
}

export default Splitter
export * from './src/types'
