
import type { App } from "vue";
import Link from './src/index.vue'

Link.name = 'YlLink'

Link.install = (app: App) => {
    app.component(Link.name!, Link)
}

export default Link
export * from './src/types'
