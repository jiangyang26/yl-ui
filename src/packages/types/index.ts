// 可为空
export type Nullable<T> = T | null

// 尺寸值类型
export const SIZE_TYPE = {
    number: 'number',
    percent: 'percent'
} as const

export type SizeType = typeof SIZE_TYPE[keyof typeof SIZE_TYPE]

export type SizeValue = {
    num: number
    type: SizeType
}