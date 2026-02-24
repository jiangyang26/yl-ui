<template>
    <div class="wrapper">
        <yl-scroll-bar height="300" @reach-bottom="handleReachBottom">
            <div class="box" v-for="item in num" :key="item">{{ item }}</div>
        </yl-scroll-bar>
    </div>
</template>

<script setup lang="ts">
import YlScrollBar from '@/components/scrollbar/index';
import { ref } from 'vue';

const num = ref(7);
const handleReachBottom = () => {
    num.value += 5
};

</script>

<style lang="scss" scoped>
.box {
    height: 50px;
    background-color: var(--yl-color-primary-light-9);
    margin: 10px;
    color: var(--yl-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>