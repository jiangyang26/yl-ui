import { resolveComponent } from "vue"
import type { Component, DefineComponent } from "vue"

export const useResolverComponent = (c: string | Component | DefineComponent) => {
    if (!c) {
        return null
    }
    if (typeof c === 'object') {
        return c
    }

    // 如果是字符串，尝试解析为组件
    if (typeof c === 'string') {
        try {
            const component = resolveComponent(c)
            if (typeof component === 'object') return component
            else return null
        } catch (error) { }
    }

    return null
}