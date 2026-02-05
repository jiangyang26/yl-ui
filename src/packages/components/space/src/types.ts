import { PropType, VNode } from "vue"
import { SPACE_ALIGNMENT, SPACE_DIRECTION } from "./constants"

export type SpaceDirection = typeof SPACE_DIRECTION[number]
export type SpaceAlignment = typeof SPACE_ALIGNMENT[number]

export interface SpaceProps {
    direction?: SpaceDirection
    alignment?: SpaceAlignment
    size?: string | number | [number, number]
    wrap?: boolean
    fill?: boolean
    fillRatio?: string | number
    spacer?: string | number | VNode
}
