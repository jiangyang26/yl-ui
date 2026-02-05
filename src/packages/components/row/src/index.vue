<template>
    <div :class="rowClass" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { RowProps } from './types'
import { computed, provide } from 'vue'
import { isIn } from '@/utils';
import { ROW_ALIGN, ROW_DEFAULT_PROPS, ROW_JUSTIFY } from './constants';

const props = withDefaults(defineProps<RowProps>(), ROW_DEFAULT_PROPS)

const ns = useNameSpace('row')

provide('rowGutter', props.gutter ?? 0)

const rowClass = computed(() => [
    ns.b.value
])

const rowStyle = computed(() => {
    let obj: any = { marginInline: `-${(props.gutter ?? 0) / 2 - 2}px` }
    if (props.justify && isIn(props.justify, ROW_JUSTIFY)) {
        obj.justifyContent = props.justify
    }

    if (props.align && isIn(props.align, ROW_ALIGN)) {
        switch (props.align) {
            case 'top':
                obj.alignItems = 'flex-start'
                break
            case 'bottom':
                obj.alignItems = 'flex-end'
                break
        }
    }
    return obj
})



</script>

<style scoped src="./../style/index.scss"></style>
