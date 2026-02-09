<template>
    <div>
        <yl-text style="width: 100px" truncated>
            溢出文本内容溢出文本内容溢出文本内容溢出文本内容溢出文本内容
        </yl-text>

        <br />
        <br />

        <yl-text style="width: 100px" line-clamp="3">
            溢出文本内容溢出文本内容溢出文本内容溢出文本内容溢出文本内容
        </yl-text>
    </div>
</template>

<script setup lang="ts">
import YlText from "@/components/text/index";
</script>
