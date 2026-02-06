import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  root: path.resolve(__dirname, 'play'),
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src/packages')}`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/theme-chalk/src/additional.scss" as *;`,
      },
    },
  },
  plugins: [
    Vue(),
    Components({
      // 基础配置
      dirs: [path.resolve(__dirname, 'src/packages/icons/components')],
      extensions: ['vue'],
      dts: path.resolve(__dirname, 'auto-imports.d.ts')
    })
  ]
})
