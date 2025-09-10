'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>
  const [isFixed, setIsFixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isScrollingHorizontally = useRef(false)
  const maxScrollX = useRef(0)
  const hasBeenInDetectionArea = useRef(false) // 是否曾經進入過偵測範圍
  const hasLeftFarEnough = useRef(true) // 是否已經離開足夠遠（初始為 true 讓第一次可以觸發）

  // 確保首次載入時可以觸發
  useEffect(() => {
    hasLeftFarEnough.current = true
  }, [])

  const lockBodyScroll = useCallback(() => {
    document.body.style.height = '100vh'
  }, [])

  const unlockBodyScroll = useCallback(() => {
    document.body.style.height = ''
  }, [])

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
    const handleScroll = () => {
      if (!bookShelfRef.current || isScrollingHorizontally.current) return

      const rect = bookShelfRef.current.getBoundingClientRect()
      const isBottomAtViewport =
        Math.abs(rect.bottom - window.innerHeight) <= 50

      // 如果在偵測範圍內
      if (isBottomAtViewport) {
        // 如果還沒被鎖定，且沒有曾經進入過偵測範圍
        if (!isFixed && !hasBeenInDetectionArea.current) {
          // 首次進入或重新進入（已離開足夠遠）
          if (hasLeftFarEnough.current) {
            hasBeenInDetectionArea.current = true
            hasLeftFarEnough.current = false // 重置離開標記
            setIsFixed(true)
            lockBodyScroll()
            isScrollingHorizontally.current = true
            maxScrollX.current = calculateMaxScroll()
          }
        }
      } else {
        // 如果不在偵測範圍內
        const farFromDetection = rect.bottom > window.innerHeight + 100 // 離偵測範圍 100px 以上（往下滑）
        const farAboveDetection = rect.bottom < window.innerHeight - 100 // 離偵測範圍 100px 以上（往上滑）

        if (
          (farFromDetection || farAboveDetection) &&
          !hasLeftFarEnough.current
        ) {
          hasLeftFarEnough.current = true
        }

        // 如果曾經進入過偵測範圍，重置標記
        if (hasBeenInDetectionArea.current) {
          hasBeenInDetectionArea.current = false
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFixed, lockBodyScroll, calculateMaxScroll])

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      if (!isFixed) return

      event.preventDefault()
      event.stopPropagation()

      const delta = event.deltaY
      const scrollAmount = 0.03
      const newProgress =
        scrollProgress + (delta > 0 ? scrollAmount : -scrollAmount)

      if (newProgress <= 0) {
        setScrollProgress(0)
        updateBookPosition(0)
        setIsFixed(false)
        unlockBodyScroll()
        isScrollingHorizontally.current = false
        return
      }

      if (newProgress >= 1) {
        setScrollProgress(1)
        updateBookPosition(1)
        setIsFixed(false)
        unlockBodyScroll()
        isScrollingHorizontally.current = false
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
