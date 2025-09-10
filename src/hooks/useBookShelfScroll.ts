'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const [isFixed, setIsFixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isScrollingHorizontally = useRef(false)
  const maxScrollX = useRef(0)
  const hasBeenInDetectionArea = useRef(false)
  const hasLeftFarEnough = useRef(true)
  
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
    const containerWidth = trackRef.current.parentElement?.offsetWidth || trackRef.current.offsetWidth
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
      const isBottomAtViewport = Math.abs(rect.bottom - window.innerHeight) <= 50
      
      if (isBottomAtViewport) {
        if (!isFixed && !hasBeenInDetectionArea.current) {
          if (hasLeftFarEnough.current) {
            hasBeenInDetectionArea.current = true
            hasLeftFarEnough.current = false
            setIsFixed(true)
            lockBodyScroll()
            isScrollingHorizontally.current = true
            maxScrollX.current = calculateMaxScroll()
          }
        }
      } else {
        const farFromDetection = rect.bottom > window.innerHeight + 100
        const farAboveDetection = rect.bottom < window.innerHeight - 100
        
        if ((farFromDetection || farAboveDetection) && !hasLeftFarEnough.current) {
          hasLeftFarEnough.current = true
        }
        
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
       const newProgress = scrollProgress + (delta > 0 ? scrollAmount : -scrollAmount)
       
       
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
    scrollProgress
  }
}