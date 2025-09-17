'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
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

  useEffect(() => {
    const checkMobileLayout = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!bookShelfRef.current || isMobile) return

      const recommendationSection = document.querySelector(
        '.recommendation-section',
      ) as HTMLElement

      if (recommendationSection) {
        const recommendationRect = recommendationSection.getBoundingClientRect()
        const isRecommendationAtBottom =
          Math.abs(recommendationRect.top - window.innerHeight) <= 50

        if (isRecommendationAtBottom && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        } else if (
          !isRecommendationAtBottom &&
          isFixed &&
          scrollProgress === 0
        ) {
          setIsFixed(false)
        }
      } else {
        const rect = bookShelfRef.current.getBoundingClientRect()
        const isBottomAtViewport =
          Math.abs(rect.bottom - window.innerHeight) <= 50

        if (isBottomAtViewport && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        } else if (!isBottomAtViewport && isFixed && scrollProgress === 0) {
          setIsFixed(false)
        }
      }
    }

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFixed, scrollProgress, calculateMaxScroll, isMobile])

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      if (!isFixed || isMobile) return

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
        return
      }

      if (newProgress >= 1) {
        setScrollProgress(1)
        updateBookPosition(1)
        setIsFixed(false)
        return
      }

      updateBookPosition(newProgress)
    }

    if (isFixed && !isMobile) {
      window.addEventListener('wheel', wheelHandler, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', wheelHandler)
    }
  }, [isFixed, isMobile, scrollProgress, updateBookPosition])

  return {
    bookShelfRef,
    trackRef,
    isFixed,
    scrollProgress,
    isMobile,
  }
}
