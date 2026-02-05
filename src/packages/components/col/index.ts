
import type { App } from "vue";
import Col from './src/index.vue'

Col.name = 'YlCol'

Col.install = (app: App) => {
    app.component(Col.name!, Col)
}

export default Col
export * from './src/types'
