'use client'

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent & {
  collectionRef?: React.RefObject<HTMLDivElement>
}

const Advantage = ({ className }: TAdvantageProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInDetectionZone, setIsInDetectionZone] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const lastScrollY = useRef(0)
  const entryDirection = useRef<'from-top' | 'from-bottom' | null>(null)
  const hasCompletedHorizontalScroll = useRef(false)


  const { query: advantagesQuery, mock } = useAdvantages()
  const {
    data: advantagesData,
    isLoading: isAdvantagesLoading,
    error: advantagesError,
  } = advantagesQuery

  const displayData = useMemo(() => {
    if (advantagesError || !advantagesData) {
      return transformAdvantageData(mock.rows)
    }

    if (isAdvantagesLoading) {
      return []
    }

    return transformAdvantageData(advantagesData)
  }, [advantagesError, advantagesData, isAdvantagesLoading, mock.rows])

  useEffect(() => {
    const checkMobileLayout = () => {
      const newIsMobile = window.innerWidth < 1280
      setIsMobile(newIsMobile)
    }

    const setInitialPosition = () => {
      if (!backgroundRef.current) return

      const rect = backgroundRef.current.getBoundingClientRect()
      // 如果檢測區域在視窗上方，預設卡片在右側（準備從上方進入）
      // 如果檢測區域在視窗下方，預設卡片在左側（準備從下方進入）
      if (rect.bottom <= 0) {
        // 檢測區域在視窗上方，會從上方進入
        setTranslateX(window.innerWidth)
      } else if (rect.top >= window.innerHeight) {
        // 檢測區域在視窗下方，會從下方進入
        const trackWidth = trackRef.current?.scrollWidth || 0
        setTranslateX(-(window.innerWidth + trackWidth))
      } else {
        // 已經在檢測區域內，保持當前位置
        setTranslateX(window.innerWidth)
      }
    }

    checkMobileLayout()
    setInitialPosition()

    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  const handleDesktopScroll = useCallback((event: WheelEvent) => {
    if (isMobile || !isInDetectionZone) return

    // 先阻止預設滾動行為
    event.preventDefault()

    const delta = event.deltaY
    const currentDirection = delta > 0 ? 'down' : 'up'

    if (scrollDirection !== currentDirection) {
      setScrollDirection(currentDirection)
    }

    const moveAmount = delta * 2
    const maxLeft = -(window.innerWidth + (trackRef.current?.scrollWidth || 0))
    const maxRight = window.innerWidth

    setTranslateX(prev => {
      const newX = prev - moveAmount
      const clampedX = Math.max(maxLeft, Math.min(maxRight, newX))

      // 檢查是否到達邊界且繼續朝同方向滾動
      const shouldRelease =
        // 原始方向滾動到底的情況
        (entryDirection.current === 'from-top' && clampedX === maxLeft && currentDirection === 'down') ||
        (entryDirection.current === 'from-bottom' && clampedX === maxRight && currentDirection === 'up') ||
        // 改變方向後退回起始位置的情況
        (entryDirection.current === 'from-top' && clampedX === maxRight && currentDirection === 'up') ||
        (entryDirection.current === 'from-bottom' && clampedX === maxLeft && currentDirection === 'down')

      if (shouldRelease) {
        // 設定完成標記，防止重複觸發
        hasCompletedHorizontalScroll.current = true

        // 釋放垂直滾動
        setIsScrollLocked(false)
        setIsInDetectionZone(false)
        setScrollDirection(null)
        entryDirection.current = null

        // 手動觸發一次頁面滾動
        window.scrollBy(0, delta)
        return prev
      }

      return clampedX
    })
  }, [isMobile, isInDetectionZone, scrollDirection])

  const checkDetectionZone = useCallback(() => {
    if (isMobile || !backgroundRef.current) return

    const rect = backgroundRef.current.getBoundingClientRect()
    const currentScrollY = window.scrollY
    const wasInZone = isInDetectionZone

    // 根據滾動方向使用不同的觸發條件
    const fromTop = currentScrollY > lastScrollY.current
    const inZone = fromTop
      ? rect.top <= 0 && rect.bottom > 0    // 從上方進入：頂部碰到視窗頂部
      : rect.bottom >= window.innerHeight && rect.top < window.innerHeight  // 從下方進入：底部碰到視窗底部

    if (inZone && !wasInZone && !hasCompletedHorizontalScroll.current) {
      const direction = currentScrollY > lastScrollY.current ? 'from-top' : 'from-bottom'
      entryDirection.current = direction

      setIsInDetectionZone(true)
      setIsScrollLocked(true)
      setScrollDirection(direction === 'from-top' ? 'down' : 'up')

      // 根據進入方向設定正確的初始位置
      if (direction === 'from-top') {
        // 從上方進入，卡片應該從右側開始
        setTranslateX(window.innerWidth)
      } else {
        // 從下方進入，卡片應該從左側開始
        const trackWidth = trackRef.current?.scrollWidth || 0
        setTranslateX(-(window.innerWidth + trackWidth))
      }
    } else if (!inZone) {
      // 當真正離開檢測區域時，重置所有狀態
      if (hasCompletedHorizontalScroll.current || wasInZone) {
        setIsInDetectionZone(false)
        setIsScrollLocked(false)
        setScrollDirection(null)
        entryDirection.current = null
        hasCompletedHorizontalScroll.current = false
      }
    }

    if (inZone && scrollDirection) {
      const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'

      if (newDirection !== scrollDirection && entryDirection.current) {
        setScrollDirection(newDirection)
      }
    }

    lastScrollY.current = currentScrollY
  }, [isMobile, isInDetectionZone, scrollDirection])

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      checkDetectionZone()
    }

    window.addEventListener('scroll', handleScroll, { passive: false })
    window.addEventListener('wheel', handleDesktopScroll, { passive: false })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleDesktopScroll)
    }
  }, [isMobile, handleDesktopScroll, checkDetectionZone])

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isScrollLocked])


  return (
    <section
      className={`bg-figma-secondary-100 relative ${className || ''}`}
    >
      {/* 標題區域 */}
      <div
        ref={backgroundRef}
        className={`${styles.backgroundMap} relative pt-[60px] xl:pt-[200px] xl:left-0 px-0 pb-[60px] xl:pb-0 flex flex-col gap-[20px] xl:gap-[120px] items-center xl:h-[100vh]`}
      >
        <h2 className='inline-block font-family-noto-serif font-bold text-[32px] xl:text-[64px] xl:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] gradient-title-border'>
          典藏優勢
        </h2>

        <div className='content-stretch flex flex-col gap-2 xl:gap-6 items-center justify-center leading-[0] not-italic relative shrink-0 text-center w-full'>
          <div className='font-family-noto-serif font-semibold xl:font-bold min-w-full relative shrink-0 text-figma-primary-950 text-[18px] lg:text-[24px] lg:tracking-[12px] leading-[1.5] lg:leading-[1.2]'>
            機票｜住宿｜景點｜交通一站式安排
          </div>
          <div className='flex flex-col font-family-genseki justify-center relative shrink-0 text-figma-secondary-500 text-[16px] xl:text-[20px] w-full xl:w-[496px] leading-[1.2] xl:leading-[1.5]'>
            提升旅客安全 · 降低旅行風險
          </div>
        </div>
      </div>

      {/* 卡片區域 */}

      <div
        className={`px-3 xl:px-0 pb-[60px] xl:pb-0`}
      >
        <div
          ref={trackRef}
          data-track="advantage-track"
          className={`${isMobile ? styles.trackMobile : styles.track}`}
          style={!isMobile ? {
            transform: `translateX(${translateX}px)`,
            transition: isInDetectionZone ? 'none' : 'transform 0.3s ease-out'
          } : {}}
        >
          {displayData.map((card, index) => (
            <div
              key={card.id}
              data-card-index={index}
              className={`${styles.cardContainer} flex-shrink-0 ${isMobile
                ? 'w-[318px] max-w-none'
                : 'w-[30vw] max-w-[522px]'
                }`}
            >
              <AdvantageCard card={card} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Advantage
