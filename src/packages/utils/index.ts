import { SIZE_TYPE, SizeValue } from '@/types'

/**
 * 将 kebab-case 字符串转换为 PascalCase
 * @param str - 输入的 kebab-case 字符串
 * @returns 转换后的 PascalCase 字符串
 */
export const kebabToPascal = (str: string): string => {
    // 处理空字符串或非字符串情况
    if (!str || typeof str !== 'string') {
        return ''
    }

    return str
        .split('-')
        .filter(word => word.length > 0) // 过滤空字符串
        .map(word => {
            // 首字母大写，其余字母小写
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join('')
}

/**
 * 判断是否能转为数字
 * @param v 
 * @returns 是否能转为数字
 */
export const isNumeric = (v: unknown): v is number | `${number}` => {
    return !isNaN(Number(v)) && v !== '' && v !== null && v !== undefined && Number(v) >= 0;
}

/**
 * 判断一个值是否在给定的列表中
 * @param value - 待判断的值
 * @param validList - 列表
 * @returns 是否在列表中
 */
export const isIn = <T extends string | number | boolean>(
    value: unknown,
    validList: readonly T[]
): value is T => {
    return validList.includes(value as T)
}

/**
 * 解析 CSS 字符串
 * @param css 
 * @returns 
 */
export const parseCSS = (css: string): Record<string, string> => {
    return Object.fromEntries(
        css
            .split(';')
            .filter(Boolean)
            .map(s => s.split(':').map(v => v.trim()) as [string, string])
    )
}


/**
 * 校验尺寸值
 * @param val 数值
 * @returns 尺寸值对象 | null
 */
export const vaildSizeValue = (val: number | string | undefined | null): SizeValue | null => {
    if (!val) return null

    let obj: SizeValue = { num: 0, type: SIZE_TYPE.number }

    if (isNumeric(val)) {
        obj.num = Number(val)
        obj.type = SIZE_TYPE.number
    } else if (typeof val === 'string') {
        const m = val.match(/^(\d+(?:\.\d+)?)%$/)
        if (m !== null && Number(m[1]) >= 0 && Number(m[1]) <= 100) {
            obj.num = Number(m[1])
            obj.type = SIZE_TYPE.percent
        } else {
            return null
        }
    } else {
        return null
    }

    return obj
}


export * from './color'
