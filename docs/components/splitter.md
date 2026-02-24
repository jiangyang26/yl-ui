<script setup>
import { ref } from 'vue'
import splitter from '../examples/splitter/splitter.vue'
import case1 from '../examples/splitter/case1.vue'
import case2 from '../examples/splitter/case2.vue'
import case3 from '../examples/splitter/case3.vue'
import case4 from '../examples/splitter/case4.vue'
import case5 from '../examples/splitter/case5.vue'
import case6 from '../examples/splitter/case6.vue'

// Splitter 组件 API 数据
const splitterAttributes = ref([
  { name: 'direction', description: '分隔面板的布局方向', type: 'enum', default: 'horizontal' },
  { name: 'lazy', description: '是否使用懒加载', type: 'boolean', default: 'false' },
  { name: 'resizable', description: '是否可以调整面板大小', type: 'boolean', default: 'true' },
])

const splitterEvents = ref([
  { name: 'resize-start', description: '开始调整面板大小时触发，index 是拖拽条的索引。', type: 'Function: (index: number, sizes: number[]) => void' },
  { name: 'resize', description: '调整面板大小时触发，index 是拖拽条的索引。', type: 'Function: (index: number, sizes: number[]) => void' },
  { name: 'resize-end', description: '面板调整大小结束时触发，index 是拖拽条的索引。', type: 'Function: (index: number, sizes: number[]) => void' },
  { name: 'collapse', description: '当面板折叠时触发，index 是拖拽条的索引。', type: "Function: (index: number, type: 'start' | 'end', sizes: number[]) => void" }
])

// SplitterPanel 组件 API 数据
const splitterPanelAttributes = ref([
  { name: 'size / v-model:size', description: '面板大小(像素或百分比)', type: 'string / number', default: '-' },
  { name: 'min', description: '面板最小尺寸(像素或百分比)', type: 'string / number', default: '-' },
  { name: 'max', description: '面板的最大尺寸(像素或百分比)', type: 'string / number', default: '-' },
  { name: 'collapsible', description: '面板是否可折叠。', type: 'boolean', default: 'false' }
])

const splitterPanelEvents = ref([
  { name: 'update:size', description: '当面板大小改变时触发', type: 'Function: (size: number) => void' }
])

const splitterPanelSlots = ref([
  { name: 'default', description: '面板的默认内容', subTag: '—' },
  { name: 'start-collapsible', description: '自定义起始折叠按钮的内容', subTag: '—' },
  { name: 'end-collapsible', description: '结束可折叠按钮的自定义内容', subTag: '—' }
])

</script>

# Splitter 分隔面板
可将区域水平或垂直分隔，并可自由拖动以调整各个区域的大小。

## 基础用法
最基本的用法，如果未传入默认尺寸，将自动平均分配。
<ExampleViewer name="splitter" case="case1" />

## 垂直布局
使用垂直方向。
<ExampleViewer name="splitter" case="case2" />

## 可折叠
<ExampleViewer name="splitter" case="case3" />

## 禁用拖动
<ExampleViewer name="splitter" case="case4" />

## 面板大小
v-model:size 可以获取面板的大小。
<ExampleViewer name="splitter" case="case5" />

## 延迟
当启用lazy时，面板大小将不会在拖动时实时更新，只能在拖动结束后更新。
<ExampleViewer name="splitter" case="case6" />

## Splitter API
### Splitter Attributes
<ApiTable :data="splitterAttributes" type="attributes" />

### Splitter Events
<ApiTable :data="splitterEvents" type="events" />

## SplitterPanel API
### SplitterPanel Attributes
<ApiTable :data="splitterPanelAttributes" type="attributes" />

### SplitterPanel Events
<ApiTable :data="splitterPanelEvents" type="events" />

## SplitterPanel Slots
<ApiTable :data="splitterPanelSlots"  type="slots" />
