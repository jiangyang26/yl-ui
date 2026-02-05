import { SPLITTER_DIRECTION } from "./constants"

export type SplitterDirection = typeof SPLITTER_DIRECTION[keyof typeof SPLITTER_DIRECTION]

export interface SplitterProps {
    direction?: SplitterDirection
    lazy?: boolean
    resizable?: boolean
}
