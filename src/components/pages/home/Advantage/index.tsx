'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import { useAdvantageScroll } from '@/hooks/useAdvantageScroll'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent

const Advantage = ({ className }: TAdvantageProps) => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(124)

  const { query: advantagesQuery, mock } = useAdvantages()
  const { containerRef, calculateCardPosition, scrollProgress } = useAdvantageScroll()
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

  React.useEffect(() => {
    const checkMobileLayout = () => {
      setIsMobile(window.innerWidth < 1280)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  // 動態獲取 header 高度
  useEffect(() => {
    const getHeaderHeight = () => {
      const header = document.querySelector('header') ||
        document.querySelector('.header') ||
        document.querySelector('nav') ||
        document.querySelector('[data-header]')

      if (header) {
        const height = header.getBoundingClientRect().height
        setHeaderHeight(height)
      }
    }

    getHeaderHeight()
    window.addEventListener('resize', getHeaderHeight)

    return () => {
      window.removeEventListener('resize', getHeaderHeight)
    }
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isMobile || !trackRef?.current) return
      setIsDragging(true)
      setStartX(e.pageX - trackRef.current.offsetLeft)
      setScrollLeft(trackRef.current.scrollLeft)
    },
    [isMobile],
  )

  const handleMouseLeave = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseUp = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !isMobile || !trackRef?.current) return
      const x = e.pageX - trackRef.current.offsetLeft
      const walk = (x - startX) * 2
      trackRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, isMobile, startX, scrollLeft],
  )

  return (
    <section
      ref={containerRef}
      className={`${styles.backgroundMap} bg-figma-secondary-100 relative ${className || ''}`}
      style={isMobile ? {} : { height: `calc(100vh - ${headerHeight}px)` }}
    >
      {/* 桌機版背景地圖 */}
      {/* <div className='hidden xl:block absolute inset-0'>
        <div className='absolute h-[1010px] top-[-151px] left-1/2 transform -translate-x-1/2 w-[866px]'>
          <div className={styles.backgroundMap + ' w-full h-full opacity-10'} />
        </div>
      </div> */}

      {/* 標題區域 */}
      <div
        className={`relative xl:sticky xl:top-0 xl:left-0 px-0 py-[60px] xl:pt-[200px] xl:pb-[120px] flex flex-col gap-[20px] xl:gap-[120px] items-center`}
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
        className={`px-3 xl:px-0 xl:w-full pb-[60px] xl:pb-0 relative w-full ${isMobile ? 'overflow-x-auto' : styles.containerOverflow}`}
      >
        <div
          ref={trackRef}
          className={`${isMobile ? `${styles.trackMobile} ${styles.scrollContainer}` : styles.track} ${isDragging && isMobile
              ? 'cursor-grabbing'
              : isMobile
                ? 'cursor-grab'
                : ''
            }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {displayData.map((card, index) => {
            const cardStyle = !isMobile ? calculateCardPosition(index, scrollProgress, displayData.length) : {}

            return (
              <div
                key={card.id}
                data-card-index={index}
                className={`${styles.cardContainer} ${isMobile
                    ? 'w-[318px] flex-shrink-0'
                    : 'w-[522px] flex-shrink-0 absolute top-0 left-1/2'
                  }`}
                style={!isMobile ? {
                  ...cardStyle,
                  marginLeft: '-50%'
                } : undefined}
              >
                <AdvantageCard card={card} />
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

export default Advantage
