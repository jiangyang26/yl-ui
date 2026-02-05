#!/usr/bin/env node
import { readdirSync, writeFileSync } from 'fs'
import { join, basename, extname } from 'path'

const dir = join(process.cwd(), 'src/packages/icons/components')
const files = readdirSync(dir).filter(f => extname(f) === '.vue')

const lines = files.map(f => {
    const fileName = basename(f, '.vue')               // arrow-down
    const componentName = fileName
        .split('-')                                      // ['arrow','down']
        .map(word => word[0].toUpperCase() + word.slice(1)) // Arrow + Down
        .join('')                                        // ArrowDown
    return `export { default as ${componentName} } from './${fileName}.vue'`
})

const barrel = lines.join('\n') + '\n'
writeFileSync(join(dir, 'index.ts'), barrel)
console.log('✅ 大驼峰 barrel 生成完成：', lines.length, '个')