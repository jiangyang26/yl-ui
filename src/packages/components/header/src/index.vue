<template>
    <header :class="headerClass" :style="headerStyle">
        <slot></slot>
    </header>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { HeaderProps } from './types'
import { computed } from 'vue'
import { HEADER_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<HeaderProps>(), HEADER_DEFAULT_PROPS)

const ns = useNameSpace('header')

const headerClass = computed(() => [
    ns.b.value
])

const headerStyle = computed(() => {
    return {
        [`--${ns.b.value}-height`]: props.height
    }
})


</script>

<style scoped src="./../style/index.scss"></style>
