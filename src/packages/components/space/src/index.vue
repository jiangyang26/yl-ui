<template>
    <div :class="spaceClass" :style="spaceStyle">
        <template v-for="(node, index) in nodes">
            <div :class="ns.e('item')" :style="spaceItemStyle">
                <component :is="node"></component>
            </div>

            <template v-if="index !== nodes.length - 1">
                <component v-if="spacerIsVNode" :is="spacer"></component>
                <span :class="ns.e('spacer')" v-if="spacerIsRegular">{{ spacer }}</span>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { SpaceProps } from './types'
import { computed, Fragment, Comment, useSlots, isVNode } from 'vue'
import { isIn, isNumeric } from '@/utils';
import { SPACE_DEFAULT_PROPS, SPACE_DIRECTION } from './constants';

const props = withDefaults(defineProps<SpaceProps>(), SPACE_DEFAULT_PROPS)

const ns = useNameSpace('space')

const spacerIsVNode = computed(() => {
    return isVNode(props.spacer)
})

const spacerIsRegular = computed(() => {
    return props.spacer && !spacerIsVNode.value && (typeof props.spacer === 'string' || isNumeric(props.spacer)) && props.spacer.toString().length < 10
})

const slots = useSlots()
const nodes = computed(() => {
    let vNodes = slots.default?.() ?? []

    return vNodes.filter(node => node.type !== Comment).flatMap(node => {
        if (node.type === Fragment && Array.isArray(node.children)) {
            return node.children as any
        }
        return node
    })
})

const spaceClass = computed(() => [
    ns.b.value,
    ns.m(props.direction, isIn(props.direction, SPACE_DIRECTION) && props.direction === 'vertical'),
    ns.is('wrap', props.wrap)
])

const spaceStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.alignment) {
        style.alignItems = props.alignment
    }

    if (props.size) {
        if (isNumeric(props.size)) {
            style.gap = `${props.size}px`
        } else if (Array.isArray(props.size)) {
            if (props.size.length >= 2) {
                style.gap = `${props.size[0]}px ${props.size[1]}px`
            }
        } else {
            style.gap = props.size
        }
    }

    return style
})

const spaceItemStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.fill) {
        style.flexGrow = '1'

        if (isNumeric(props.fillRatio)) {
            if (Number(props.fillRatio) > 100) {
                style.minWidth = '100%'
            } else if (Number(props.fillRatio) < 0) {
                style.minWidth = `0`
            } else {
                style.minWidth = `${props.fillRatio}%`
            }
        }
    }

    return style
})



</script>

<style scoped src="./../style/index.scss"></style>
