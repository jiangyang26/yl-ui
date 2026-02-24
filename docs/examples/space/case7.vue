<template>
    <div class="wrapper">
        <yl-space alignment="start">
            string
            <yl-button>button text</yl-button>
            <div class="card">
                <div>header xxx</div>
                <yl-button>button text</yl-button>
            </div>
        </yl-space>

        <br />
        <br />

        <yl-space alignment="center">
            string
            <yl-button>button text</yl-button>
            <div class="card">
                <div>header xxx</div>
                <yl-button>button text</yl-button>
            </div>
        </yl-space>

        <br />
        <br />

        <yl-space alignment="end">
            string
            <yl-button>button text</yl-button>
            <div class="card">
                <div>header xxx</div>
                <yl-button>button text</yl-button>
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
    // width: 100px;
    // height: 100px;
    border-radius: 4px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    padding: 10px;
}
</style>