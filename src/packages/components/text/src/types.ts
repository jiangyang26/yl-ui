import { TEXT_SIZE, TEXT_TYPE } from "./constants"

export type TextType = typeof TEXT_TYPE[number]
export type TextSize = typeof TEXT_SIZE[number]

export interface TextProps {
    type?: TextType
    size?: TextSize
    truncated?: boolean
    lineClamp?: number | string
    tag?: string
}
