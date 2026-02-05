<template>
    <div class="wrapper">
        <yl-button @click="add">Add Item</yl-button>
        <yl-button @click="de">Delete Item</yl-button>
        <yl-button @click="handle">ref</yl-button>
        <yl-scroll-bar height="300" @scroll="handleScroll" always @reach-bottom="handleReachBottom">
            <div class="box" v-for="item in num" :key="item">{{ item }}</div>
        </yl-scroll-bar>

        <br />

        <div style="height: 300px;">
            <yl-scroll-bar native>
                <div class="box" v-for="item in num" :key="item">{{ item }}</div>
            </yl-scroll-bar>
        </div>

        <br />

        <yl-scroll-bar @scroll="handleScroll" ref="scrollRef" always>
            <div class="x-wrap">
                <div class="box" v-for="item in num" :key="item">{{ item }}</div>
            </div>
        </yl-scroll-bar>
    </div>
</template>

<script setup lang="ts">
import YlScrollBar from '@/components/scrollbar/index';
import YlButton from '@/components/button/index';
import { onMounted, ref } from 'vue';

const num = ref(0);
const scrollRef = ref<InstanceType<typeof YlScrollBar>>();

onMounted(() => {
    setTimeout(() => {
        num.value = 7
    }, 500);
})

const add = () => {
    num.value += 1;
};
const de = () => {
    num.value -= 1;
};

const handleScroll = (e: any) => {

};
const handle = () => {
    // scrollRef.value?.setScrollTop(20)
    // scrollRef.value?.scrollTo(100, 200)
    scrollRef.value?.update()
}

const handleReachBottom = () => {
    console.log('handleReachBottom');
    num.value += 5
};

</script>

<style lang="scss" scoped>
.wrapper {
    width: 500px;
}

.box {
    height: 50px;
    background-color: var(--yl-color-info-light-9);
    margin: 10px;
    color: var(--yl-color-info);
    display: flex;
    align-items: center;
    justify-content: center;
}

.x-wrap {
    display: flex;
    height: 100%;

    .box {
        width: 150px;
        height: 50px;
        flex-shrink: 0;
    }
}
</style>