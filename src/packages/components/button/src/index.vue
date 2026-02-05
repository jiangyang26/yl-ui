<template>
    <component :is="tag" :class="buttonClass" :disabled="disabled" :autofocus="autofocus" :type="nativeType">
        <Icon v-if="icon && !hasIcon">
            <component :is="resolveIconComponent(icon)"></component>
        </Icon>

        <Icon v-if="hasIcon">
            <slot name="icon"></slot>
        </Icon>


        <Icon v-if="loading && !hasLoading">
            <component :is="resolveIconComponent(loadingIcon)"></component>
        </Icon>

        <slot name="loading" v-if="loading"></slot>

        <slot v-if="!circle"></slot>
    </component>
</template>

<script lang="ts" setup>
import { useNameSpace } from '@/hooks/index'
import { ButtonProps } from './types';
import { computed, readonly, useSlots } from 'vue';
import type { Component, DefineComponent } from 'vue';
import Icon from '@/components/icon/index'
import { adjustLightness, isValidColor } from '@/utils';
import { useResolverComponent } from '@/hooks/use-resolver-component';
import { BUTTON_DEFAULT_PROPS } from './constants';

const slots = useSlots()
const hasIcon = !!slots.icon
const hasLoading = !!slots.loading

const ns = useNameSpace('button')

const props = withDefaults(defineProps<ButtonProps>(), BUTTON_DEFAULT_PROPS)

const buttonClass = computed(() => {
    return [
        ns.b.value,
        ns.m(props.type === 'default' ? '' : props.type),
        ns.is('plain', props.plain),
        ns.is('round', props.round),
        ns.is('circle', props.circle),
        ns.is('disabled', props.disabled),
        ns.is('text', props.text),
        ns.is('bg', props.bg),
        ns.is('loading', props.loading),
        ns.m(props.size === 'default' ? '' : props.size),
    ]
})

const tag = computed(() => props.tag)

const resolveIconComponent = (icon: DefineComponent | Component | string) => {
    return useResolverComponent(icon)
}

const buttonStyle = computed(() => {
    if (!isValidColor(props.color)) return ''
    return {
        [`--${ns.b.value}-bg-color`]: props.color,
        [`--${ns.b.value}-text-color`]: 'white',
        [`--${ns.b.value}-border-color`]: props.color,

        [`--${ns.b.value}-hover-bg-color`]: adjustLightness(props.color, 3),
        [`--${ns.b.value}-hover-text-color`]: 'white',
        [`--${ns.b.value}-hover-border-color`]: adjustLightness(props.color, 3),

        [`--${ns.b.value}-active-bg-color`]: adjustLightness(props.color, -1),
        [`--${ns.b.value}-active-text-color`]: 'white',
        [`--${ns.b.value}-active-border-color`]: adjustLightness(props.color, -1),
    }
})


defineExpose({
    type: readonly(computed(() => props.type || 'default')),
    size: readonly(computed(() => props.size || 'default')),
    disabled: readonly(computed(() => props.disabled)),
})

</script>

<style lang="scss" scoped src="./../style/index.scss"></style>
