import { ROW_ALIGN, ROW_JUSTIFY } from "./constants"

export type RowJustify = typeof ROW_JUSTIFY[number]
export type RowAlign = typeof ROW_ALIGN[number]

export interface RowProps {
    /** 列间隔 */
    gutter?: number
    /** 列对齐方式 */
    justify?: RowJustify
    /** 列垂直对齐方式 */
    align?: RowAlign
}

