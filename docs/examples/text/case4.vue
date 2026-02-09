<template>
    <div>
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
    </div>
</template>

<script setup lang="ts">
import YlText from "@/components/text/index";
</script>
