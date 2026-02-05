import type { App } from "vue";
import Icon from './src/index.vue'

Icon.name = 'YlIcon'

Icon.install = (app: App) => {
    app.component(Icon.name!, Icon)
}

export default Icon
export * from './src/types'