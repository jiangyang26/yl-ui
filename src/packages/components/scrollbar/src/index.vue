<template>
    <div :class="scrollBarClass" @mouseenter="handleWrapEnter" @mouseleave="handleWrapLeave">
        <!-- 包裹容器 -->
        <div :class="scrollBarWrapClass" ref="wrapRef" :style="scrollBarWrapStyle" @scroll="handleScroll">
            <!-- 滚动内容 -->
            <div :class="scrollBarViewClass" ref="viewRef" :style="scrollBarViewStyle">
                <slot></slot>
            </div>
        </div>

        <!-- 滚动条 - y -->
        <transition :name="ns.c('fade')">
            <div v-show="showBar.y" :class="scrollBarBarClass" class="is-vertical">
                <div :class="[ns.e('thumb')]" :style="yBarStyle" ref="yBarRef"
                    @mousedown="handleBarDown($event, BAR_TYPE.VERTICAL)" @mouseup="handleBarUp"></div>
            </div>
        </transition>

        <!-- 滚动条 - x -->
        <transition :name="ns.c('fade')">
            <div v-show="showBar.x" :class="scrollBarBarClass" class="is-horizontal">
                <div :class="[ns.e('thumb')]" :style="xBarStyle" ref="xBarRef"
                    @mousedown="handleBarDown($event, BAR_TYPE.HORIZONTAL)" @mouseup="handleBarUp"></div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { ScrollbarProps } from './types'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { isNumeric, parseCSS } from '@/utils';
import { SCROLLBAR_DEFAULT_PROPS } from './constants';

const props = withDefaults(defineProps<ScrollbarProps>(), SCROLLBAR_DEFAULT_PROPS)

const emit = defineEmits(['scroll', 'reachBottom'])

const ns = useNameSpace('scrollbar')

const wrapRef = ref<HTMLElement>()
const viewRef = ref<HTMLElement>()
const yBarRef = ref<HTMLElement>()
const xBarRef = ref<HTMLElement>()

// 容器高度
let wrapHeight = ref(0)
// 容器滚动高度
let wrapScrollHeight = ref(0)
// 容器宽度
let wrapWidth = ref(0)
// 容器滚动宽度
let wrapScrollWidth = ref(0)

// 容器是否悬停
const wrapIsHover = ref(false)

const xBarStyle: any = ref({})
const yBarStyle: any = ref({})


const scrollBarClass = computed(() => [
    ns.b.value
])

const scrollBarWrapClass = computed(() => [
    ns.e('wrap'),
    props.wrapClass !== ns.e('wrap') && props.wrapClass
])

const scrollBarViewClass = computed(() => [
    ns.e('view'),
    props.wrapClass !== ns.e('view') && props.viewClass
])

const scrollBarBarClass = computed(() => [
    ns.e('bar')
])


