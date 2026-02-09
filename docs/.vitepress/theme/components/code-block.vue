<template>
    <div class="code-block">
        <!-- <div class="code-header">
            <span class="code-language">{{ language }}</span>
            <button class="copy-btn" @click="copyCode">
                {{ copied ? '已复制' : '复制代码' }}
            </button>
        </div> -->
        <div v-html="code"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    code: {
        type: String,
        required: true
    }
})

const copied = ref(false)

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(props.code)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (error) {
        console.error('Failed to copy code:', error)
    }
}
</script>

<style scoped lang="scss">
.code-block {
    margin: 16px 0;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    overflow: hidden;

    :deep(.shiki) {
        background: none !important;
        >code {
            background: none;
        }
    }
}

.code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}

.code-language {
    font-size: 12px;
    color: var(--vp-c-text-2);
    text-transform: uppercase;
}

.copy-btn {
    padding: 4px 8px;
    font-size: 12px;
    color: var(--vp-c-text-2);
    background-color: transparent;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.copy-btn:hover {
    color: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
}

pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
    background-color: var(--vp-c-bg-mute);
}

code {
    font-family: var(--vp-font-family-mono);
    font-size: 14px;
    line-height: 1.5;
}
</style>