<template>
    <div class="wrapper">
        <yl-space :size="[20, 20]" wrap>
            <div v-for="i in 20">
                <yl-button>button text</yl-button>
            </div>
        </yl-space>
    </div>
</template>

<script setup lang="ts">
import YlSpace from '@/components/space/index';
import YlButton from '@/components/button/index';
</script>