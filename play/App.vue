<template>
    <div class="wrap1">
        <yl-splitter lazy>
            <yl-splitter-panel size="60%" max="900" min="11.1%">
                <div>Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel v-model:size="size">
                <div>Panel 2 {{ size }}px</div>
            </yl-splitter-panel>
            <yl-splitter-panel size="80">
                <div>Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel v-for="item in 2">
                <div>Panel 4</div>
            </yl-splitter-panel>

            <yl-splitter-panel size="700">
                <div>Panel 5</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 6</div>
            </yl-splitter-panel>

        </yl-splitter>
    </div>

    <br>

    <div class="wrap1">
        <yl-splitter>
            <yl-splitter-panel collapsible size="200">
                <div>Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel collapsible size="300">
                <div>Panel 2</div>
            </yl-splitter-panel>
            <yl-splitter-panel collapsible>
                <div>Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel collapsible>
                <div>Panel 4</div>
            </yl-splitter-panel>
            <yl-splitter-panel collapsible>
                <div>Panel 5</div>
            </yl-splitter-panel>
        </yl-splitter>
    </div>


    <br />

    <div class="wrap1">
        <yl-splitter :resizable="false">
            <yl-splitter-panel>
                <div>Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 2</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 4</div>
            </yl-splitter-panel>
            <yl-splitter-panel collapsible>
                <div>Panel 5</div>
            </yl-splitter-panel>
        </yl-splitter>
    </div>


    <br />

    <div class="wrap2">
        <yl-splitter direction="vertical" lazy>
            <yl-splitter-panel>
                <div>Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 2</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 4</div>
            </yl-splitter-panel>
        </yl-splitter>
    </div>

    <br />

    <div class="wrap1">
        <yl-splitter>
            <yl-splitter-panel>
                <div>Panel 1</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 2</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <div>Panel 3</div>
            </yl-splitter-panel>
            <yl-splitter-panel>
                <yl-splitter direction="vertical">
                    <yl-splitter-panel collapsible>
                        <div>Panel 4</div>
                    </yl-splitter-panel>
                    <yl-splitter-panel>
                        <div>Panel 5</div>
                    </yl-splitter-panel>
                </yl-splitter>
            </yl-splitter-panel>
        </yl-splitter>
    </div>

</template>

<script setup lang="ts">
import YlSplitter from '@/components/splitter/index';
import YlSplitterPanel from '@/components/splitter-panel/index';
import { ref } from 'vue';

const size = ref(300);

const resizable = ref(false)

</script>

<style lang="scss" scoped>
.wrap1 {
    width: 800px;
    height: 200px;
    box-shadow: #e4e7ed 0 0 10px;
}

.wrap2 {
    width: 800px;
    height: 400px;
    box-shadow: #e4e7ed 0 0 10px;
}
</style>