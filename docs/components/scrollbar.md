<script setup>
import { ref } from 'vue'
import scrollbar from '../examples/scrollbar/scrollbar.vue'
import case1 from '../examples/scrollbar/case1.vue'
import case2 from '../examples/scrollbar/case2.vue'
import case3 from '../examples/scrollbar/case3.vue'
import case4 from '../examples/scrollbar/case4.vue'

const attributes = ref([
  { name: 'height', description: '滚动条高度', type: 'string / number', default: '—' },
  { name: 'max-height', description: '滚动条最大高度', type: 'string / number', default: '—' },
  { name: 'native', description: '是否使用原生滚动条样式', type: 'boolean', default: 'false' },
  { name: 'wrap-style', description: '包裹容器的自定义样式', type: 'string / object', default: '—' },
  { name: 'wrap-class', description: '包裹容器的自定义类名', type: 'string', default: '—' },
  { name: 'view-style', description: '视图的自定义样式', type: 'string / object', default: '—' },
  { name: 'view-class', description: '视图的自定义类名', type: 'string', default: '—' },
  { name: 'always', description: '滚动条总是显示', type: 'boolean', default: 'false' },
  { name: 'distance', description: '触发到达底部事件的距离（像素）', type: 'number', default: '0' }
])

const events = ref([
  { name: 'scroll', description: '当触发滚动事件时，返回滚动的距离', type: 'Function: ({ scrollLeft: number, scrollTop: number }) => void' },
  { name: 'reach-bottom', description: '滚动到底部时的触发器', type: "Function: (direction: 'top' | 'bottom' | 'left' | 'right') => void" }
])

const slots = ref([
  { name: 'default', description: '自定义默认内容', subTag: '—' }
])

const exposes = ref([
  { name: 'handleScroll', description: '触发滚动事件', type: 'Function: () => void' },
  { name: 'scrollTo', description: '滚动到一组特定坐标', type: 'Function: (scrollTop: number, scrollLeft: number) => void' },
  { name: 'setScrollTop', description: '设置滚动条到顶部的距离', type: 'Function: (scrollTop: number) => void' },
  { name: 'setScrollLeft', description: '设置滚动条到左边的距离', type: 'Function: (scrollLeft: number) => void' },
  { name: 'update', description: '手动更新滚动条状态', type: 'Function: () => void' },
])
</script>

# Scrollbar 滚动条

## 基础用法
通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应。
<ExampleViewer name="scrollbar" case="case1" />

## 横向滚动​
当元素宽度大于滚动条宽度时，会显示横向滚动条。
<ExampleViewer name="scrollbar" case="case2" />

## 最大高度​
当元素高度超过最大高度，才会显示滚动条。
<ExampleViewer name="scrollbar" case="case3" />

## 无限滚动
reach-bottom 是在滚动条到达底部时触发的。 它可以用作无限滚动。
<ExampleViewer name="scrollbar" case="case4" />

## API
### Attributes
<ApiTable :data="attributes" type="attributes" />

### Events
<ApiTable :data="events" type="events" />

### Slots
<ApiTable :data="slots"  type="slots" subTag="" />

### Exposes
<ApiTable :data="exposes" type="exposes" />
