'use client'

import { useCallback, useRef, useState, useEffect, useMemo } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useScrollLock } from '@/hooks/useScrollLock'

const THRESHOLD_ARRAY = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const maxScrollX = useRef(0)

  useScrollLock(isFixed && !isMobile)

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

    trackRef.current.style.setProperty(
      '--scroll-progress',
      clampedProgress.toString(),
    )
    trackRef.current.style.setProperty(
      '--max-scroll-x',
      `${maxScrollX.current}px`,
    )
    trackRef.current.style.transform = `translateX(calc(-1 * var(--scroll-progress) * var(--max-scroll-x)))`
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

  const titleElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const title = document.querySelector(
      '[data-bookshelf-title="true"]',
    ) as HTMLElement
    titleElement.current = title
  }, [])

  const titleIntersectCallback = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (isMobile) return

      const isTitleAtTop = entry.boundingClientRect.top <= 50

      if (isTitleAtTop && !isFixed) {
        setIsFixed(true)
        maxScrollX.current = calculateMaxScroll()
      }
    },
    [isMobile, isFixed, calculateMaxScroll],
  )

  const titleLeaveCallback = useCallback(() => {
    if (isMobile) return

    if (isFixed && scrollProgress === 0) {
      setIsFixed(false)
    }
  }, [isMobile, isFixed, scrollProgress])

  const titleObserverOptions = useMemo(
    () => ({
      threshold: THRESHOLD_ARRAY,
      rootMargin: '50px 0px 0px 0px',
      onIntersect: titleIntersectCallback,
      onLeave: titleLeaveCallback,
    }),
    [titleIntersectCallback, titleLeaveCallback],
  )

  useIntersectionObserver(titleElement, titleObserverOptions)

  const bookShelfIntersectCallback = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (isMobile || titleElement.current) return

      const isBottomAtViewport =
        Math.abs(entry.boundingClientRect.bottom - window.innerHeight) <= 50

      if (isBottomAtViewport && !isFixed) {
        setIsFixed(true)
        maxScrollX.current = calculateMaxScroll()
      }
    },
    [isMobile, isFixed, calculateMaxScroll],
  )

  const bookShelfLeaveCallback = useCallback(() => {
    if (isMobile || titleElement.current) return

    if (isFixed && scrollProgress === 0) {
      setIsFixed(false)
    }
  }, [isMobile, isFixed, scrollProgress])

  const bookShelfObserverOptions = useMemo(
    () => ({
      threshold: THRESHOLD_ARRAY,
      rootMargin: '0px 0px 50px 0px',
      onIntersect: bookShelfIntersectCallback,
      onLeave: bookShelfLeaveCallback,
    }),
    [bookShelfIntersectCallback, bookShelfLeaveCallback],
  )

  useIntersectionObserver(bookShelfRef, bookShelfObserverOptions)

  const updateBookPositionRef = useRef(updateBookPosition)
  updateBookPositionRef.current = updateBookPosition

  useEffect(() => {
    let currentProgress = scrollProgress

    const wheelHandler = (event: WheelEvent) => {
      if (!isFixed || isMobile) return

      const delta = event.deltaY
      const pixelScrollAmount = 30
      const progressIncrement =
        maxScrollX.current > 0 ? pixelScrollAmount / maxScrollX.current : 0.03
      const newProgress =
        currentProgress + (delta > 0 ? progressIncrement : -progressIncrement)

      if (newProgress <= 0) {
        currentProgress = 0
        updateBookPositionRef.current(0)
        setIsFixed(false)
        return
      }

      if (newProgress >= 1) {
        currentProgress = 1
        updateBookPositionRef.current(1)
        setIsFixed(false)
        return
      }

      currentProgress = newProgress
      updateBookPositionRef.current(newProgress)
    }

    if (isFixed && !isMobile) {
      window.addEventListener('wheel', wheelHandler, { passive: true })
    }

    return () => {
      window.removeEventListener('wheel', wheelHandler)
    }
  }, [isFixed, isMobile, scrollProgress])

  return {
    bookShelfRef,
    trackRef,
    isFixed,
    scrollProgress,
    isMobile,
  }
}
