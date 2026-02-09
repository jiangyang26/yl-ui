<template>
    <div>
        <div>
            <yl-button text>Default</yl-button>
            <yl-button text type="success">success</yl-button>
            <yl-button text type="danger">danger</yl-button>
            <yl-button text type="warning">warning</yl-button>
            <yl-button text type="info">info</yl-button>
        </div>

        <br />

        <div>
            <yl-button text bg>Default</yl-button>
            <yl-button text bg type="success">success</yl-button>
            <yl-button text bg type="danger">danger</yl-button>
            <yl-button text bg type="warning">warning</yl-button>
            <yl-button text bg type="info">info</yl-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
</script>