const scrollBarWrapStyle = computed(() => {
    let style: any = {
        height: props.height && isNumeric(props.height) ? `${props.height}px` : props.height,
        maxHeight: props.maxHeight && isNumeric(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight
    }
    if (props.wrapStyle) {
        if (typeof props.wrapStyle === 'object') {
            style = Object.assign(style, props.wrapStyle)
        } else {
            style = Object.assign(style, parseCSS(props.wrapStyle))
        }
    }

    if (props.native) {
        style.scrollbarWidth = 'auto'
    }

    return style
})

const scrollBarViewStyle = computed(() => {
    if (props.viewStyle) {
        if (typeof props.viewStyle === 'object') {
            return props.viewStyle
        } else {
            return parseCSS(props.viewStyle)
        }
    }

    return {}
})

const showBar = computed(() => {
    if (props.native) {
        return { x: false, y: false }
    }

    let yt = wrapHeight.value < wrapScrollHeight.value
    let xt = wrapWidth.value < wrapScrollWidth.value

    if (props.always) {
        return { x: xt, y: yt }
    } else {
        return {
            x: (wrapIsHover.value && xt) || (barIsDown.value && barType === BAR_TYPE.HORIZONTAL),
            y: (wrapIsHover.value && yt) || (barIsDown.value && barType === BAR_TYPE.VERTICAL)
        }
    }
})

let ro: ResizeObserver | null = null

let mo: MutationObserver | null = null

onMounted(async () => {
    await nextTick()

    // ro = new ResizeObserver(() => {
    //     getBarWH()
    // })

    // ro.observe(viewRef.value!)

    mo = new MutationObserver((e) => {
        getBarWH()
    })
    mo.observe(viewRef.value!, {
        childList: true,
        subtree: true
    })

    getBarWH()
})

onUnmounted(() => {
    // ro?.disconnect()
    mo?.disconnect()
})

// 鼠标进入容器
const handleWrapEnter = () => {
    wrapIsHover.value = true
}

// 鼠标离开容器
const handleWrapLeave = () => {
    wrapIsHover.value = false
}

enum BAR_TYPE {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}

let barType = ''
let barHeight = 0
let barWidth = 0
let barTransform = {
    x: 0,
    y: 0
}
// 滚动条是否按下
let barIsDown = ref(false)
// 鼠标按下位置
const mousePosition = {
    x: 0,
    y: 0
}


// 获取滚动条宽高
const getBarWH = () => {
    // y bar
    wrapHeight.value = wrapRef.value!.clientHeight
    wrapScrollHeight.value = wrapRef.value!.scrollHeight

    if (wrapScrollHeight.value > wrapHeight.value) {
        // 计算滚动条高度
        barHeight = Math.round(wrapHeight.value / wrapScrollHeight.value * wrapHeight.value)
        yBarStyle.value.height = `${barHeight}px`

        // 计算滚动条位置
        let y = (yBarRef.value && getBarTransform(yBarRef.value).y) ?? 0
        if (y >= 0) {
            barTransform.y = (wrapRef.value!.scrollTop / wrapScrollHeight.value) * wrapHeight.value
            yBarStyle.value.transform = `translateY(${barTransform.y}px)`
        }
    }

    // x bar
    wrapWidth.value = wrapRef.value!.clientWidth
    wrapScrollWidth.value = wrapRef.value!.scrollWidth

    if (wrapScrollWidth.value > wrapWidth.value) {
        // 计算滚动条宽度
        barWidth = wrapWidth.value / wrapScrollWidth.value * wrapWidth.value
        xBarStyle.value.width = `${barWidth}px`

        // 计算滚动条位置
        let x = (xBarRef.value && getBarTransform(xBarRef.value).x) ?? 0
        if (x >= 0) {
            barTransform.x = (wrapRef.value!.scrollLeft / wrapScrollWidth.value) * wrapWidth.value
            xBarStyle.value.transform = `translateX(${barTransform.x}px)`
        }
    }

}

// 获取滚动条位置
const getBarTransform = (el: HTMLElement) => {
    if (!el) {
        return { x: 0, y: 0 }
    }
    const m = getComputedStyle(el).transform.match(/-?\d+\.?\d*/g)
    if (!m) return { x: 0, y: 0 }
    return { x: Number(m[4] || 0), y: Number(m[5] || 0) }
}


// 容器滚动
const wrapScroll = (to: number) => {
    if (!isNumeric(to)) {
        return
    }
    to = Math.ceil(to)

    if (barType === BAR_TYPE.VERTICAL) {
        wrapRef.value?.scrollTo({
            top: to
        })
    } else if (barType === BAR_TYPE.HORIZONTAL) {
        if (to < 0 || to > wrapScrollWidth.value - wrapWidth.value) {
            return
        }
        wrapRef.value?.scrollTo({
            left: to
        })
    }
}

let triggered = true

// 滚动条滚动
const barScroll = (to: number) => {
    if (!isNumeric(to)) {
        return
    }

    to = Math.round(to)

    if (barType === BAR_TYPE.VERTICAL) {
        if (to < 0 || to > wrapScrollHeight.value - wrapHeight.value) {
            return
        }

        yBarStyle.value.transform = `translateY(${to}px)`
    } else if (barType === BAR_TYPE.HORIZONTAL) {
        if (to < 0 || to > wrapScrollWidth.value - wrapWidth.value) {
            return
        }

        xBarStyle.value.transform = `translateX(${to}px)`
    }
}

let _scrollTop = 0
let _scrollLeft = 0

// 滚动事件
const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    emit('scroll', { scrollLeft: target.scrollLeft, scrollTop: target.scrollTop })

    let d = 0
    if (isNumeric(props.distance)) {
        d = props.distance
    }

    if (target.scrollTop >= _scrollTop) {

        let limit = target.scrollHeight - wrapHeight.value - (d)

        if (!triggered && target.scrollTop < limit) {
            triggered = true
        }

        if (triggered && target.scrollTop >= limit) {
            triggered = false
            emit('reachBottom', { direction: BAR_TYPE.VERTICAL })
        }
    }

    if (target.scrollLeft > _scrollLeft) {
        let limit = target.scrollWidth - wrapWidth.value - d

        if (!triggered && target.scrollLeft < limit) {
            triggered = true
        }

        if (triggered && target.scrollLeft >= limit) {
            triggered = false
            emit('reachBottom', { direction: BAR_TYPE.HORIZONTAL })
        }
    }

    _scrollTop = target.scrollTop
    _scrollLeft = target.scrollLeft

    if (props.native || barIsDown.value) {
        return
    }

    barType = BAR_TYPE.VERTICAL
    barScroll(target.scrollTop / target.scrollHeight * wrapHeight.value)
}


