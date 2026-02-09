<template>
    <div>
        <yl-link>default</yl-link>
        <yl-link type="primary">primary</yl-link>
        <yl-link type="success">success</yl-link>
        <yl-link type="warning">warning</yl-link>
        <yl-link type="danger">danger</yl-link>
        <yl-link type="info">info</yl-link>
    </div>
</template>

<script setup lang="ts">
import YlLink from "@/components/link/index";
</script>

<style lang="scss" scoped>
.yl-link {
    margin-right: 8px;
}
</style>
