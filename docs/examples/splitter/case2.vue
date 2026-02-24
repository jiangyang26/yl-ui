<template>
    <div class="wrap">
        <yl-splitter>
            <yl-splitter-panel>
                <div class="demo-panel">Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div class="demo-panel">Panel 2</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div class="demo-panel">Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <yl-splitter direction="vertical">
                    <yl-splitter-panel collapsible>
                        <div class="demo-panel">Panel 4</div>
                    </yl-splitter-panel>
                    <yl-splitter-panel>
                        <div class="demo-panel">Panel 5</div>
                    </yl-splitter-panel>
                </yl-splitter>
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