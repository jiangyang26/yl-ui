<template>
    <footer :class="footerClass" :style="footerStyle">
        <slot></slot>
    </footer>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { FooterProps } from './types'
import { computed } from 'vue'
import { FOOTER_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<FooterProps>(), FOOTER_DEFAULT_PROPS)

const ns = useNameSpace('footer')

const footerClass = computed(() => [
    ns.b.value
])

const footerStyle = computed(() => {
    return {
        [`--${ns.b.value}-height`]: props.height
    }
})


</script>

<style scoped src="./../style/index.scss"></style>
