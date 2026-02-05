import { App } from 'vue'
import ButtonGroup from './src/index.vue'

ButtonGroup.name = 'YlButtonGroup'

ButtonGroup.install = (app: App) => {
    app.component(ButtonGroup.name!, ButtonGroup)
}

export default ButtonGroup
export * from './src/types'