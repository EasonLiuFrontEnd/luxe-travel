'use client'

import React, { useState, useCallback, useMemo } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import { useAdvantageScroll } from '@/hooks/useAdvantageScroll'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent & {
  collectionRef?: React.RefObject<HTMLDivElement>
}

const Advantage = ({ className, collectionRef }: TAdvantageProps) => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const { backgroundRef, isTrackVisible, isScrolling, isReverseAnimation, scrollDirection } = useAdvantageScroll({ collectionRef })
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
      setIsMobile(window.innerWidth < 1280)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
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
      className={`bg-figma-secondary-100 relative ${className || ''}`}
    >
      {/* 標題區域 */}
      <div
        ref={backgroundRef}
        className={`${styles.backgroundMap} relative xl:sticky xl:-top-[60px] pt-[60px] xl:pt-[200px] xl:left-0 px-0 pb-[60px] xl:pb-0 flex flex-col gap-[20px] xl:gap-[120px] items-center xl:h-[100vh]`}
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
        className={`px-3 xl:px-0 xl:w-full pb-[60px] xl:pb-0 w-full relative ${!isMobile ? styles.containerOverflow : ''}`}
      >
        <div
          ref={trackRef}
          className={`${isMobile ? `${styles.trackMobile} ${styles.scrollContainer}` : styles.track} ${isDragging && isMobile
            ? 'cursor-grabbing'
            : isMobile
              ? 'cursor-grab'
              : ''
            } ${(() => {
              if (isMobile) return ''

              if (!isTrackVisible) {
                return isReverseAnimation ? styles.trackHiddenLeft : styles.trackHidden
              }

              // 根據動畫類型和滾動方向決定動畫類別
              let animationClass = ''

              if (isReverseAnimation) {
                // 從下往上進入的反向動畫
                if (scrollDirection === 'down') {
                  // 向下滾動時倒退到左邊
                  animationClass = isScrolling ? styles.trackSlideBackToLeft : styles.trackSlideBackToLeftPaused
                } else {
                  // 向上滾動時正常的左到右動畫
                  animationClass = isScrolling ? styles.trackSlideInReverse : styles.trackSlideInReversePaused
                }
              } else {
                // 從上往下進入的正向動畫
                if (scrollDirection === 'up') {
                  // 向上滾動時倒退到右邊
                  animationClass = isScrolling ? styles.trackSlideBackToRight : styles.trackSlideBackToRightPaused
                } else {
                  // 向下滾動時正常的右到左動畫
                  animationClass = isScrolling ? styles.trackSlideIn : styles.trackSlideInPaused
                }
              }


              return animationClass
            })()}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {displayData.map((card, index) => {
            return (
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
            )
          })}
        </div>
      </div>

    </section>
  )
}

export default Advantage
