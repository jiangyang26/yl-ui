<template>
    <section :class="containerClass">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { ContainerProps } from './types'
import { computed, useSlots } from 'vue'
import { CONTAINER_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<ContainerProps>(), CONTAINER_DEFAULT_PROPS)

const ns = useNameSpace('container')

const slots = useSlots()

const isVertical = computed(() => {
    const vNodes = slots.default?.() ?? []
    return vNodes.some(node => {
        const name = (node.type as any)?.name
        return name === 'Header' || name === 'Footer'
    })
})

const containerClass = computed(() => [
    ns.b.value,
    ns.is('vertical', isVertical.value)
])


</script>

<style scoped src="./../style/index.scss"></style>
