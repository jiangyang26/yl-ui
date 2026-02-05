
import type { App } from "vue";
import Space from './src/index.vue'

Space.name = 'YlSpace'

Space.install = (app: App) => {
    app.component(Space.name!, Space)
}

export default Space
export * from './src/types'
