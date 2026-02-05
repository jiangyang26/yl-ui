import type { App } from 'vue'
import * as icons from './components/index'   // 所有 *.vue 图标

export default {
    install(app: App) {
        for (const [key, component] of Object.entries(icons)) {
            app.component(key, component)
        }
    }
}