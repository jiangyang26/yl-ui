// 颜色类型定义
export type ColorInput = string | RGB | HSL
export type ColorOutput = string // 返回 hex 格式

export interface RGB {
    r: number // 0-255
    g: number // 0-255
    b: number // 0-255
}

export interface HSL {
    h: number // 0-360
    s: number // 0-100
    l: number // 0-100
}

/**
 * 主函数：调整颜色亮度
 * @param color 颜色值，支持多种格式
 * @param amount 调整量，正数变暗，负数变亮，范围 -10 到 10
 * @returns 调整后的 hex 颜色值
 */
export function adjustLightness(color: ColorInput, amount: number): ColorOutput {
    // 参数验证
    if (amount < -10 || amount > 10) {
        throw new Error('amount 参数必须在 -10 到 10 之间')
    }

    // 将输入颜色转换为 HSL
    const hsl = toHSL(color)

    // 计算调整后的亮度
    // amount 正数：变暗，负数：变亮
    // 这里映射 amount 到亮度变化百分比
    // -10 -> +50%, +10 -> -50%
    const percentage = (amount / 20) * 100 // -10 到 10 映射到 -50% 到 +50%
    const newLightness = Math.max(0, Math.min(100, hsl.l + percentage))

    // 转换为 hex 返回
    return HSLToHex({ ...hsl, l: newLightness })
}

/**
 * 类似 SCSS 的 darken 函数
 * @param color 颜色值
 * @param amount 变暗程度 0-100 (%)
 */
export function darken(color: ColorInput, amount: number): ColorOutput {
    const hsl = toHSL(color)
    const newLightness = Math.max(0, hsl.l - amount)
    return HSLToHex({ ...hsl, l: newLightness })
}

/**
 * 类似 SCSS 的 lighten 函数
 * @param color 颜色值
 * @param amount 变亮程度 0-100 (%)
 */
export function lighten(color: ColorInput, amount: number): ColorOutput {
    const hsl = toHSL(color)
    const newLightness = Math.min(100, hsl.l + amount)
    return HSLToHex({ ...hsl, l: newLightness })
}

// ============ 颜色转换工具函数 ============

/**
 * 将任意颜色格式转换为 HSL
 */
export function toHSL(color: ColorInput): HSL {
    if (typeof color === 'string') {
        return parseColorString(color)
    } else if ('r' in color) {
        return RGBToHSL(color)
    } else if ('h' in color) {
        return color
    }
    throw new Error('不支持的颜色格式')
}

/**
 * 解析颜色字符串
 */
function parseColorString(colorStr: string): HSL {
    const str = colorStr.trim().toLowerCase()

    // 处理命名颜色
    if (namedColors[str]) {
        return parseColorString(namedColors[str])
    }

    // 处理 hex 格式
    if (str.startsWith('#')) {
        return hexToHSL(str)
    }

    // 处理 rgb/rgba 格式
    if (str.startsWith('rgb')) {
        return parseRGBString(str)
    }

    // 处理 hsl 格式
    if (str.startsWith('hsl')) {
        return parseHSLString(str)
    }

    throw new Error(`无法解析的颜色格式: ${colorStr}`)
}

/**
 * hex 转 HSL
 */
function hexToHSL(hex: string): HSL {
    // 移除 # 号
    hex = hex.replace(/^#/, '')

    // 处理缩写格式 #abc -> #aabbcc
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('')
    }

    // 处理 8 位 hex (带透明度)
    if (hex.length === 8) {
        hex = hex.substring(0, 6)
    }

    if (hex.length !== 6) {
        throw new Error(`无效的 hex 颜色: #${hex}`)
    }

    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        h /= 6
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

/**
 * RGB 转 HSL
 */
function RGBToHSL(rgb: RGB): HSL {
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        h /= 6
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

/**
 * HSL 转 hex
 */
export function HSLToHex(hsl: HSL): string {
    const { h, s, l } = hsl

    const hDecimal = h / 360
    const sDecimal = s / 100
    const lDecimal = l / 100

    let r = 0, g = 0, b = 0

    if (s === 0) {
        r = g = b = lDecimal
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = lDecimal < 0.5
            ? lDecimal * (1 + sDecimal)
            : lDecimal + sDecimal - lDecimal * sDecimal
        const p = 2 * lDecimal - q

        r = hue2rgb(p, q, hDecimal + 1 / 3)
        g = hue2rgb(p, q, hDecimal)
        b = hue2rgb(p, q, hDecimal - 1 / 3)
    }

    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

/**
 * 解析 RGB 字符串
 */
function parseRGBString(rgbStr: string): HSL {
    const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (!match) throw new Error(`无效的 RGB 颜色: ${rgbStr}`)

    const rgb: RGB = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3])
    }

    return RGBToHSL(rgb)
}

/**
 * 解析 HSL 字符串
 */
function parseHSLString(hslStr: string): HSL {
    const match = hslStr.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*[\d.]+)?\)/)
    if (!match) throw new Error(`无效的 HSL 颜色: ${hslStr}`)

    return {
        h: parseInt(match[1]),
        s: parseFloat(match[2]),
        l: parseFloat(match[3])
    }
}

