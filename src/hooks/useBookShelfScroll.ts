'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useScrollLock } from '@/hooks/useScrollLock'

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

  const titleElement = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    const title = document.querySelector('[data-bookshelf-title="true"]') as HTMLElement
    titleElement.current = title
  }, [])

  const { isIntersecting: isTitleIntersecting, boundingClientRect: titleRect } = useIntersectionObserver(
    titleElement,
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '50px 0px 0px 0px',
      onIntersect: (entry) => {
        if (isMobile) return
        
        const isTitleAtTop = entry.boundingClientRect.top <= 50
        
        if (isTitleAtTop && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        }
      },
      onLeave: (entry) => {
        if (isMobile) return
        
        if (isFixed && scrollProgress === 0) {
          setIsFixed(false)
        }
      }
    }
  )

  const { isIntersecting: isBottomIntersecting, boundingClientRect: bottomRect } = useIntersectionObserver(
    bookShelfRef,
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '0px 0px 50px 0px',
      onIntersect: (entry) => {
        if (isMobile || titleElement.current) return
        
        const isBottomAtViewport = Math.abs(entry.boundingClientRect.bottom - window.innerHeight) <= 50
        
        if (isBottomAtViewport && !isFixed) {
          setIsFixed(true)
          maxScrollX.current = calculateMaxScroll()
        }
      },
      onLeave: (entry) => {
        if (isMobile || titleElement.current) return
        
        if (isFixed && scrollProgress === 0) {
          setIsFixed(false)
        }
      }
    }
  )

  useEffect(() => {
    const wheelHandler = (event: WheelEvent) => {
      if (!isFixed || isMobile) return

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
      window.addEventListener('wheel', wheelHandler, { passive: true })
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
