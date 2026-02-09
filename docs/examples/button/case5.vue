<template>
    <div>
        <yl-button loading>Loading</yl-button>
        <yl-button type="success" loading>Loading</yl-button>
        <yl-button type="info" loading :loading-icon="Eleme">Loading</yl-button>
        <yl-button type="primary" loading>
            <template #loading>
                <div class="custom-loading">
                    <svg class="circular" viewBox="-10, -10, 50, 50">
                        <path
                            class="path"
                            d="
                                M 30 15
                                L 28 17
                                M 25.61 25.61
                                A 15 15, 0, 0, 1, 15 30
                                A 15 15, 0, 1, 1, 27.99 7.5
                                L 15 15
                            "
                            style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                        />
                    </svg>
                </div>
            </template>
            Loading
        </yl-button>
    </div>
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
import { Eleme } from "@/icons/components";
</script>

<style lang="scss" scoped>
.custom-loading .circular {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
}

.custom-loading .circular .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #fff;
    stroke-linecap: round;
}

@keyframes loading-rotate {
    to {
        transform: rotate(360deg);
    }
}

@keyframes loading-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px;
    }
}
</style>
