export const SPACE_DEFAULT_PROPS = {
    direction: 'horizontal',
    alignment: 'center',
    wrap: false,
    fill: false,
    fillRatio: 100
} as const

export const SPACE_DIRECTION = ['vertical', 'horizontal'] as const

export const SPACE_ALIGNMENT = ['normal', 'stretch', 'alignment', 'center', 'start', 'end', 'flex-start', 'flex-end', 'self-start', 'self-end', 'anchor-center', 'baseline', 'first baseline', 'last baseline', 'lignment (for positional alignment only)', 'safe center', 'unsafe center', 'ues', 'inherit', 'initial', 'revert', 'revert-layer', 'unset'] as const
