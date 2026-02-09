<template>
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
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
import YlIcon from "@/components/icon/index";
</script>
