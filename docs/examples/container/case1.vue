<template>
    <div class="layout-container">
        <yl-container>
            <yl-header>Header</yl-header>
            <yl-main>Main</yl-main>
            <yl-footer>Footer</yl-footer>
        </yl-container>
    </div>
</template>

<script setup lang="ts">
import YlContainer from "@/components/container/index";
import YlHeader from "@/components/header/index";
import YlMain from "@/components/main/index";
import YlFooter from "@/components/footer/index";
</script>

<style lang="scss" scoped>
.layout-container {
    .yl-header {
        background-color: var(--yl-color-primary-light-7);
    }

    .yl-aside {
        background-color: var(--yl-color-primary-light-8);
    }

    .yl-main {
        background-color: var(--yl-color-primary-light-9);
        height: 200px;
    }

    .yl-footer {
        background-color: var(--yl-color-primary-light-7);
    }

    .yl-header,
    .yl-footer,
    .yl-main,
    .yl-aside {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--yl-text-color-primary);
    }
}
</style>
