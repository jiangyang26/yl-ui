
import type { App } from "vue";
import Header from './src/index.vue'

Header.name = 'YlHeader'

Header.install = (app: App) => {
    app.component(Header.name!, Header)
}

export default Header
export * from './src/types'
