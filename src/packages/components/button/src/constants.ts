export const BUTTON_DEFAULT_PROPS = {
    type: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    loadingIcon: 'loading',
    plain: false,
    round: false,
    circle: false,
    color: '',
    nativeType: 'button',
    autofocus: false,
    text: false,
    bg: false,
    tag: 'button'
} as const

export const BUTTON_TYPE = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

export const BUTTON_SIZE = ['large', 'default', 'small'] as const

export const BUTTON_NATIVE_TYPE = ['button', 'submit', 'reset'] as const