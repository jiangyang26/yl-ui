<template>
    <div :class="splitterPanelClass">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { SplitterPanelProps } from './types'
import { SPLITTER_PANEL_DEFAULT_PROPS } from './constants';
import { computed } from 'vue'

const props = withDefaults(defineProps<SplitterPanelProps>(), SPLITTER_PANEL_DEFAULT_PROPS)


const emit = defineEmits(['update:size'])

const ns = useNameSpace('splitter-panel')

defineExpose({
    emitUpdateSize: (size: number) => {
        emit('update:size', size)
    }
})


const splitterPanelClass = computed(() => [
    ns.b.value
])


</script>

<style scoped src="./../style/index.scss"></style>
