<template>
    <div>
        基础用法
        <div>
            <yl-button>Default</yl-button>
            <yl-button type="success" autofocus>success</yl-button>
            <yl-button type="danger">danger</yl-button>
            <yl-button type="warning">warning</yl-button>
            <yl-button type="info">info</yl-button>
        </div>
        <div>
            <yl-button plain>Default</yl-button>
            <yl-button plain type="success">success</yl-button>
            <yl-button plain type="danger">danger</yl-button>
            <yl-button plain type="warning">warning</yl-button>
            <yl-button plain type="info">info</yl-button>
        </div>
        <div>
            <yl-button round>Default</yl-button>
            <yl-button round type="success">success</yl-button>
            <yl-button round type="danger">danger</yl-button>
            <yl-button round type="warning">warning</yl-button>
            <yl-button round type="info">info</yl-button>
        </div>

        <div>
            <yl-button circle icon="Search"></yl-button>
            <yl-button circle type="primary" icon="Edit"></yl-button>
            <yl-button circle type="success" icon="Check"></yl-button>
            <yl-button circle type="info" icon="Message"></yl-button>
            <yl-button circle type="warning" icon="Star"></yl-button>
            <yl-button circle type="danger" :icon="Delete"></yl-button>
        </div>

        禁用状态
        <div>
            <yl-button disabled>Default</yl-button>
            <yl-button disabled type="success">success</yl-button>
            <yl-button disabled type="danger">danger</yl-button>
            <yl-button disabled type="warning">warning</yl-button>
            <yl-button disabled type="info">info</yl-button>
        </div>

        文字按钮
        <div>
            <yl-button text>Default</yl-button>
            <yl-button text type="success">success</yl-button>
            <yl-button text type="danger">danger</yl-button>
            <yl-button text type="warning">warning</yl-button>
            <yl-button text type="info">info</yl-button>
        </div>

        <div>
            <yl-button text bg>Default</yl-button>
            <yl-button text bg type="success">success</yl-button>
            <yl-button text bg type="danger">danger</yl-button>
            <yl-button text bg type="warning">warning</yl-button>
            <yl-button text bg type="info">info</yl-button>
        </div>

        <div>
            <yl-button disabled text>Default</yl-button>
            <yl-button disabled text type="success">success</yl-button>
            <yl-button disabled text type="danger">danger</yl-button>
            <yl-button disabled text type="warning">warning</yl-button>
            <yl-button disabled text type="info">info</yl-button>
        </div>

        图标按钮
        <div>
            <yl-button icon="Search">Search</yl-button>
            <yl-button type="primary" icon="Edit"></yl-button>
            <yl-button type="success" icon="Share"></yl-button>
            <yl-button type="info" icon="Message"></yl-button>
            <yl-button type="warning" icon="Star"></yl-button>
            <yl-button type="primary">
                Upload
                <yl-icon>
                    <Upload />
                </yl-icon>
            </yl-button>
            <yl-button icon="Search" type="primary">
                <template #icon>
                    <Search />
                </template>
                Search
            </yl-button>
        </div>

        按钮组
        <div>
            <yl-button-group direction="horizontal">
                <yl-button type="primary" icon="ArrowLeft">Previous Page</yl-button>
                <yl-button type="primary">
                    Next Page
                    <yl-icon>
                        <ArrowRight />
                    </yl-icon>
                </yl-button>
            </yl-button-group>

            <yl-button-group direction="vertical">
                <yl-button type="info" icon="House"></yl-button>
                <yl-button type="info" icon="Operation"></yl-button>
                <yl-button type="info" icon="Notification"></yl-button>
            </yl-button-group>
        </div>

        loading
        <div>
            <yl-button loading>Loading</yl-button>
            <yl-button type="primary" loading>Loading</yl-button>
            <yl-button type="success" loading>Loading</yl-button>
            <yl-button type="warning" loading>Loading</yl-button>
            <yl-button type="danger" loading>Loading</yl-button>
            <yl-button type="info" loading :loading-icon="Eleme">Loading</yl-button>
            <yl-button type="primary" loading>
                <template #loading>
                    <div class="custom-loading">
                        <svg class="circular" viewBox="-10, -10, 50, 50">
                            <path class="path" d="
                                M 30 15
                                L 28 17
                                M 25.61 25.61
                                A 15 15, 0, 0, 1, 15 30
                                A 15 15, 0, 1, 1, 27.99 7.5
                                L 15 15
                            " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)" />
                        </svg>
                    </div>
                </template>
                Loading
            </yl-button>
        </div>

        尺寸
        <div>
            <yl-button size="large">Large</yl-button>
            <yl-button>Default</yl-button>
            <yl-button size="small">Small</yl-button>
        </div>
        <div>
            <yl-button size="large" circle icon="Search">Large</yl-button>
            <yl-button circle icon="Search">Default</yl-button>
            <yl-button size="small" circle icon="Search">Small</yl-button>
        </div>

        <div>
            <yl-button>button</yl-button>
            <yl-button tag="div">div</yl-button>
            <yl-button type="info" tag="a" href="https://www.baidu.com" target="_blank"
                rel="noopener noreferrer">a</yl-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import YlButton from '@/components/button/index'
import YlIcon from '@/components/icon/index'
import YlButtonGroup from '@/components/button-group/index'
import { Delete } from '@/icons/components';
import { Eleme } from '@/icons/components';
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