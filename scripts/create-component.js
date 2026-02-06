import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const BASE_DIR = './src/packages/components'

function toCamelCase(str) {
    return str
        .split('-')               // 按短横拆分
        .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
}

function toPascal(str) {
    return str
        .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()) // 去掉分隔符并大写后一字母
        .replace(/^(.)/, (_, c) => c.toUpperCase())       // 首字母大写
}

function toUpperSnake(str) {
    return str
        .split('-')          // 先按短横拆
        .map(s => s.toUpperCase())
        .join('_');          // 再拼成下划线
}

/* ========== 1. 模板库（按文件名 key 对应） ========== */
const TEMPLATES = {
    /* ---- Vue 组件 ---- */
    'src/index.vue': (name) => `<template>
    <div :class="${toCamelCase(name)}Class"></div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { ${toPascal(name)}Props } from './types'
import { ${toUpperSnake(name)}_DEFAULT_PROPS } from './constants';
import { computed } from 'vue'

const props = withDefaults(defineProps<${toPascal(name)}Props>(), ${toUpperSnake(name)}_DEFAULT_PROPS)

const ns = useNameSpace('${name}')

const ${toCamelCase(name)}Class = computed(() => [
    ns.b.value
])


</script>

<style scoped src="./../style/index.scss"></style>
`,

    /* ---- 类型声明 ---- */
    'src/types.ts': (name) => `
export interface ${toPascal(name)}Props {}
`,

    /* ---- 内部常量 ---- */
    'src/constants.ts': (name) => `
export const ${toUpperSnake(name)}_DEFAULT_PROPS = {
} as const
    `,

    /* ---- 样式 ---- */
    'style/index.scss': (name) => `

@use 'mixin/function' as *;
@use 'common/config' as *;

@include b(${name}) {}
`,

    /* ---- 样式入口（供按需加载） ---- */
    'style/index.ts': () => `import './index.scss'
`,

    /* ---- 组件主入口 ---- */
    'index.ts': (name) => `
import type { App } from "vue";
import ${toPascal(name)} from './src/index.vue'

${toPascal(name)}.name = '${toPascal("yl-" + name)}'

${toPascal(name)}.install = (app: App) => {
    app.component(${toPascal(name)}.name!, ${toPascal(name)})
}

export default ${toPascal(name)}
export * from './src/types'
`
}

/* ========== 2. 要创建的文件清单 ========== */
const DEFAULT_STRUCTURE = Object.keys(TEMPLATES)

/* ========== 3. 交互 & 创建 ========== */
async function main() {
    const dirName = await askQuestion('请输入目录名: ')
    if (!dirName || dirName.trim() === '') {
        console.log('❌ 目录名不能为空')
        rl.close()
        return
    }

    const cleanName = dirName.trim()
    const targetDir = path.resolve(BASE_DIR, cleanName)

    console.log(`\n将在 ${BASE_DIR} 下创建: ${cleanName}`)
    console.log('包含文件:')
    DEFAULT_STRUCTURE.forEach(f => console.log(`  ${f}`))

    const confirm = await askQuestion('\n确认创建？(y/N): ')
    if (confirm.toLowerCase() !== 'y') {
        console.log('❌ 已取消')
        rl.close()
        return
    }

    // 创建目录
    fs.mkdirSync(targetDir, { recursive: true })

    // 写模板
    DEFAULT_STRUCTURE.forEach(filePath => {
        const fullPath = path.join(targetDir, filePath)
        const dirPath = path.dirname(fullPath)
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })

        const content = TEMPLATES[filePath](cleanName) // 传入目录名，可动态替换
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log(`  ✓ ${filePath}`)
    })

    console.log(`\n✅ 创建完成: ${targetDir}`)
    rl.close()
}

function askQuestion(q) {
    return new Promise(resolve => rl.question(q, resolve))
}

main()