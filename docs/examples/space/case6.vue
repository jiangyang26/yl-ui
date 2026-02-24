<template>
    <div class="wrapper">
        <yl-space alignment="center" :wrap="true" :spacer="spacer">
            <yl-button>button text</yl-button>
            <yl-button>button text</yl-button>
        </yl-space>
    </div>
</template>

<script setup lang="ts">
import YlSpace from '@/components/space/index';
import YlButton from '@/components/button/index';
import { h } from 'vue';

const spacer = h('div', { class: 'spacer', style: { width: '1px', height: '16px', borderRight: '1px solid #999' } })
</script>
