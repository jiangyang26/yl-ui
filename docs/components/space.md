<script setup>
import { ref } from 'vue'
import space from '../examples/space/space.vue'
import case1 from '../examples/space/case1.vue'
import case2 from '../examples/space/case2.vue'
import case3 from '../examples/space/case3.vue'
import case4 from '../examples/space/case4.vue'
import case5 from '../examples/space/case5.vue'
import case6 from '../examples/space/case6.vue'
import case7 from '../examples/space/case7.vue'
import case8 from '../examples/space/case8.vue'
import case9 from '../examples/space/case9.vue'

const attributes = ref([
  { name: 'alignment', description: '对齐的方式', type: 'enum', default: 'align-items center' },
  { name: 'direction', description: '排列的方向', type: 'enum', default: 'horizontal' },
  { name: 'spacer', description: '间隔符', type: 'string / number / VNode', default: '—' },
  { name: 'size', description: '间隔大小', type: 'enum / number / array', default: 'small' },
  { name: 'wrap', description: '设置是否自动折行', type: 'boolean', default: 'false' },
  { name: 'fill', description: '子元素是否填充父容器', type: 'boolean', default: 'false' },
  { name: 'fill-ratio', description: '填充父容器的比例', type: 'number', default: '100' }
])

const slots = ref([
  { name: 'default', description: '需要添加间隔的元素', subTag: '—' }
])
</script>

# Space 间距

## 基础用法
<ExampleViewer name="space" case="case1" />

## 垂直布局
<ExampleViewer name="space" case="case2" />

## 控制间距的大小
<ExampleViewer name="space" case="case3" />

## 自动换行
<ExampleViewer name="space" case="case4" />

## 行间分隔符
<ExampleViewer name="space" case="case5" />

## 分隔符还可以是 VNode 类型
<ExampleViewer name="space" case="case6" />

## 对齐方式
<ExampleViewer name="space" case="case7" />

## 填充容器
<ExampleViewer name="space" case="case8" />

## 自定义填充比例
<ExampleViewer name="space" case="case9" />


## API
### Attributes
<ApiTable :data="attributes" type="attributes" />

### Slots
<ApiTable :data="slots"  type="slots" />

