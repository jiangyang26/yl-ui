import type { Component, DefineComponent } from 'vue'
import { BUTTON_NATIVE_TYPE, BUTTON_SIZE, BUTTON_TYPE } from './constants'

export type ButtonType = typeof BUTTON_TYPE[number]
export type ButtonSize = typeof BUTTON_SIZE[number]
export type ButtonNativeType = typeof BUTTON_NATIVE_TYPE[number]

export interface ButtonProps {
  /** 视觉风格 */
  type?: ButtonType
  /** 尺寸 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 加载中 */
  loading?: boolean
  /** 加载中图标 */
  loadingIcon?: DefineComponent | Component | string
  /** 是否镂空 */
  plain?: boolean
  /** 是否圆角 */
  round?: boolean
  /** 是否圆形（icon 按钮） */
  circle?: boolean
  /** 颜色 */
  color?: string
  /** 原生 type 属性 */
  nativeType?: ButtonNativeType
  /** 是否聚焦 */
  autofocus?: boolean
  /** 图标 */
  icon?: DefineComponent | Component | string
  /** 文本按钮 */
  text?: boolean
  /** 文本按钮背景 */
  bg?: boolean
  /** 标签 */
  tag?: string | DefineComponent | Component
}
