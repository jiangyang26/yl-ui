<template>
    <div :class="splitterClass" ref="splitterRef">
        <template v-for="(node, index) in nodes">
            <div :class="ns.e('wrap')">
                <div :class="ns.e('view')">
                    <component :is="node" :ref="setPanelRef"></component>
                </div>
                <div :class="[ns.e('bar'), ns.is('disabled', !resizable)]" @mousedown="handleMouseDown($event, index)"
                    v-if="index !== nodes.length - 1">
                    <div v-if="showIconStart(index)" @click="handleCollapsibleStart(index)" @mousedown.stop
                        :class="[ns.e('bar--collapse-icon'), ns.e('bar--collapse-icon-start')]">
                        <Icon :name="isVertical ? 'arrow-up' : 'arrow-left'" size="12" />
                    </div>
                    <div v-if="index !== nodes.length - 1" :class="ns.e('bar--dragger')"></div>
                    <div v-if="showIconEnd(index)" @click="handleCollapsibleEnd(index)" @mousedown.stop
                        :class="[ns.e('bar--collapse-icon'), ns.e('bar--collapse-icon-end')]">
                        <Icon :name="isVertical ? 'arrow-down' : 'arrow-right'" size="12" />
                    </div>
                </div>
            </div>
        </template>

        <div v-if="lazy" ref="lazyBarRef" :class="ns.e('lazy')"></div>
    </div>
</template>

<script setup lang="ts">
import { useNameSpace } from '@/hooks/index'
import { SplitterProps } from './types'
import { SPLITTER_DEFAULT_PROPS, SPLITTER_DIRECTION } from './constants';
import { computed, Fragment, useSlots, Comment, ref, onMounted, VNode, isVNode } from 'vue'
import SplitterPanel from '@/components/splitter-panel';
import { vaildSizeValue } from '@/utils';
import { Nullable, SIZE_TYPE, SizeValue } from '@/types';
import Icon from '@/components/icon'

const props = withDefaults(defineProps<SplitterProps>(), SPLITTER_DEFAULT_PROPS)

const ns = useNameSpace('splitter')

type SplitterPanelType = InstanceType<typeof SplitterPanel>

const panelRefs = ref<SplitterPanelType[]>([])

type CollapsibleState = {
    start: boolean
    end: boolean
}

// collapsible icon 显示状态
const showIconStart = (index: number): boolean => {
    let c = getAttrState(index, 'collapsible')
    let n = getAttrState(index + 1, 'collapsible')
    return props.resizable && ((c && panelSizeList.value[index]?.currentSize !== 0) || (n && panelSizeList.value[index + 1]?.currentSize === 0))
}

const showIconEnd = (index: number): boolean => {
    let c = getAttrState(index, 'collapsible')
    let n = getAttrState(index + 1, 'collapsible')
    return props.resizable && ((n && panelSizeList.value[index + 1]?.currentSize !== 0) || (c && panelSizeList.value[index]?.currentSize === 0 && panelSizeList.value[index + 1]?.currentSize !== 0))
}

// 获取面板当前尺寸列表
const getPanelSizeList = (): number[] => {
    return panelSizeList.value.map(item => item.currentSize)
}

// 获取面板元素尺寸
const getPanelElSize = (index: number): number => {
    let size = 0
    if (index >= 0 && index <= panelElList.length - 1) {
        size = panelElList[index][isVertical.value ? 'clientHeight' : 'clientWidth']
    }
    return size
}

// 设置面板尺寸状态
const setPanelSizeState = (index: number): void => {
    panelSizeList.value[index] = {
        currentSize: getPanelElSize(index),
        prevSize: panelSizeList.value[index].currentSize
    }
}

// 返回上一次所在的位置，否则 min / max
const handleCollapsibleStart = (index: number): void => {

    if (!props.resizable) return
    computedCurrentConfig(index)

    let to: number = currentMinSize

    if (panelSizeList.value[index].currentSize === 0) {
        index = prevNotNoneIndex(index)
        computedCurrentConfig(index)
    }

    if (panelSizeList.value[index].currentSize > panelSizeList.value[index].prevSize) {
        to = panelSizeList.value[index].prevSize
    }

    move(to)

    setPanelSizeState(index)
    setPanelSizeState(index + 1)
}

const handleCollapsibleEnd = (index: number): void => {

    if (!props.resizable) return
    computedCurrentConfig(index)

    let to = currentMaxSize

    if (panelSizeList.value[index].currentSize === 0 && panelSizeList.value[index].currentSize < panelSizeList.value[index].prevSize) {
        to = panelSizeList.value[index].prevSize
    }

    move(to)

    setPanelSizeState(index)
    setPanelSizeState(index + 1)
}

