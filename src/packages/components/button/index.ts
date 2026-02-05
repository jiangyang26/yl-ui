import type { App } from "vue";
import Button from './src/index.vue'

Button.name = 'YlButton'

Button.install = (app: App) => {
    app.component(Button.name!, Button)
}

export default Button
export * from './src/types'