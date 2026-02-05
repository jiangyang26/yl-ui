#!/usr/bin/env node
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs'
import { optimize } from 'svgo'

const files = readdirSync('src/packages/icons/svg')
mkdirSync('src/packages/icons/components', { recursive: true })

for (const file of files) {
    if (!file.endsWith('.svg')) continue
    const rawName = file.replace('.svg', '')                    // arrow-down
    const bigCamel = rawName
        .split('-')
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join('')                                                // ArrowDown

    let svg = readFileSync(`src/packages/icons/svg/${file}`, 'utf-8')
    svg = optimize(svg, {
        plugins: ['preset-default', { name: 'removeViewBox', active: false }]
    }).data

    const sfc = `<template>\n${svg}\n</template>\n\n<script setup lang="ts">\ndefineOptions({ name: '${bigCamel}' })\n</script>\n`

    writeFileSync(`src/packages/icons/components/${bigCamel}.vue`, sfc)
}