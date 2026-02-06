<template>
    <div class="example-viewer">
        <div class="example-demo">
            <div class="example-showcase">
                <component :is="exampleComponent" v-if="exampleComponent" />
            </div>
        </div>
        <div class="example-divider"></div>
        <div class="example-meta">
            <div v-if="description" class="example-description">
                <slot name="description">{{ description }}</slot>
            </div>
            <div class="example-actions">
                <button @click="toggleCode" class="example-action-btn">
                    <!-- <svg viewBox="0 0 24 24" class="example-icon">
                        <path fill="currentColor"
                            d="M9.3 15.5L7.2 13.4L9.3 11.3L8.5 10.5L5 14L8.5 17.5L9.3 16.7M14.7 15.5L16.8 13.4L14.7 11.3L15.5 10.5L19 14L15.5 17.5L14.7 16.7M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" />
                    </svg> -->
                    {{ showCode ? '隐藏代码' : '显示代码' }}
                </button>
            </div>
            <div v-show="showCode" class="example-code-wrapper">
                <CodeBlock :code="sourceCode" :language="language" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import CodeBlock from './code-block.vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    case: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: 'vue'
    }
})

const showCode = ref(false)
const sourceCode = ref('')

const exampleComponent = computed(() => {
    try {
        return defineAsyncComponent(() => import(`../../../examples/${props.name}/${props.case}.vue`))
    } catch (error) {
        console.error('Failed to load example:', error)
        return null
    }
})

const toggleCode = async () => {
    showCode.value = !showCode.value
    if (showCode.value && !sourceCode.value) {
        try {
            const response = await fetch(`../examples/${props.name}/${props.case}.vue`)
            sourceCode.value = await response.text()
        } catch (error) {
            console.error('Failed to load source code:', error)
        }
    }
}
</script>

<style lang="scss" scoped>
.example-viewer {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    margin: 16px 0;
    overflow: hidden;
}

.example-demo {
    padding: 24px;
}

.example-showcase {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    min-height: 60px;
}

.example-divider {
    height: 1px;
    background-color: var(--vp-c-divider);
}

.example-meta {
    padding: 8px 16px;
    background-color: var(--vp-c-bg-soft);
}

.example-description {
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--vp-c-text-2);
}

.example-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // margin-bottom: 12px;
}

.example-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    font-size: 14px;
    color: var(--vp-c-text-2);
    background-color: transparent;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.example-action-btn:hover {
    color: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
}

.example-icon {
    width: 16px;
    height: 16px;
}

.example-code-wrapper {
    margin-top: 12px;
}
</style>