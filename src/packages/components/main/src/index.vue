<template>
    <main :class="mainClass">
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { MainProps } from './types'
import { computed } from 'vue'
import { MAIN_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<MainProps>(), MAIN_DEFAULT_PROPS)

const ns = useNameSpace('main')

const mainClass = computed(() => [
    ns.b.value
])


</script>

<style scoped src="./../style/index.scss"></style>
