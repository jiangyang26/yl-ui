import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
    base: '/yl-ui/',
    title: 'Yl-UI',
    description: 'Vue3 组件库',
    themeConfig: {
        outlineTitle: 'CONTENTS',
        nav: [{ text: '组件', link: '/components/button' }],
        sidebar: {
            '/components/': [
                {
                    text: 'Basic 基础组件',
                    items: [
                        { text: 'Button 按钮', link: '/components/button' },
                        { text: 'Icon 图标', link: '/components/icon' },
                        { text: 'Link 链接', link: '/components/link' },
                        { text: 'Text 文本', link: '/components/text' }
                    ]
                },
                {
                    text: 'Form 表单组件',
                    items: [
                        { text: 'Input 输入框', link: '/components/input' },
                        { text: 'Select 选择器', link: '/components/select' },
                        { text: 'Checkbox 复选框', link: '/components/checkbox' },
                        { text: 'Radio 单选框', link: '/components/radio' },
                        { text: 'Switch 开关', link: '/components/switch' },
                        { text: 'Form 表单', link: '/components/form' }
                    ]
                },
                {
                    text: 'Data 数据展示',
                    items: [
                        { text: 'Table 表格', link: '/components/table' },
                        { text: 'Tree 树形控件', link: '/components/tree' },
                        { text: 'List 列表', link: '/components/list' },
                        { text: 'Card 卡片', link: '/components/card' }
                    ]
                },
                {
                    text: 'Navigation 导航',
                    items: [
                        { text: 'Menu 菜单', link: '/components/menu' },
                        { text: 'Tabs 标签页', link: '/components/tabs' },
                        { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
                        { text: 'Pagination 分页', link: '/components/pagination' }
                    ]
                },
                {
                    text: 'Feedback 反馈组件',
                    items: [
                        { text: 'Message 消息提示', link: '/components/message' },
                        { text: 'Notification 通知', link: '/components/notification' },
                        { text: 'Loading 加载', link: '/components/loading' },
                        { text: 'Dialog 对话框', link: '/components/dialog' }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/jiangyang26/yl-ui' }
        ]
    },
    vite: {
        resolve: {
            alias: {
                '@': resolve(__dirname, '../../src/packages')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/theme-chalk/src/additional.scss" as *;`
                },
            },
        },
    }
})