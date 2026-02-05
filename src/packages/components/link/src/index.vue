<template>
    <a :class="linkClass">
        <Icon v-if="iconComponent">
            <component :is="iconComponent"></component>
        </Icon>
        <span :class="[ns.e('inner')]">
            <slot></slot>
        </span>
    </a>
</template>

<script setup lang="ts">
import Icon from '@/components/icon/index';
import { useNameSpace } from '@/hooks/index'
import { LinkProps } from './types'
import { computed } from 'vue'
import { isIn } from '@/utils';
import { useResolverComponent } from '@/hooks/use-resolver-component';
import { LINE_UNDERLINE, LINK_DEFAULT_PROPS, LINK_TYPE } from './constants';

const props = withDefaults(defineProps<LinkProps>(), LINK_DEFAULT_PROPS)

const ns = useNameSpace('link')
const iconComponent = useResolverComponent(props.icon ?? '')

const linkClass = computed(() => [
    ns.b.value,
    isIn(props.type, LINK_TYPE) ? ns.m(props.type) : '',
    isIn(props.underline, LINE_UNDERLINE) ? ns.is(props.underline, props.underline === 'never' || props.underline === 'always') : '',
    iconComponent ? ns.m('icon') : '',
    ns.is('disabled', props.disabled),
])


</script>

<style scoped src="./../style/index.scss"></style>
