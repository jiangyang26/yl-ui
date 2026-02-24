<template>
    <div class="wrapper">
        <yl-space alignment="center" :wrap="true" spacer="|">
            <yl-button>button text</yl-button>
            <yl-button>button text</yl-button>
        </yl-space>
    </div>
</template>

<script setup lang="ts">
import YlSpace from '@/components/space/index';
import YlButton from '@/components/button/index';
</script>