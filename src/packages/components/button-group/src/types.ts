export interface ButtonGroupProps {
    /** 按钮组方向 */
    direction?: 'horizontal' | 'vertical'
}

export const defaultProps = {
    direction: 'horizontal'
} as const