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
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
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
                additionalData: `@use "@/theme-chalk/src/additional.scss" as *;`,
            },
        },
    },
    plugins: [
        Vue()
    ]
})
