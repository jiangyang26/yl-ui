<template>
    <div>
        <yl-row :gutter="20">
            <yl-col :span="8">
                <div></div>
            </yl-col>
            <yl-col :span="6">
                <div></div>
            </yl-col>
            <yl-col :span="6" :offset="4">
                <div></div>
            </yl-col>
        </yl-row>
    </div>
</template>

<script setup lang="ts">
import YlRow from "@/components/row/index";
import YlCol from "@/components/col/index";
</script>

<style lang="scss" scoped>
.yl-col {
    > div {
        background-color: var(--yl-color-primary-light-7);
        border-radius: 4px;
        min-height: 36px;
    }
}
</style>
