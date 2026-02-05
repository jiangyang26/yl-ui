<template>
    <div>
        <yl-text>Default</yl-text>
        <yl-text type="primary">primary</yl-text>
        <yl-text type="success">success</yl-text>
        <yl-text type="danger">danger</yl-text>
        <yl-text type="warning">warning</yl-text>
        <yl-text type="info">info</yl-text>
    </div>

    <br />

    <div>
        <yl-text size="large">large</yl-text>
        <yl-text>Default</yl-text>
        <yl-text size="small">small</yl-text>
    </div>

    <br />

    <div>
        <yl-text style="width: 100px;" truncated>溢出文本内容溢出文本内容溢出文本内容溢出文本内容溢出文本内容</yl-text>
        <br />
        <yl-text style="width: 100px;" line-clamp="3">溢出文本内容溢出文本内容溢出文本内容溢出文本内容溢出文本内容</yl-text>
    </div>

    <br />

    <yl-text>span</yl-text>
    <br />
    <yl-text tag="p">This is a paragraph.</yl-text>
    <yl-text tag="b">Bold</yl-text>
    <br />
    <yl-text tag="i">Italic</yl-text>
    <br />
    <yl-text>
        This is
        <yl-text tag="sub" size="small">subscript</yl-text>
    </yl-text>
    <br />
    <yl-text>
        This is
        <yl-text tag="sup" size="small">superscript</yl-text>
    </yl-text>
    <br />
    <yl-text tag="ins">Inserted</yl-text>
    <br />
    <yl-text tag="del">Deleted</yl-text>
    <br />
    <yl-text tag="mark">Marked</yl-text>
    <br />
</template>

<script setup lang="ts">
import YlText from '@/components/text/index';
</script>

<style lang="scss" scoped>
.yl-text {
    margin-right: 8px;
}
</style>