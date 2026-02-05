<template>
    <component :is="tag" :class="textClass" :style="textStyle">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { TextProps } from './types'
import { computed } from 'vue'
import { isIn, isNumeric } from '@/utils';
import { TEXT_DEFAULT_PROPS, TEXT_SIZE, TEXT_TYPE } from './constants';

const props = withDefaults(defineProps<TextProps>(), TEXT_DEFAULT_PROPS)

const ns = useNameSpace('text')

const tag = computed(() => props.tag)

const textClass = computed(() => [
    ns.b.value,
    isIn(props.type, TEXT_TYPE) ? ns.m(props.type, props.type !== 'default') : '',
    isIn(props.size, TEXT_SIZE) ? ns.m(props.size, props.size !== 'default') : '',
    ns.is('truncated', props.truncated),
    ns.is('line-clamp', isNumeric(props.lineClamp)),
])

const textStyle = computed(() => {
    return {
        '-webkit-line-clamp': isNumeric(props.lineClamp) ? props.lineClamp : ''
    }
})


</script>

<style scoped src="./../style/index.scss"></style>
