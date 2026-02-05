<template>
    <div class="wrapper">
        <yl-space alignment="center" :wrap="true" spacer="|">
            <yl-button>button text</yl-button>
            <yl-button>button text</yl-button>
        </yl-space>
    </div>

    <br>

    <div class="wrapper">
        <yl-space alignment="center" :wrap="true" :spacer="spacer">
            <yl-button>button text</yl-button>
            <yl-button>button text</yl-button>
        </yl-space>
    </div>

    <br>


    <div class="wrapper">
        <yl-space alignment="center" :size="[20, 20]" :wrap="true">
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

    <br>


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
import { onMounted, ref, h } from 'vue';

const spacer = h('div', { class: 'spacer', style: { width: '1px', height: '16px', borderRight: '1px solid #999' } })
</script>

<style lang="scss" scoped>
.card {
    // width: 150px;
    // height: 150px;
    border-radius: 4px;
    box-shadow: 0 0 4px #999;
}

.wrapper {
    width: 600px;
    border: 1px solid;
    padding: 10px;
}
</style>