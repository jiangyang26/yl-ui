<template>
    <div>
        <div>
            <yl-button size="large">Large</yl-button>
            <yl-button>Default</yl-button>
            <yl-button size="small">Small</yl-button>
        </div>

        <br />

        <div>
            <yl-button size="large" icon="Search">Search</yl-button>
            <yl-button icon="Search">Search</yl-button>
            <yl-button size="small" icon="Search">Search</yl-button>
        </div>

        <br />

        <div>
            <yl-button size="large" circle icon="Search">Large</yl-button>
            <yl-button circle icon="Search">Default</yl-button>
            <yl-button size="small" circle icon="Search">Small</yl-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import YlButton from "@/components/button/index";
</script>
