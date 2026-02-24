<template>
    <div class="api-table">
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.prop">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="column in columns" :key="column.prop">
                        <!-- <template> -->
                        <!-- <code>{{ row[column.prop] }}</code> -->
                        <span>{{ row[column.prop] }}</span>
                        <!-- <VersionTag v-if="row.version" :version="row.version" /> -->
                        <!-- </template> -->
                        <!-- <template v-else-if="column.prop === 'type'">
                            <span>{{ row[column.prop] }}</span>
                        </template>
                        <template v-else-if="column.prop === 'value'">
                            <template v-if="row[column.prop]">
                                <span
                                    v-for="value in row[column.prop]"
                                    :key="value"
                                >
                                    {{ value }}
                                </span>
                            </template>
                        </template>
                        <template v-else>
                            {{ row[column.prop] }}
                        </template> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        default: "attributes", // attributes, slots, exposes, events
    },
});

const columns = computed(() => {
    switch (props.type) {
        case "attributes":
            return [
                { prop: "name", label: "属性名" },
                { prop: "description", label: "说明" },
                { prop: "type", label: "类型" },
                { prop: "default", label: "默认值" },
            ];
        case "slots":
            return [
                { prop: "name", label: "插槽名" },
                { prop: "description", label: "说明" },
                { prop: "subTag", label: "子标签" },
            ];
        case "exposes":
            return [
                { prop: "name", label: "名称" },
                { prop: "description", label: "说明" },
                { prop: "type", label: "类型" },
            ];
        case "events":
            return [
                { prop: "name", label: "事件名" },
                { prop: "description", label: "说明" },
                { prop: "type", label: "类型" },
            ];
        default:
            return Object.keys(props.data[0] || {}).map((key) => ({
                prop: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
            }));
    }
});
</script>

<style scoped>
.api-table {
    margin: 16px 0;
    overflow-x: auto;
}

.api-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.api-table th,
.api-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--vp-c-divider);
}

.api-table th {
    font-weight: 600;
    background-color: var(--vp-c-bg-soft);
}

.api-table code {
    display: inline-block;
    padding: 2px 6px;
    font-family: var(--vp-font-family-mono);
    font-size: 13px;
    background-color: var(--vp-c-bg-mute);
    border-radius: 3px;
}

.api-table td code {
    margin: 0 2px;
}
</style>
