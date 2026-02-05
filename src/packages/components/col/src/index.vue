<template>
    <div :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { ColProps } from './types'
import { computed, inject } from 'vue'
import { isNumeric } from '@/utils';
import { COL_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<ColProps>(), COL_DEFAULT_PROPS)

const ns = useNameSpace('col')

const gutter = inject('rowGutter', 0)

const colSpan = computed(() => {
    if (props.span && isNumeric(props.span)) {
        if (Number(props.span) > 24) {
            return 24
        }
        if (Number(props.span) < 1) {
            return 1
        }
        return Number(props.span)
    }

    return 24
})


const colClass = computed(() => [
    ns.b.value,
    `${ns.b.value}-${colSpan.value}`
])


const colStyle = computed(() => {
    let obj: any = { paddingInline: `${gutter / 2}px` }

    if (props.offset && isNumeric(props.offset)) {
        obj.marginLeft = (Number(props.offset) / 24 * 100) + '%'
    }

    return obj
})


</script>

<style scoped src="./../style/index.scss"></style>
