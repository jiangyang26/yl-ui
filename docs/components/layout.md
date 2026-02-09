<script setup>
import { ref } from 'vue'
import case1 from '../examples/layout/case1.vue'
import case2 from '../examples/layout/case2.vue'
import case3 from '../examples/layout/case3.vue'
import case4 from '../examples/layout/case4.vue'
import case5 from '../examples/layout/case5.vue'

// Row 组件的 API 数据
const rowAttributes = ref([
  { name: 'gutter', description: '栅格间隔', type: 'number', default: '0', value: '' },
  { name: 'justify', description: 'flex 布局下的水平排列方式', type: 'enum', default: 'start', value: '' },
  { name: 'align', description: 'flex 布局下的垂直排列方式', type: 'enum', default: '—', value: '' },
  { name: 'tag', description: '自定义元素标签', type: 'string', default: 'div', value: '' }
])

const rowSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: 'Col' }
])

// Col 组件的 API 数据
const colAttributes = ref([
  { name: 'span', description: '栅格占据的列数', type: 'number', default: '24', value: '' },
  { name: 'offset', description: '栅格左侧的间隔格数', type: 'number', default: '0', value: '' },
])

const colSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])
</script>

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

## 基础布局

使用列创建基础网格布局。

通过 row 和 col 组件，并通过 col 组件的 span 属性就可以自由地组合布局。

<ExampleViewer name="layout" case="case1" />

## 分栏间隔

支持列间距。

行提供 gutter 属性来指定列之间的间距，其默认值为0。

<ExampleViewer name="layout" case="case2" />

## 混合布局

<ExampleViewer name="layout" case="case3" />

## 列偏移

<ExampleViewer name="layout" case="case4" />

## 对齐方式

默认使用 flex 布局来对分栏进行灵活的对齐。

您可以通过justify 属性来定义子元素的排版方式，其取值为start、center、end、space-between、space-around或space-evenly。
<ExampleViewer name="layout" case="case5" />

## Row API

### Row Attributes

<ApiTable :data="rowAttributes" type="attributes" />

### Row Slots

<ApiTable :data="rowSlots"  type="slots" />

## Col API

### Col Attributes

<ApiTable :data="colAttributes" type="attributes" />

### Col Slots

<ApiTable :data="colSlots"  type="slots" />
