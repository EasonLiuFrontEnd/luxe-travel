'use client'

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import '@/styles/components.css'

type TAdvantageProps = {
  collectionRef?: React.RefObject<HTMLDivElement>
  className?: string
}

const Advantage = ({ className }: TAdvantageProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragState, setIsDragState] = useState(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)

  const { query: advantagesQuery } = useAdvantages()
  const { data: advantagesData, isLoading: isAdvantagesLoading } =
    advantagesQuery

  const displayData = useMemo(() => {
    if (isAdvantagesLoading) {
      return []
    }

    return transformAdvantageData(advantagesData || [])
  }, [advantagesData, isAdvantagesLoading])

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!trackRef.current) return

    isDragging.current = true
    setIsDragState(true)
    dragStartX.current = event.clientX
    dragStartScrollLeft.current = trackRef.current.scrollLeft
    event.preventDefault()
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (
      typeof window === 'undefined' ||
      !isDragging.current ||
      !trackRef.current
    )
      return

    const deltaX = event.clientX - dragStartX.current
    const newScrollLeft = dragStartScrollLeft.current - deltaX

    trackRef.current.scrollLeft = Math.max(
      0,
      Math.min(
        trackRef.current.scrollWidth - trackRef.current.offsetWidth,
        newScrollLeft,
      ),
    )
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
    setIsDragState(false)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <section
      className={`bg-figma-secondary-100 relative overflow-x-auto ${className || ''}`}
    >
      <div
        className={`${styles.backgroundMap} relative pt-[60px] xl:pt-[200px] px-0 pb-[60px] xl:pb-[120px] flex flex-col gap-[20px] xl:gap-[120px] items-center`}
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

        <div className='w-full px-4 xl:px-0'>
          <div
            ref={trackRef}
            data-track='advantage-track'
            className={styles.track}
            style={{
              cursor: isDragState ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
          >
            {displayData.map((card, index) => {
              return (
                <div
                  key={card.id}
                  data-card-index={index}
                  className={`${styles.cardContainer} flex-shrink-0 relative ${styles.cardWidth}`}
                >
                  <div className={styles.cornerMaskLeft} />
                  <AdvantageCard card={card} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advantage
