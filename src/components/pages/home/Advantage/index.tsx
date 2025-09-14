'use client'

import React, { useState, useCallback, useMemo } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent

const Advantage = ({ className }: TAdvantageProps) => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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

  React.useEffect(() => {
    const checkMobileLayout = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isMobile || !trackRef?.current) return
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseUp = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isMobile || !trackRef?.current) return
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    trackRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, isMobile, startX, scrollLeft])

  return (
    <section className={`bg-figma-secondary-100 relative ${className || ''}`}>
      {/* 桌機版背景地圖 */}
      <div className='hidden lg:block absolute inset-0'>
        <div className='absolute h-[1010px] top-[-151px] left-1/2 transform -translate-x-1/2 w-[866px]'>
          <div className={styles.backgroundMap + ' w-full h-full opacity-10'} />
        </div>
      </div>

      <div className='relative z-10'>
        {/* 標題區域 */}
        <div className={`px-0 py-[60px] lg:pt-[200px] lg:pb-[120px] flex flex-col gap-[20px] lg:gap-[120px] items-center xl:aspect-[1920/692] xl:h-full xl:max-h-[692px] xl:sticky xl:top-0 xl:left-0 ${styles.titleBackground}`}>
          <h2
            className='inline-block font-family-noto-serif font-bold text-[32px] xl:text-[64px] xl:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] gradient-title-border'
          >
            典藏優勢
          </h2>

          <div className='content-stretch flex flex-col gap-2 lg:gap-6 items-center justify-center leading-[0] not-italic relative shrink-0 text-center w-full'>
            <div className='font-family-noto-serif font-semibold lg:font-bold min-w-full relative shrink-0 text-figma-primary-950 text-[18px] lg:text-[24px] lg:tracking-[12px] leading-[1.5] lg:leading-[1.2]'>
              機票｜住宿｜景點｜交通一站式安排
            </div>
            <div className='flex flex-col font-family-genseki justify-center relative shrink-0 text-figma-secondary-500 text-[16px] lg:text-[20px] w-full lg:w-[496px] leading-[1.2] lg:leading-[1.5]'>
              提升旅客安全 · 降低旅行風險
            </div>
          </div>
        </div>

        {/* 卡片區域 */}
        <div className='pb-[60px] lg:pb-[120px] px-3 lg:px-0'>
          <div className='lg:max-w-[1440px] lg:mx-auto'>
            <div className={`relative w-full ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'}`}>
              <div
                ref={trackRef}
                className={`${isMobile ? styles.trackMobile : styles.track} ${isDragging && isMobile ? 'cursor-grabbing' : isMobile ? 'cursor-grab' : ''
                  } ${isMobile ? 'justify-start' : 'justify-center'}`}
                style={isMobile ? {
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  userSelect: 'none',
                } : undefined}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {displayData.map((card) => (
                  <div
                    key={card.id}
                    className={`${styles.cardContainer} ${isMobile
                        ? 'w-[318px] flex-shrink-0'
                        : 'w-[522px] flex-shrink-0'
                      }`}
                  >
                    <AdvantageCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantage