import type { Component } from 'vue'
import { LINE_UNDERLINE, LINK_TYPE } from './constants'

export type LinkType = typeof LINK_TYPE[number]
export type LineUnderline = typeof LINE_UNDERLINE[number]

export interface LinkProps {
    type?: LinkType
    underline?: LineUnderline
    disabled?: boolean,
    icon?: string | Component
}
