'use client'

import React, { useState, useCallback, useMemo } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent & {
  collectionRef?: React.RefObject<HTMLDivElement>
}

const Advantage = ({ className, collectionRef }: TAdvantageProps) => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const backgroundRef = React.useRef<HTMLDivElement>(null)
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
      const newIsMobile = window.innerWidth < 1280
      console.log('📱 響應式檢查:', {
        windowWidth: window.innerWidth,
        isMobile: newIsMobile,
        breakpoint: 1280
      })
      setIsMobile(newIsMobile)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])


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
        className={`px-3 xl:px-0 xl:w-full pb-[60px] xl:pb-0 w-full xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0 xl:bottom-0`}
      >
        <div
          ref={trackRef}
          data-track="advantage-track"
          className={`${isMobile ? styles.trackMobile : styles.track}`}
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
