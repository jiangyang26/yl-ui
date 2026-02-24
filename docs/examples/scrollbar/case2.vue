<template>
    <div class="wrapper">
        <yl-scroll-bar>
            <div class="x-wrap">
                <div class="box" v-for="item in 50" :key="item">{{ item }}</div>
            </div>
        </yl-scroll-bar>
    </div>
</template>

<script setup lang="ts">
import YlScrollBar from '@/components/scrollbar/index';
</script>

<style lang="scss" scoped>
.x-wrap {
    display: flex;
    height: 100%;

    .box {
        width: 150px;
        height: 50px;
        flex-shrink: 0;
        background-color: var(--yl-color-primary-light-9);
        margin: 10px;
        color: var(--yl-color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>