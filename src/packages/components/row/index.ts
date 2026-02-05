
import type { App } from "vue";
import Row from './src/index.vue'

Row.name = 'YlRow'

Row.install = (app: App) => {
    app.component(Row.name!, Row)
}

export default Row
export * from './src/types'