const setPanelRef = (el: SplitterPanelType): void => {
    if (el && el.$) {
        panelRefs.value.push(el)
    }
}

const getAttrState = (i: number, attr: string): boolean => {
    let state = false

    if (i <= nodes.value.length - 1) {
        if (nodes.value[i].props && (nodes.value[i].props[attr] === '' || nodes.value[i].props[attr] === true)) {
            state = true
        }
    }

    return state
}

type PanelSize = {
    prevSize: number,
    currentSize: number
}

// 容器 ref
const splitterRef = ref<HTMLElement>()
// 面板元素列表
let panelElList: HTMLElement[]

// 面板尺寸列表
const panelSizeList = ref<PanelSize[]>([])

// bar 按下状态
const barIsDown = ref(false)

// 容器尺寸
let splitterSize: number = 0
// 起始坐标
let start: number = 0
// 当前索引
let currentIndex: number = 0
// 当前元素
let currentEl: HTMLElement
// 当前元素 size
let currentElSize: number
// 当前元素最大 size
let currentMaxSize: number = 0
// 当前元素最小 size
let currentMinSize: number = 0
// 当前原始最大 size
let currentOriginalMaxSize: number = 0

// 下一个索引
let nextIndex: number = 0
// 下一个元素
let nextEl: HTMLElement
// 下一个元素是否隐藏
let nextIsNone: boolean = false
// 当前元素是否隐藏
let currentIsNone: boolean = false
let once: boolean = true


// 初始化
const init = (): void => {

    panelElList = Array.from(splitterRef.value!.children).filter(item => item.className.indexOf(ns.e('wrap')) !== -1) as HTMLElement[]
    // 容器尺寸
    splitterSize = splitterRef.value![isVertical.value ? 'clientHeight' : 'clientWidth']
    // 有效 size 的 panel 数组
    let effectiveSizePanelsNumber: VNode[] = nodes.value.filter(item => item.props?.size && vaildSizeValue(item.props?.size)?.type === SIZE_TYPE.number)
    let effectiveSizePanelsPercent: VNode[] = nodes.value.filter(item => item.props?.size && vaildSizeValue(item.props?.size)?.type === SIZE_TYPE.percent)

    // 有效 size 的总和
    let effectiveSizeSum: number = 0
    // 数值总和
    let numberSum: number = effectiveSizePanelsNumber.reduce((s, n) => s + Number(n.props?.size), 0)

    // 百分比 -> px
    effectiveSizePanelsPercent.forEach(item => {
        let percent: number = Number((item.props?.size! + '').split('%')[0])
        effectiveSizeSum += Math.floor(splitterSize * (percent / 100))
    });

    effectiveSizeSum += numberSum

    let ratio: number = 0
    if (effectiveSizeSum > splitterSize) {
        ratio = splitterSize / effectiveSizeSum
    }

    // 无效 size 的数量
    let invalidSizeLength: number = nodes.value.length - (effectiveSizePanelsNumber.length + effectiveSizePanelsPercent.length)
    // panel 默认 size
    let defaultPanelSize: number = !ratio && !!invalidSizeLength ? Math.floor((splitterSize - effectiveSizeSum) / invalidSizeLength) : 0

    // panel size 分配
    // 百分比 -> px，有效 size 总和未超出容器大小，各自分配空间，剩余空间分配给未设置 size 的panel，如果没有未设置 size 的 panel，强制分配给最后一个 panel
    // 百分比 -> px，有效 size 总和超出容器大小，等比例分配空间
    // 小数精度分配给最后一个有效 size 的 panel

    // 最后一个有效 size 的索引
    let effectiveSizeLastIndex: number = nodes.value.findLastIndex(item => vaildSizeValue(item.props?.size))
    // panel size 总和
    let panelSizeSum: number = 0

    panelElList!.forEach((el, i) => {
        let panel = nodes.value[i]
        let size: number = defaultPanelSize

        // size 是否有效
        let vaild: Nullable<SizeValue> = vaildSizeValue(panel.props?.size)

        if (vaild) {
            if (vaild.type === SIZE_TYPE.number) {
                if (!!ratio) {
                    size = vaild.num * ratio
                } else {
                    size = vaild.num
                }
            } else if (vaild.type === SIZE_TYPE.percent) {
                let toPx: number = splitterSize * (vaild.num / 100)
                if (!!ratio) {
                    size = toPx * ratio
                } else {
                    size = toPx
                }
            }
        }

        size = Math.floor(size)

        // 剩余空间分配给最后一个 panel
        if (i === panelElList.length - 1 && !ratio && !invalidSizeLength) {
            size = Math.floor(splitterSize - panelSizeSum)
        }

        // 记录实际 panel size 的总和
        panelSizeSum += size

        // 设置 panel size
        el.style[isVertical.value ? 'height' : 'width'] = `${size}px`

        emitPanelSize(i, size)

        panelSizeList.value[i] = { currentSize: size, prevSize: size }
    })

    // 精度剩余 px 分配给最后一个有效 size 的 panel
    if (effectiveSizeLastIndex !== -1) {
        let _ = parseFloat(getComputedStyle(panelElList[effectiveSizeLastIndex])[isVertical.value ? 'height' : 'width'])
        panelElList[effectiveSizeLastIndex].style[isVertical.value ? 'height' : 'width'] = `${_ + (splitterSize - panelSizeSum)}px`
    }
}

