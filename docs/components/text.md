<script setup>
import { ref } from 'vue'
import text from '../examples/text/text.vue'
import case1 from '../examples/text/case1.vue'
import case2 from '../examples/text/case2.vue'
import case3 from '../examples/text/case3.vue'
import case4 from '../examples/text/case4.vue'

const attributes = ref([
  { name: 'type', description: '类型', type: 'enum', default: '—' },
  { name: 'size', description: '大小', type: 'enum', default: 'default' },
  { name: 'truncated', description: '显示省略号', type: 'boolean', default: 'false' },
  { name: 'line-clamp', description: '最大行数', type: 'string / number', default: '—' },
  { name: 'tag', description: '自定义元素标签', type: 'string', default: 'span' }
])

const slots = ref([
  { name: 'default', description: '默认内容', subTag: '—' }
])
</script>

# Text

文本的常见操作

## 基础用法

由 type 属性来选择 Text 的类型。

<ExampleViewer name="text" case="case1" />

## 尺寸

<ExampleViewer name="text" case="case2" />

## 省略

<ExampleViewer name="text" case="case3" />

## 覆盖

<ExampleViewer name="text" case="case4" />

## API

### Attributes

<ApiTable :data="attributes" type="attributes" />

### Slots

<ApiTable :data="slots"  type="slots" />
