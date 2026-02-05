import path from 'node:path'
import { readdirSync } from 'node:fs'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const comps = readdirSync(path.resolve(__dirname, 'src/packages/components'))
    .filter(name => name !== 'index.ts')
    .map(name => {
        return [
            name, // 输出目录名
            path.resolve(__dirname, `src/packages/components/${name}/index.ts`)
        ]
    })


export default defineConfig({
    build: {
        cssCodeSplit: true,
        lib: {
            name: 'index',
            entry: path.resolve(__dirname, 'src/packages/index.ts'),
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
            globals: {
                vue: 'Vue'
            }
        },
        rollupOptions: {
            external: ['vue'],
            // input: Object.fromEntries(comps)
        }
    },
    resolve: {
        alias: {
            '@': `${path.resolve(__dirname, 'src/packages')}`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // -> 每个 scss 文件都会插入这段文本
                // additionalData: `@use "theme-chalk/src/index.scss" as *;`,
                // -> 相对 loadPaths 的路径
                loadPaths: [path.resolve(__dirname, 'src/packages/theme-chalk/src')]
            },
        },
    },
    plugins: [
        Vue()
    ]
})
