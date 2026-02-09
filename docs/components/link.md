<script setup>
import { ref } from 'vue'
import link from '../examples/link/link.vue'
import case1 from '../examples/link/case1.vue'
import case2 from '../examples/link/case2.vue'
import case4 from '../examples/link/case4.vue'
import case5 from '../examples/link/case5.vue'

const attributes = ref([
  { name: 'type', description: '类型', type: 'enum', default: 'default' },
  { name: 'underline', description: '控制下划线是否出现', type: 'enum', default: 'hover' },
  { name: 'disabled', description: '是否禁用状态', type: 'boolean', default: 'false' },
  { name: 'href', description: '原生 href 属性', type: 'string', default: '—' },
  { name: 'target', description: '同原生 target 属性', type: 'enum', default: '_self' },
  { name: 'icon', description: '图标组件', type: 'string / Component', default: '—' }
])

const slots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' },
  { name: 'icon', description: '自定义图标组件', subTag: '—' }
])
</script>

# Link

## 基础用法

基础的文字链接用法。

<ExampleViewer name="link" case="case1" />

## 禁用状态

文字链接不可用状态。

<ExampleViewer name="link" case="case2" />

## 下划线

控制下划线是否出现

<ExampleViewer name="link" case="case4" />

## 图标

<ExampleViewer name="link" case="case5" />

## API

### Attributes

<ApiTable :data="attributes" type="attributes" />

### Slots

<ApiTable :data="slots"  type="slots" />
