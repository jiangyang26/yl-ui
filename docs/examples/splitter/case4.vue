<template>
    <div class="wrap">
        <yl-splitter :resizable="false">
            <yl-splitter-panel>
                <div class="demo-panel">Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div class="demo-panel">Panel 2</div>
            </yl-splitter-panel>
        </yl-splitter>
    </div>

</template>

<script setup lang="ts">
import YlSplitter from '@/components/splitter/index';
import YlSplitterPanel from '@/components/splitter-panel/index';
</script>

<style lang="scss" scoped>
.wrap {
    height: 200px;
    box-shadow: #e4e7ed 0 0 10px;
}

.demo-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>