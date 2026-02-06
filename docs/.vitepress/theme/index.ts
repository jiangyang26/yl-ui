import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@/theme-chalk/index'
import './style/index.scss'
import * as icons from '@/icons/components/index'

import ExampleViewer from './components/example-viewer.vue'
import CodeBlock from './components/code-block.vue'
import ApiTable from './components/api-table.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册自定义全局组件
        for (const [key, component] of Object.entries(icons)) {
            app.component(key, component)
        }

        app.component('ExampleViewer', ExampleViewer)
        app.component('CodeBlock', CodeBlock)
        app.component('ApiTable', ApiTable)
    }
} satisfies Theme