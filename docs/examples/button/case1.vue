<template>
    <div>
        <div>
            <yl-button>Default</yl-button>
            <yl-button type="success">success</yl-button>
            <yl-button type="danger">danger</yl-button>
            <yl-button type="warning">warning</yl-button>
            <yl-button type="info">info</yl-button>
        </div>
        <br />
        <div>
            <yl-button plain>Default</yl-button>
            <yl-button plain type="success">success</yl-button>
            <yl-button plain type="danger">danger</yl-button>
            <yl-button plain type="warning">warning</yl-button>
            <yl-button plain type="info">info</yl-button>
        </div>
        <br />
        <div>
            <yl-button round>Default</yl-button>
            <yl-button round type="success">success</yl-button>
            <yl-button round type="danger">danger</yl-button>
            <yl-button round type="warning">warning</yl-button>
            <yl-button round type="info">info</yl-button>
        </div>
        <br />
        <div>
            <yl-button circle icon="Search"></yl-button>
            <yl-button circle type="primary" icon="Edit"></yl-button>
            <yl-button circle type="success" icon="Check"></yl-button>
            <yl-button circle type="info" icon="Message"></yl-button>
            <yl-button circle type="warning" icon="Star"></yl-button>
            <yl-button circle type="danger" :icon="Delete"></yl-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import YlButton from '@/components/button/index'
import { Delete } from '@/icons/components';
</script>