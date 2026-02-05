import { computed, ComputedRef } from "vue"

const prefix = 'yl'

interface NameSpace {
    b: ComputedRef<string>
    e: (e: string | undefined, is?: boolean) => string
    m: (m: string | undefined, is?: boolean) => string
    is: (s: string, is: boolean) => string,
    c: (c: string) => string,
}
export const useNameSpace = (name: string): NameSpace => {
    return {
        b: computed(() => `${prefix}-${name}`),
        e: (e: string | undefined, is: boolean = true) => {
            return e && is ? `${prefix}-${name}__${e}` : ''
        },
        m: (m: string | undefined, is: boolean = true) => {
            return m && is ? `${prefix}-${name}--${m}` : ''
        },
        is: (s: string, is: boolean) => s && is ? `is-${s}` : '',
        c: (c: string) => c ? `${prefix}-${name}-${c}` : ''
    }
}