// 计算当前需要的配置信息
const computedCurrentConfig = (index: number): void => {
    // 索引
    currentIndex = index
    nextIndex = currentIndex + 1
    // 元素
    currentEl = panelElList![currentIndex]
    nextEl = panelElList![nextIndex]

    currentElSize = getPanelElSize(currentIndex)
    currentOriginalMaxSize = currentElSize + getPanelElSize(nextIndex)

    // props max/min size
    let maxValid: Nullable<SizeValue> = vaildSizeValue(nodes.value[currentIndex].props?.max)
    let minValid: Nullable<SizeValue> = vaildSizeValue(nodes.value[currentIndex].props?.min)

    let max: number = 0
    let min: number = 0

    if (maxValid) {
        if (maxValid.type === SIZE_TYPE.number) {
            max = maxValid.num
        } else if (maxValid.type === SIZE_TYPE.percent) {
            max = Math.floor(splitterSize * (maxValid.num / 100))
        }

        currentMaxSize = Math.min(currentOriginalMaxSize, max)
    } else {
        currentMaxSize = currentOriginalMaxSize
    }

    if (minValid) {
        if (minValid.type === SIZE_TYPE.number) {
            min = minValid.num
        } else if (minValid.type === SIZE_TYPE.percent) {
            min = Math.floor(splitterSize * (minValid.num / 100))
        }

        currentMinSize = Math.max(currentMinSize, min)
    } else {
        currentMinSize = 0
    }
}

// 获取最后一个隐藏的索引
const lastNoneIndex = (index: number): number => {
    let newIndex = 0
    for (let i = index + 1; i < panelElList!.length; i++) {
        if (getPanelElSize(i) === 0) {
            newIndex = i
        } else {
            break
        }
    }

    return newIndex
}

// 获取上一个未隐藏的索引
const prevNotNoneIndex = (index: number): number => {
    let newIndex = 0
    for (let i = index - 1; i >= 0; i--) {
        if (getPanelElSize(i) > 0) {
            newIndex = i
            break
        }
    }

    return newIndex
}

const emitPanelSize = (index: number, size: number): void => {
    panelRefs.value[index].emitUpdateSize(size)
}

// 移动
const move = (to: number): void => {

    if (!props.resizable) return

    let currentSize: number = to
    let nextSize: number = currentOriginalMaxSize - to

    if (to > currentMaxSize) {
        currentSize = currentMaxSize
        nextSize = currentOriginalMaxSize - currentMaxSize
    }

    if (to < currentMinSize) {
        currentSize = currentMinSize
        nextSize = currentOriginalMaxSize - currentMinSize
    }

    // 移动
    currentEl.style[isVertical.value ? 'height' : 'width'] = `${currentSize}px`
    nextEl.style[isVertical.value ? 'height' : 'width'] = `${nextSize}px`

    emitPanelSize(currentIndex, currentSize)
    emitPanelSize(nextIndex, nextSize)
}

let lazyBarStart = {
    x: 0,
    y: 0
}

const lazyBarRef = ref<HTMLElement>()

