<template>
    <div>
        <yl-button>button</yl-button>
        <yl-button tag="div">div</yl-button>
        <yl-button
            type="info"
            tag="a"
            href="https://www.baidu.com"
            target="_blank"
            rel="noopener noreferrer"
            >a</yl-button
        >
    </div>
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
</script>
