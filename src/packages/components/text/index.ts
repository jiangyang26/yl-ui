
import type { App } from "vue";
import Text from './src/index.vue'

Text.name = 'YlText'

Text.install = (app: App) => {
    app.component(Text.name!, Text)
}

export default Text
export * from './src/types'
