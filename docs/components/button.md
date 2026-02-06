<script setup>
import { ref } from 'vue'
import button from '../examples/button/button.vue'
import case1 from '../examples/button/case1.vue'
import case2 from '../examples/button/case2.vue'

const attributes = ref([
    { name: '', description: '', type: '', default: '', value: '' }
])

const events = ref([
    { name: '', description: '', params: '' }
])

const slots = ref([
    { name: '', description: '' }
])

const exposes = ref([
    { name: '', description: '', type: '' }
])
</script>

# Button 按钮
常用的操作按钮。

## 基础用法
使用 type、plain、round 和 circle 来定义按钮的样式。
<!-- <ExampleViewer name="button" case="button" /> -->
<ExampleViewer name="button" case="case1" />

## 禁用状态
你可以使用 disabled 属性来定义按钮是否被禁用。
使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。
<ExampleViewer name="button" case="case2" />

## API
### Attributes
<ApiTable :data="attributes" />
### Events
<ApiTable :data="events" />
### Slots
<ApiTable :data="slots" />
### Exposes
<ApiTable :data="exposes" />
