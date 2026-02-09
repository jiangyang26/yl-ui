<template>
    <div>
        <yl-text>Default</yl-text>
        <yl-text type="primary">primary</yl-text>
        <yl-text type="success">success</yl-text>
        <yl-text type="danger">danger</yl-text>
        <yl-text type="warning">warning</yl-text>
        <yl-text type="info">info</yl-text>
    </div>
</template>

<script setup lang="ts">
import YlText from "@/components/text/index";
</script>

<style lang="scss" scoped>
.yl-text {
    margin-right: 8px;
}
</style>
