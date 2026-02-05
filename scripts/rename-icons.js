#!/usr/bin/env node
import { readdirSync, renameSync } from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'src/packages/icons/components')

for (const file of readdirSync(dir)) {
    if (!file.endsWith('.vue')) continue
    const rawName = file.replace('.vue', '')        // arrow-down
    const camel = rawName
        .split('-')
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join('')                                    // ArrowDown
    renameSync(join(dir, file), join(dir, `${camel}.vue`))
}
console.log('✅ 已全部改为大驼峰')