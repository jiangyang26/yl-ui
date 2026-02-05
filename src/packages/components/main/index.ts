
import type { App } from "vue";
import Main from './src/index.vue'

Main.name = 'YlMain'

Main.install = (app: App) => {
    app.component(Main.name!, Main)
}

export default Main
export * from './src/types'
