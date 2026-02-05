<template>
    <div :class="buttonGroupClass">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from '@/hooks';
import { computed } from 'vue';
import { ButtonGroupProps, defaultProps } from './types';

const ns = useNameSpace('button-group')

const props = withDefaults(defineProps<ButtonGroupProps>(), defaultProps)

const buttonGroupClass = computed(() => [
    ns.b.value,
    ns.m(props.direction)
])
</script>

<style lang="scss" scoped src="./../style/index.scss"></style>