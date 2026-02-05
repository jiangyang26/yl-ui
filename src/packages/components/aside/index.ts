
import type { App } from "vue";
import Aside from './src/index.vue'

Aside.name = 'YlAside'

Aside.install = (app: App) => {
    app.component(Aside.name!, Aside)
}

export default Aside
export * from './src/types'
