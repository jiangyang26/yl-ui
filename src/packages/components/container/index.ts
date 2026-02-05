
import type { App } from "vue";
import Container from './src/index.vue'

Container.name = 'YlContainer'

Container.install = (app: App) => {
    app.component(Container.name!, Container)
}

export default Container
export * from './src/types'