/**
 * 检查是否为有效颜色
 */
export function isValidColor(color: string): boolean {
    try {
        parseColorString(color)
        isValidHexColor(color)
        return true
    } catch {
        return false
    }
}

/**
 * 验证是否是有效的十六进制颜色
 */
export function isValidHexColor(color: string): boolean {
    if (!color.startsWith('#')) return false

    const hex = color.slice(1) // 去掉 #

    // 检查长度
    if (![3, 4, 6, 8].includes(hex.length)) return false

    // 检查是否都是十六进制字符
    const hexRegex = /^[0-9A-Fa-f]+$/
    if (hexRegex.test(hex)) {
        return true
    }

    throw new Error('Invalid hex color')
}

// ============ 常用颜色名称映射 ============
const namedColors: Record<string, string> = {
    // 基础颜色
    'red': '#ff0000',
    'green': '#008000',
    'blue': '#0000ff',
    'yellow': '#ffff00',
    'cyan': '#00ffff',
    'magenta': '#ff00ff',
    'black': '#000000',
    'white': '#ffffff',
    'gray': '#808080',
    'grey': '#808080',

    // 扩展颜色
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'aqua': '#00ffff',
    'aquamarine': '#7fffd4',
    'azure': '#f0ffff',
    'beige': '#f5f5dc',
    'bisque': '#ffe4c4',
    'blanchedalmond': '#ffebcd',
    'blueviolet': '#8a2be2',
    'brown': '#a52a2a',
    'burlywood': '#deb887',
    'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00',
    'chocolate': '#d2691e',
    'coral': '#ff7f50',
    'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc',
    'crimson': '#dc143c',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b',
    'darkgray': '#a9a9a9',
    'darkgreen': '#006400',
    'darkgrey': '#a9a9a9',
    'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f',
    'darkorange': '#ff8c00',
    'darkorchid': '#9932cc',
    'darkred': '#8b0000',
    'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f',
    'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f',
    'darkslategrey': '#2f4f4f',
    'darkturquoise': '#00ced1',
    'darkviolet': '#9400d3',
    'deeppink': '#ff1493',
    'deepskyblue': '#00bfff',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'dodgerblue': '#1e90ff',
    'firebrick': '#b22222',
    'floralwhite': '#fffaf0',
    'forestgreen': '#228b22',
    'fuchsia': '#ff00ff',
    'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff',
    'gold': '#ffd700',
    'goldenrod': '#daa520',
    'greenyellow': '#adff2f',
    'honeydew': '#f0fff0',
    'hotpink': '#ff69b4',
    'indianred': '#cd5c5c',
    'indigo': '#4b0082',
    'ivory': '#fffff0',
    'khaki': '#f0e68c',
    'lavender': '#e6e6fa',
    'lavenderblush': '#fff0f5',
    'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd',
    'lightblue': '#add8e6',
    'lightcoral': '#f08080',
    'lightcyan': '#e0ffff',
    'lightgoldenrodyellow': '#fafad2',
    'lightgray': '#d3d3d3',
    'lightgreen': '#90ee90',
    'lightgrey': '#d3d3d3',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'lightsteelblue': '#b0c4de',
    'lightyellow': '#ffffe0',
    'lime': '#00ff00',
    'limegreen': '#32cd32',
    'linen': '#faf0e6',
    'maroon': '#800000',
    'mediumaquamarine': '#66cdaa',
    'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3',
    'mediumpurple': '#9370db',
    'mediumseagreen': '#3cb371',
    'mediumslateblue': '#7b68ee',
    'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585',
    'midnightblue': '#191970',
    'mintcream': '#f5fffa',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'navy': '#000080',
    'oldlace': '#fdf5e6',
    'olive': '#808000',
    'olivedrab': '#6b8e23',
    'orange': '#ffa500',
    'orangered': '#ff4500',
    'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa',
    'palegreen': '#98fb98',
    'paleturquoise': '#afeeee',
    'palevioletred': '#db7093',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'peru': '#cd853f',
    'pink': '#ffc0cb',
    'plum': '#dda0dd',
    'powderblue': '#b0e0e6',
    'purple': '#800080',
    'rebeccapurple': '#663399',
    'rosybrown': '#bc8f8f',
    'royalblue': '#4169e1',
    'saddlebrown': '#8b4513',
    'salmon': '#fa8072',
    'sandybrown': '#f4a460',
    'seagreen': '#2e8b57',
    'seashell': '#fff5ee',
    'sienna': '#a0522d',
    'silver': '#c0c0c0',
    'skyblue': '#87ceeb',
    'slateblue': '#6a5acd',
    'slategray': '#708090',
    'slategrey': '#708090',
    'snow': '#fffafa',
    'springgreen': '#00ff7f',
    'steelblue': '#4682b4',
    'tan': '#d2b48c',
    'teal': '#008080',
    'thistle': '#d8bfd8',
    'tomato': '#ff6347',
    'transparent': '#00000000',
    'turquoise': '#40e0d0',
    'violet': '#ee82ee',
    'wheat': '#f5deb3',
    'whitesmoke': '#f5f5f5',
    'yellowgreen': '#9acd32'
}