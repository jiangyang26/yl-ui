<script setup>
import { ref } from 'vue'
import button from '../examples/button/button.vue'
import case1 from '../examples/button/case1.vue'
import case2 from '../examples/button/case2.vue'
import case3 from '../examples/button/case3.vue'
import case4 from '../examples/button/case4.vue'
import case5 from '../examples/button/case5.vue'
import case6 from '../examples/button/case6.vue'
import case7 from '../examples/button/case7.vue'

const attributes = ref([
  { name: 'size', description: '尺寸', type: 'enum', default: '—' },
  { name: 'type', description: '按钮类型，在设置color时，后者优先。', type: 'enum', default: '—' },
  { name: 'plain', description: '是否为朴素按钮', type: 'boolean', default: 'false' },
  { name: 'text', description: '是否为文字按钮', type: 'boolean', default: 'false' },
  { name: 'bg', description: '是否显示文字按钮背景颜色', type: 'boolean', default: 'false' },
  { name: 'round', description: '是否为圆角按钮', type: 'boolean', default: 'false' },
  { name: 'circle', description: '是否为圆形按钮', type: 'boolean', default: 'false' },
  { name: 'loading', description: '是否为加载中状态', type: 'boolean', default: 'false' },
  { name: 'loading-icon', description: '自定义加载中状态图标组件', type: 'string / Component', default: 'Loading' },
  { name: 'disabled', description: '按钮是否为禁用状态', type: 'boolean', default: 'false' },
  { name: 'icon', description: '图标组件', type: 'string / Component', default: '—' },
  { name: 'autofocus', description: '原生 autofocus 属性', type: 'boolean', default: 'false' },
  { name: 'native-type', description: '原生 type 属性', type: 'enum', default: 'button' },
  { name: 'tag', description: '自定义元素标签', type: 'string / Component', default: 'button' }
])

// const events = ref([
//     {name: '', description: '', parameter: ''}
// ])

const slots = ref([
  { name: 'default', description: '自定义默认内容', subtag: '—' },
  { name: 'loading', description: '自定义加载中组件', subtag: '—' },
  { name: 'icon', description: '自定义图标组件', subtag: '—'}
])

// const exposes = ref([
//   { name: 'ref', description: '按钮 html 元素', type: 'object' },
//   { name: 'size', description: '按钮尺寸', type: 'object' },
//   { name: 'type', description: '按钮类型', type: 'object' },
//   { name: 'disabled', description: '按钮已禁用', type: 'object' },
// ])
</script>

# Button

常用的操作按钮。

## 基础用法

使用 type、plain、round 和 circle 来定义按钮的样式。
<ExampleViewer name="button" case="case1" />

## 禁用状态

你可以使用 disabled 属性来定义按钮是否被禁用。
<ExampleViewer name="button" case="case2" />

## 文字按钮

<ExampleViewer name="button" case="case8" />

## 图标按钮

使用 icon 属性来为按钮添加图标。
<ExampleViewer name="button" case="case3" />

## 按钮组

使用 yl-button-group 对多个按钮分组。
<ExampleViewer name="button" case="case4" />

## loading

通过设置 loading 属性为 true 来显示加载中状态。
<ExampleViewer name="button" case="case5" />

## 尺寸

使用 size 属性额外配置尺寸，可使用 large和small两种值。
<ExampleViewer name="button" case="case6" />

## Tag

您可以自定义元素标签。例如，按钮，div

<ExampleViewer name="button" case="case7" />

## API

### Attributes

<ApiTable :data="attributes" type="attributes" />

<!-- ### Events

<ApiTable :data="events" type="events" /> -->

### Slots

<ApiTable :data="slots" type="slots" />

<!-- ### Exposes

<ApiTable :data="exposes" type="exposes" /> -->
