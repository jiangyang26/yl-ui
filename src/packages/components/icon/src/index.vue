<template>
    <i :class="iconClass" :style="iconStyle">
        <component v-if="iconComponent" :is="iconComponent"></component>
        <slot v-else></slot>
    </i>
</template>

<script lang="ts" setup>
import { useNameSpace } from '@/hooks';
import { computed } from 'vue';
import { IconProps } from './types'
import { isNumeric } from '@/utils';
import { ICON_DEFAULT_PROPS } from './constants';
import { useResolverComponent } from '@/hooks/use-resolver-component';

const ns = useNameSpace('icon')

const props = withDefaults(defineProps<IconProps>(), ICON_DEFAULT_PROPS)

const iconComponent = useResolverComponent(props.name ?? '')

const iconStyle = computed(() => {
    return {
        fontSize: isNumeric(props.size) ? `${props.size}px` : props.size,
        color: props.color ? props.color : ''
    }
})

const iconClass = computed(() => {
    return [
        ns.b.value
    ]
})
</script>

<style lang="scss" scoped src="./../style/index.scss"></style>