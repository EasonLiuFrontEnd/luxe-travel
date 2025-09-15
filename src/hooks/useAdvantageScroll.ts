'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

// 可配置的動畫邏輯參數
const ANIMATION_CONFIG = {
  ARC_HEIGHT: 200,
  SCROLL_SENSITIVITY: 1,
  BASE_OFFSET_MULTIPLIER: 3000,
  TRIGGER_ZONE: 200
} as const

export const useAdvantageScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  const calculateCardPosition = useCallback((index: number, progress: number, cardCount: number) => {
    // 基礎移動：所有卡片一起從右側 → 中間 → 左側
    const baseXOffset = (1 - progress) * ANIMATION_CONFIG.BASE_OFFSET_MULTIPLIER - progress * ANIMATION_CONFIG.BASE_OFFSET_MULTIPLIER

    // 固定卡片間距，避免動態計算問題
    const cardSpacing = 600 // 522px卡片 + 78px間距
    const centerOffset = (cardCount - 1) / 2 // 動態計算中心偏移
    const cardXOffset = (index - centerOffset) * cardSpacing

    const finalXOffset = baseXOffset + cardXOffset

    // 弧形軌跡：最高點為 0，向下彎曲到最低點
    const yOffset = ANIMATION_CONFIG.ARC_HEIGHT - (Math.sin(progress * Math.PI) * ANIMATION_CONFIG.ARC_HEIGHT)

    return {
      transform: `translate3d(${finalXOffset}px, ${yOffset}px, 0)`,
      opacity: 1,
      zIndex: 1
    }
  }, [])

  // 簡化的滾動處理，只用於計算動畫進度，不鎖定滾動
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // 計算滾動進度
    const containerTop = rect.top
    const containerHeight = rect.height
    const triggerStart = windowHeight * 0.8
    const triggerEnd = -containerHeight + windowHeight * 0.2

    const scrollRange = triggerStart - triggerEnd
    const currentScroll = triggerStart - containerTop
    const progress = Math.max(0, Math.min(1, currentScroll / scrollRange))

    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    const handleScrollEvent = () => handleScroll()

    window.addEventListener('scroll', handleScrollEvent, { passive: true })
    handleScroll() // 初始檢查

    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [handleScroll])

  return {
    containerRef,
    scrollProgress,
    calculateCardPosition
  }
}