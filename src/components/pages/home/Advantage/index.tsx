'use client'

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import { useScrollLock } from '@/hooks/useScrollLock'
import '@/styles/components.css'

type TAdvantageProps = {
  collectionRef?: React.RefObject<HTMLDivElement>
  className?: string
}

const Advantage = ({ className }: TAdvantageProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInDetectionZone, setIsInDetectionZone] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(
    null,
  )
  const [translateX, setTranslateX] = useState(0)
  const [isDragState, setIsDragState] = useState(false)
  const lastScrollY = useRef(0)
  const entryDirection = useRef<'from-top' | 'from-bottom' | null>(null)
  const hasCompletedHorizontalScroll = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)

  const { query: advantagesQuery } = useAdvantages()
  const { data: advantagesData, isLoading: isAdvantagesLoading } =
    advantagesQuery

  useScrollLock(isInDetectionZone && !isMobile)

  const displayData = useMemo(() => {
    if (isAdvantagesLoading) {
      return []
    }

    return transformAdvantageData(advantagesData || [])
  }, [advantagesData, isAdvantagesLoading])

  useEffect(() => {
    const checkMobileLayout = () => {
      const newIsMobile = window.innerWidth < 1280
      setIsMobile(newIsMobile)
    }

    const setInitialPosition = () => {
      if (!backgroundRef.current) return

      const rect = backgroundRef.current.getBoundingClientRect()
      const isAboveViewport = rect.bottom <= 0
      const isBelowViewport = rect.top >= window.innerHeight

      if (isAboveViewport) {
        setTranslateX(window.innerWidth)
      } else if (isBelowViewport) {
        const trackWidth = trackRef.current?.scrollWidth || 0
        setTranslateX(-(window.innerWidth + trackWidth))
      } else {
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

  const handleDesktopScroll = useCallback(
    (event: WheelEvent) => {
      if (isMobile || !isInDetectionZone) return

      const delta = event.deltaY
      const currentDirection = delta > 0 ? 'down' : 'up'

      if (scrollDirection !== currentDirection) {
        setScrollDirection(currentDirection)
      }

      const moveAmount = delta * 2
      const trackWidth = trackRef.current?.scrollWidth || 0
      const maxLeft = -trackWidth
      const maxRight = window.innerWidth

      setTranslateX((prev) => {
        const newX = prev - moveAmount
        const clampedX = Math.max(maxLeft, Math.min(maxRight, newX))

        const hasReachedEndFromTop =
          entryDirection.current === 'from-top' &&
          clampedX === maxLeft &&
          currentDirection === 'down'
        const hasReachedEndFromBottom =
          entryDirection.current === 'from-bottom' &&
          clampedX === maxRight &&
          currentDirection === 'up'
        const hasReturnedToStartFromTop =
          entryDirection.current === 'from-top' &&
          clampedX === maxRight &&
          currentDirection === 'up'
        const hasReturnedToStartFromBottom =
          entryDirection.current === 'from-bottom' &&
          clampedX === maxLeft &&
          currentDirection === 'down'

        const shouldRelease =
          hasReachedEndFromTop ||
          hasReachedEndFromBottom ||
          hasReturnedToStartFromTop ||
          hasReturnedToStartFromBottom

        if (shouldRelease) {
          hasCompletedHorizontalScroll.current = true
          setIsInDetectionZone(false)
          setScrollDirection(null)
          entryDirection.current = null
          window.scrollBy(0, delta)
          return prev
        }

        return clampedX
      })
    },
    [isMobile, isInDetectionZone, scrollDirection],
  )

  const checkDetectionZone = useCallback(() => {
    if (isMobile || !backgroundRef.current) return

    const rect = backgroundRef.current.getBoundingClientRect()
    const currentScrollY = window.scrollY
    const wasInZone = isInDetectionZone

    const isScrollingDown = currentScrollY > lastScrollY.current
    const isEnteringFromTop = rect.top <= 0 && rect.bottom > 0
    const isEnteringFromBottom =
      rect.bottom >= window.innerHeight * 0.7 && rect.top < window.innerHeight

    const inZone = isScrollingDown ? isEnteringFromTop : isEnteringFromBottom

    if (inZone && !wasInZone && !hasCompletedHorizontalScroll.current) {
      const direction =
        currentScrollY > lastScrollY.current ? 'from-top' : 'from-bottom'
      entryDirection.current = direction

      setIsInDetectionZone(true)
      setScrollDirection(direction === 'from-top' ? 'down' : 'up')

      if (direction === 'from-top') {
        setTranslateX(window.innerWidth)
      } else {
        const trackWidth = trackRef.current?.scrollWidth || 0
        setTranslateX(-(window.innerWidth + trackWidth))
      }
    } else if (!inZone) {
      if (hasCompletedHorizontalScroll.current || wasInZone) {
        setIsInDetectionZone(false)
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

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!isMobile || !trackRef.current) return

      isDragging.current = true
      setIsDragState(true)
      dragStartX.current = event.clientX
      dragStartScrollLeft.current = trackRef.current.scrollLeft
      event.preventDefault()
    },
    [isMobile],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (
        typeof window === 'undefined' ||
        !isMobile ||
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
    },
    [isMobile],
  )

  const handleMouseUp = useCallback(() => {
    if (!isMobile) return
    isDragging.current = false
    setIsDragState(false)
  }, [isMobile])

  useEffect(() => {
    if (typeof document === 'undefined' || !isMobile) return

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isMobile, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      checkDetectionZone()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleDesktopScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleDesktopScroll)
    }
  }, [isMobile, handleDesktopScroll, checkDetectionZone])

  return (
    <section
      className={`bg-figma-secondary-100 relative xl:overflow-x-hidden ${className || ''}`}
    >
      <div
        ref={backgroundRef}
        className={`${styles.backgroundMap} relative pt-[60px] xl:pt-[200px] px-0 pb-[60px] xl:pb-0 flex flex-col gap-[20px] xl:gap-[120px] items-center xl:h-[100vh]`}
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

      <div className='px-4 xl:px-0 pb-[60px] xl:pb-0 xl:absolute xl:top-[45vh]'>
        <div
          ref={trackRef}
          data-track='advantage-track'
          className={`${
            isMobile
              ? styles.trackMobile
              : `${styles.track} ${isInDetectionZone ? styles.trackNoTransition : ''}`
          }`}
          style={
            !isMobile
              ? ({
                  '--translate-x': `${translateX}px`,
                  transform: `translateX(var(--translate-x))`,
                } as React.CSSProperties)
              : {
                  cursor: isDragState ? 'grabbing' : 'grab',
                }
          }
          onMouseDown={isMobile ? handleMouseDown : undefined}
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
    </section>
  )
}

export default Advantage
