'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>
  const [isFixed, setIsFixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const maxScrollX = useRef(0)

  const calculateMaxScroll = useCallback(() => {
    if (!trackRef.current) return 0
    const trackWidth = trackRef.current.scrollWidth
    const containerWidth =
      trackRef.current.parentElement?.offsetWidth ||
      trackRef.current.offsetWidth
    return Math.max(0, trackWidth - containerWidth)
  }, [])

  const updateBookPosition = useCallback((progress: number) => {
    if (!trackRef.current) return

    const clampedProgress = Math.max(0, Math.min(1, progress))
    const translateX = -clampedProgress * maxScrollX.current

    trackRef.current.style.transform = `translateX(${translateX}px)`
    setScrollProgress(clampedProgress)
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      ;(e.target as any)._startX = touch.clientX
      ;(e.target as any)._startY = touch.clientY
    }
  }, [])

  const preventVerticalScroll = useCallback(
    (e: Event) => {
      if (e.type === 'scroll') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if (e.type === 'touchmove' && isFixed) {
        const touchEvent = e as TouchEvent
        const touch = touchEvent.touches[0]
        if (touch) {
          const startY = (touchEvent.target as any)._startY || touch.clientY
          const deltaY = touch.clientY - startY

          const pixelScrollAmount = 30
          const progressIncrement =
            maxScrollX.current > 0
              ? pixelScrollAmount / maxScrollX.current
              : 0.03
          const newProgress =
            scrollProgress +
            (deltaY > 0 ? -progressIncrement : progressIncrement)

          if (newProgress <= 0) {
            setScrollProgress(0)
            updateBookPosition(0)
            setIsFixed(false)
            unlockBodyScroll()
          } else if (newProgress >= 1) {
            setScrollProgress(1)
            updateBookPosition(1)
            setIsFixed(false)
            unlockBodyScroll()
          } else {
            updateBookPosition(newProgress)
          }

          ;(touchEvent.target as any)._startY = touch.clientY
        }

        e.preventDefault()
        e.stopPropagation()
        return false
      }
    },
    [isFixed, scrollProgress, updateBookPosition],
  )

  const unlockBodyScroll = useCallback(() => {
    window.removeEventListener('scroll', preventVerticalScroll)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', preventVerticalScroll)
  }, [preventVerticalScroll, handleTouchStart])

  const lockBodyScroll = useCallback(() => {
    window.addEventListener('scroll', preventVerticalScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', preventVerticalScroll, {
      passive: false,
    })
  }, [preventVerticalScroll, handleTouchStart])

  useEffect(() => {
    const handleScroll = () => {
      if (!bookShelfRef.current) return

      // 找到 RecommendationSection
      const recommendationSection = document.querySelector('.recommendation-section') as HTMLElement
      
      if (recommendationSection) {
        // 檢查 RecommendationSection 頂部是否碰到視窗底部
        const recommendationRect = recommendationSection.getBoundingClientRect()
        const isRecommendationAtBottom = Math.abs(recommendationRect.top - window.innerHeight) <= 50

        if (isRecommendationAtBottom && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        } else if (!isRecommendationAtBottom && isFixed && scrollProgress === 0) {
          setIsFixed(false)
          unlockBodyScroll()
        }
      } else {
        // 降級方案：如果找不到 RecommendationSection，使用原本的邏輯
        const rect = bookShelfRef.current.getBoundingClientRect()
        const isBottomAtViewport = Math.abs(rect.bottom - window.innerHeight) <= 50

        if (isBottomAtViewport && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        } else if (!isBottomAtViewport && isFixed && scrollProgress === 0) {
          setIsFixed(false)
          unlockBodyScroll()
        }
      }
    }

    if (!isFixed) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFixed, scrollProgress, calculateMaxScroll, unlockBodyScroll])

  useEffect(() => {
    if (isFixed) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  }, [isFixed, lockBodyScroll, unlockBodyScroll])

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      if (!isFixed) return

      event.preventDefault()
      event.stopPropagation()

      const delta = event.deltaY
      const pixelScrollAmount = 30
      const progressIncrement =
        maxScrollX.current > 0 ? pixelScrollAmount / maxScrollX.current : 0.03
      const newProgress =
        scrollProgress + (delta > 0 ? progressIncrement : -progressIncrement)

      if (newProgress <= 0) {
        setScrollProgress(0)
        updateBookPosition(0)
        setIsFixed(false)
        unlockBodyScroll()
        return
      }

      if (newProgress >= 1) {
        setScrollProgress(1)
        updateBookPosition(1)
        setIsFixed(false)
        unlockBodyScroll()
        return
      }

      updateBookPosition(newProgress)
    }

    if (isFixed) {
      window.addEventListener('wheel', wheelHandler, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', wheelHandler)
    }
  }, [isFixed, scrollProgress, updateBookPosition, unlockBodyScroll])

  useEffect(() => {
    return () => {
      unlockBodyScroll()
    }
  }, [unlockBodyScroll])

  return {
    bookShelfRef,
    trackRef,
    isFixed,
    scrollProgress,
  }
}
