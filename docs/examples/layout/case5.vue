<template>
    <div>
        <yl-row :gutter="20" justify="center">
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
        </yl-row>

        <yl-row :gutter="20" justify="end">
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
        </yl-row>

        <yl-row :gutter="20" justify="space-around">
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="3">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
        </yl-row>

        <yl-row :gutter="20" justify="space-between">
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="3">
                <div></div>
            </yl-col>
            <yl-col :span="4">
                <div></div>
            </yl-col>
        </yl-row>

        <yl-row :gutter="20" justify="space-evenly" align="top">
            <yl-col :span="4">
                <div></div>
            </yl-col>
            <yl-col :span="3">
                <div></div>
            </yl-col>
            <yl-col :span="4">
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