// 滚动条按下
const handleBarDown = (e: MouseEvent, type: string) => {
    // x / y
    barType = type
    barIsDown.value = true
    mousePosition.y = e.clientY
    mousePosition.x = e.clientX
    barTransform.y = getBarTransform(e.target as HTMLElement).y
    barTransform.x = getBarTransform(e.target as HTMLElement).x

    e.preventDefault()
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', handleBarMove)
    document.addEventListener('mouseup', handleBarUp)
}

// 滚动条抬起
const handleBarUp = (e: MouseEvent) => {
    barIsDown.value = false

    document.body.classList.remove('no-select')
    document.removeEventListener('mousemove', handleBarMove)
    document.removeEventListener('mouseup', handleBarUp)
}

// 滚动条移动
const handleBarMove = (e: MouseEvent) => {
    if (!barIsDown.value) {
        return
    }

    if (barType === BAR_TYPE.VERTICAL) {
        let transform = e.clientY - mousePosition.y + barTransform.y

        if (transform > (wrapHeight.value - barHeight)) {
            wrapScroll(wrapScrollHeight.value - wrapHeight.value)
            return
        }

        barScroll(transform)
        wrapScroll(transform / wrapHeight.value * wrapScrollHeight.value)
    } else if (barType === BAR_TYPE.HORIZONTAL) {
        let transform = e.clientX - mousePosition.x + barTransform.x

        if (transform > (wrapWidth.value - barWidth)) {
            wrapScroll(wrapScrollWidth.value - wrapWidth.value)
            return
        }

        barScroll(transform)
        wrapScroll(transform / wrapWidth.value * wrapScrollWidth.value)
    }
}

const scrollFn = () => {
    wrapRef.value?.scrollTo(0, wrapRef.value.scrollTop + 1)
    wrapRef.value?.scrollTo(0, wrapRef.value.scrollTop - 1)
}

const scrollTo = (x: number = 0, y: number = 0) => {
    if (!wrapRef.value || !isNumeric(x) || !isNumeric(y)) {
        return
    }
    wrapRef.value.scrollTo(x, y)
    update()
}

const setScrollTop = (scrollTop: number) => {
    barType = BAR_TYPE.VERTICAL
    wrapScroll(scrollTop)
}

const setScrollLeft = (scrollLeft: number) => {
    barType = BAR_TYPE.HORIZONTAL
    wrapScroll(scrollLeft)
    wrapRef.value && barScroll(wrapRef.value.scrollLeft / wrapRef.value.scrollWidth * wrapRef.value.clientWidth)
}

const update = () => {
    getBarWH()
}


/**
 * 暴露给父组件的方法
 * @param {Function} handleScroll 触发滚动事件
 * @param {Function} scrollTo 设置滚动位置
 * @param {Function} setScrollTop 设置垂直滚动位置
 * @param {Function} setScrollLeft 设置水平滚动位置
 * @param {Function} update 更新滚动条
 */
defineExpose({
    handleScroll: scrollFn,
    scrollTo,
    setScrollTop,
    setScrollLeft,
    update
})


</script>

<style scoped src="./../style/index.scss"></style>
