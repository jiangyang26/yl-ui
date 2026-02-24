<template>
    <div class="wrapper">
        <yl-space direction="vertical" fill-ratio="60" fill>
            <div v-for="i in 3" class="card">
                <div>header xxx</div>
                <yl-button>button text</yl-button>
                <yl-button>button text</yl-button>
                <div>List item 1 </div>
                <div>List item 2 </div>
                <div>List item 3 </div>
                <div>List item 4 </div>
            </div>
        </yl-space>
    </div>
</template>

<script setup lang="ts">
import YlSpace from '@/components/space/index';
import YlButton from '@/components/button/index';
</script>

<style lang="scss" scoped>
.card {
    border-radius: 4px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    padding: 10px;
}
</style>