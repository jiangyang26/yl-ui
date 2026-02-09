<template>
    <div>
        <yl-link type="primary" icon="Edit">default</yl-link>
        <yl-link type="primary" underline="always" icon="Edit">always</yl-link>
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
