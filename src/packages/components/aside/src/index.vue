<template>
    <aside :class="asideClass" :style="asideStyle">
        <slot></slot>
    </aside>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { AsideProps } from './types'
import { computed } from 'vue'
import { ASIDE_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<AsideProps>(), ASIDE_DEFAULT_PROPS)

const ns = useNameSpace('aside')

const asideClass = computed(() => [
    ns.b.value
])

const asideStyle = computed(() => {
    return {
        [`${ns.b.value}-width`]: props.width
    }
})


</script>

<style scoped src="./../style/index.scss"></style>
