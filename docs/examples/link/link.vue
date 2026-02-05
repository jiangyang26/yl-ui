<template>
    <div>
        <yl-link>default</yl-link>
        <yl-link type="primary">primary</yl-link>
        <yl-link type="success">success</yl-link>
        <yl-link type="warning">warning</yl-link>
        <yl-link type="danger">danger</yl-link>
        <yl-link type="info">info</yl-link>
    </div>

    <br />

    <div>
        <yl-link disabled>default</yl-link>
        <yl-link disabled type="primary">primary</yl-link>
        <yl-link disabled type="success">success</yl-link>
        <yl-link disabled type="warning">warning</yl-link>
        <yl-link disabled type="danger">danger</yl-link>
        <yl-link disabled type="info">info</yl-link>
    </div>

    <br />

    <div>
        <yl-link>default</yl-link>
        <yl-link underline="always">always</yl-link>
        <yl-link underline="hover">hover</yl-link>
        <yl-link underline="never">never</yl-link>
    </div>

    <br />

    <div>
        <yl-link type="success">default</yl-link>
        <yl-link type="danger" underline="always">always</yl-link>
        <yl-link type="warning" underline="hover">hover</yl-link>
        <yl-link type="info" underline="never">never</yl-link>
    </div>


    <br />

    <div>
        <yl-link type="primary" icon="Edit">default</yl-link>
        <yl-link type="primary" underline="always" icon="Edit">always</yl-link>
    </div>
</template>

<script setup lang="ts">
import YlLink from '@/components/link/index';
</script>

<style lang="scss" scoped>
.yl-link {
    margin-right: 8px;
}
</style>