// 鼠标按下
const handleMouseDown = (e: MouseEvent, index: number) => {
    if (props.lazy) {
        let target: HTMLElement = e.target as HTMLElement
        lazyBarStart = {
            x: target.getBoundingClientRect().left - splitterRef.value!.getBoundingClientRect().left + 7,
            y: target.getBoundingClientRect().top - splitterRef.value!.getBoundingClientRect().top + 7,
        }

        lazyBarRef.value!.style[isVertical.value ? 'top' : 'left'] = `${isVertical.value ? lazyBarStart.y : lazyBarStart.x}px`
    }

    if (index >= panelElList!.length - 1) return

    if (!props.resizable) return

    computedCurrentConfig(index)

    // if (isVertical.value) {
    //     nextIsNone = nextEl.clientHeight <= 0
    // } else {
    //     nextIsNone = nextEl.clientWidth <= 0
    // }

    start = e[isVertical.value ? 'clientY' : 'clientX']
    currentIsNone = getPanelElSize(index) <= 0

    // 起始位置多个 panel 隐藏
    if (currentIsNone) {
        let i = prevNotNoneIndex(currentIndex)
        if (i === 0 && getPanelElSize(i) <= 0) {
            currentIsNone = false
        }
    }

    barIsDown.value = true

    e.preventDefault()
    document.body.classList.add('no-select')
    document.body.classList.add(isVertical.value ? 'cursor-ns-resize' : 'cursor-ew-resize')
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

// 鼠标抬起
const handleMouseUp = (e: MouseEvent) => {
    barIsDown.value = false
    // nextIsNone = false
    currentIsNone = false
    once = true

    if (props.lazy) {
        move(lazyBarSize)
    }

    let currentSize: number = getPanelElSize(currentIndex)
    let nextSize: number = getPanelElSize(nextIndex)

    panelSizeList.value[currentIndex] = { currentSize, prevSize: currentSize }
    panelSizeList.value[nextIndex] = { currentSize: nextSize, prevSize: nextSize }

    document.body.classList.remove('no-select')
    document.body.classList.remove(isVertical.value ? 'cursor-ns-resize' : 'cursor-ew-resize')
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}

let lazyBarSize: number = 0

// 鼠标移动
const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    if (!barIsDown.value) return

    let transform = (isVertical.value ? e.clientY : e.clientX) - start

    // wrap overflow: hidden 当 panel 隐藏时，获取的 index 始终是上一个未隐藏 panel 的索引，需要最后一个隐藏 panel 的索引用来当作 current index
    // if (nextIsNone && transform > 0 && once) {
    //     once = false
    //     let i = lastNoneIndex(currentIndex)
    //     // 下标越界
    //     if (i >= panelElList.length - 1) {
    //         return
    //     }
    //     computedCurrentConfig(i)
    // }

    // 修改后 去除 wrap overflow: hidden 当 panel 隐藏时，获取的 index 始终是最后一个隐藏 panel 的索引，需要上一个未隐藏 panel 的索引来当作 current index
    if ((currentIsNone || currentMaxSize === 0) && transform < 0 && once) {
        once = false
        let i = prevNotNoneIndex(currentIndex)
        computedCurrentConfig(i)
    }

    let _to = transform + currentElSize

    // if (transform < 0) {
    //     nextIsNone = false
    // }
    if (transform > 0) {
        currentIsNone = false
    }

    if (props.lazy) {
        lazyMove(transform)
    } else {
        move(_to)
    }
}

const lazyMove = (transform: number): void => {

    if (!props.resizable || !props.lazy) return

    lazyBarSize = currentElSize + transform
    let start = isVertical.value ? lazyBarStart.y : lazyBarStart.x
    let position = start + transform

    // max
    if (lazyBarSize >= currentMaxSize) {
        position = start - currentElSize + currentMaxSize
        lazyBarSize = currentMaxSize
    }

    // min
    if (lazyBarSize <= currentMinSize) {
        position = start - currentElSize + currentMinSize
        lazyBarSize = currentMinSize
    }

    lazyBarRef.value!.style[isVertical.value ? 'top' : 'left'] = `${position}px`
}


onMounted(() => {
    init()
})


const slots = useSlots()
const nodes = computed(() => {
    let vNodes = slots.default?.() ?? []

    return vNodes.filter(node => node.type !== Comment && (node.type === Fragment || node.type === SplitterPanel)).flatMap(node => {
        if (node.type === Fragment && Array.isArray(node.children)) {
            return node.children.filter(n => isVNode(n) && n.type === SplitterPanel) as VNode[]
        }

        if (node.type === SplitterPanel) {
            return [node] as VNode[]
        }

        return []
    })
})

const isVertical = computed(() => props.direction === SPLITTER_DIRECTION.vertical)

const splitterClass = computed(() => [
    ns.b.value,
    ns.is(SPLITTER_DIRECTION.vertical, isVertical.value),
    ns.is('down', barIsDown.value)
])


</script>

<style scoped src="./../style/index.scss"></style>
