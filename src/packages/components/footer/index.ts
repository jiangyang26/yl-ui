
import type { App } from "vue";
import Footer from './src/index.vue'

Footer.name = 'YlFooter'

Footer.install = (app: App) => {
    app.component(Footer.name!, Footer)
}

export default Footer
export * from './src/types'
