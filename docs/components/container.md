<script setup>
import { ref } from 'vue'
import container from '../examples/container/container.vue'
import case1 from '../examples/container/case1.vue'
import case2 from '../examples/container/case2.vue'
import case3 from '../examples/container/case3.vue'
import case4 from '../examples/container/case4.vue'

// Container 容器的数据
const containerSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: 'Container / Header / Aside / Main / Footer' }
])

// Header 顶栏的数据
const headerAttributes = ref([
  { name: 'height', description: '顶栏高度', type: 'string', default: '60px', value: '' }
])

const headerSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])

// Aside 侧边栏的数据
const asideAttributes = ref([
  { name: 'width', description: '侧边栏宽度', type: 'string', default: '300px', value: '' }
])

const asideSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])

// Main 主要内容区域的数据
const mainSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])

// Footer 底栏的数据
const footerAttributes = ref([
  { name: 'height', description: '底栏高度', type: 'string', default: '60px', value: '' }
])

const footerSlots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])

</script>

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

yl-container：外层容器。 当子元素中包含 yl-header 或 yl-footer 时，全部子元素会垂直上下排列， 否则会水平左右排列。

yl-header：顶栏容器。

yl-aside：侧边栏容器。

yl-main：主要区域容器。

yl-footer：底栏容器。

## 常见页面布局

<!-- <ExampleViewer name="container" case="container" /> -->

<ExampleViewer name="container" case="case1" />
<ExampleViewer name="container" case="case2" />
<ExampleViewer name="container" case="case3" />
<ExampleViewer name="container" case="case4" />

## Container API

### Container Slots

<ApiTable :data="containerSlots" type="slots" />

## Header API

### Header Attributes

<ApiTable :data="headerAttributes" type="attributes" />

### Header Slots

<ApiTable :data="headerSlots" type="slots" />

## Aside API

### Aside Attributes

<ApiTable :data="asideAttributes" type="attributes" />

### Aside Slots

<ApiTable :data="asideSlots" type="slots" />

## Main API

### Main Slots

<ApiTable :data="mainSlots" type="slots" />

## Footer API

### Footer Attributes

<ApiTable :data="footerAttributes" type="attributes" />

### Footer Slots

<ApiTable :data="footerSlots" type="slots" />
