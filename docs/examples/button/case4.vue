<template>
    <div>
        <div>
            <yl-button-group direction="horizontal">
                <yl-button type="primary" icon="ArrowLeft">
                    Previous Page
                </yl-button>
                <yl-button type="primary">
                    Next Page
                    <yl-icon>
                        <ArrowRight />
                    </yl-icon>
                </yl-button>
            </yl-button-group>
        </div>

        <br />

        <div>
            <yl-button-group direction="vertical">
                <yl-button type="info" icon="House"></yl-button>
                <yl-button type="info" icon="Operation"></yl-button>
                <yl-button type="info" icon="Notification"></yl-button>
            </yl-button-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
import YlIcon from "@/components/icon/index";
import YlButtonGroup from "@/components/button-group/index";
</script>
