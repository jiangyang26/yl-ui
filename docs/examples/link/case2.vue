<template>
    <div>
        <yl-link disabled>default</yl-link>
        <yl-link disabled type="primary">primary</yl-link>
        <yl-link disabled type="success">success</yl-link>
        <yl-link disabled type="warning">warning</yl-link>
        <yl-link disabled type="danger">danger</yl-link>
        <yl-link disabled type="info">info</yl-link>
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
