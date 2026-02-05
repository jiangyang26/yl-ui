import { SplitterPanelProps } from "@/components/splitter-panel"

export const SPLITTER_DEFAULT_PROPS = {
    direction: 'horizontal',
    lazy: false,
    resizable: true
} as const

export const SPLITTER_DIRECTION = {
    horizontal: 'horizontal',
    vertical: 'vertical'
} as const


export type SplitterContext = {
    panels: SplitterPanelProps[]
    onPaneAdd: (panel: SplitterPanelProps) => void
    onPaneRemove: (panel: SplitterPanelProps) => void
}