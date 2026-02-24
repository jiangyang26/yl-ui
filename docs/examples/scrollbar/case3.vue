<template>
    <div class="wrapper">
        <yl-button @click="add">Add Item</yl-button>
        <yl-button @click="de">Delete Item</yl-button>
        <yl-scroll-bar max-height="300">
            <div class="box" v-for="item in num" :key="item">{{ item }}</div>
        </yl-scroll-bar>
    </div>
</template>

<script setup lang="ts">
import YlScrollBar from '@/components/scrollbar/index';
import YlButton from '@/components/button/index';
import { ref } from 'vue';

const num = ref(4);

const add = () => {
    num.value += 1;
};
const de = () => {
    num.value -= 1;
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