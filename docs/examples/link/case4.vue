<template>
    <div>
        <yl-link type="success">default</yl-link>
        <yl-link type="danger" underline="always">always</yl-link>
        <yl-link type="warning" underline="hover">hover</yl-link>
        <yl-link type="info" underline="never">never</yl-link>
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
