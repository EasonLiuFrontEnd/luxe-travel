'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL_SCROLL_DISTANCE = 1000
const NOTE_TRAVEL_DISTANCE = 200
const TRIGGER_BUFFER = 100

export const useScrollDrivenAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const accumulatedScrollRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const containerPositionRef = useRef<{ top: number; bottom: number } | null>(null)
  
  const calculateNotePosition = useCallback((noteIndex: number, progress: number): number => {
    const stageStart = noteIndex * 0.2
    const stageEnd = (noteIndex + 1) * 0.2
    
    if (progress < stageStart) return 0
    if (progress >= stageEnd) return 100
    
    const stageProgress = (progress - stageStart) / 0.2
    return stageProgress * 100
  }, [])
  
  const updateNotePositions = useCallback((progress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    setScrollProgress(clampedProgress)
  }, [])
  
  const getNotePositions = useCallback((): number[] => {
    return Array.from({ length: 5 }, (_, index) =>
      calculateNotePosition(index, scrollProgress)
    )
  }, [calculateNotePosition, scrollProgress])
  
  const isInContainerArea = useCallback(() => {
    if (!containerPositionRef.current) return false
    
    const currentScrollY = window.scrollY
    const viewportHeight = window.innerHeight
    const { top, bottom } = containerPositionRef.current
    
    const containerTopInViewport = top <= (currentScrollY + viewportHeight)
    const containerBottomInViewport = bottom >= currentScrollY
    
    return containerTopInViewport && containerBottomInViewport
  }, [])
  
  const updateContainerPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const scrollTop = window.scrollY
      containerPositionRef.current = {
        top: rect.top + scrollTop,
        bottom: rect.bottom + scrollTop
      }
    }
  }, [])

  const checkScrollPosition = useCallback(() => {
    if (!containerPositionRef.current) return
    
    const currentScrollY = window.scrollY
    const viewportHeight = window.innerHeight
    const { top, bottom } = containerPositionRef.current
    
    const containerBottomInViewport = Math.abs(bottom - (currentScrollY + viewportHeight)) <= TRIGGER_BUFFER
    const containerTopInViewport = top <= (currentScrollY + viewportHeight * 0.5)
    
    if (containerBottomInViewport && !isAnimating && !isAnimationCompleted) {
      setIsAnimating(true)
      setScrollProgress(0)
      accumulatedScrollRef.current = 0
    } else if (containerTopInViewport && isAnimationCompleted && scrollProgress === 0) {
      setIsAnimationCompleted(false)
    }
  }, [isAnimating, isAnimationCompleted, scrollProgress])

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      checkScrollPosition()
    })
  }, [checkScrollPosition])
  
  const handleWheel = useCallback((event: WheelEvent) => {
    const scrollDelta = event.deltaY
    
    if (isAnimationCompleted && scrollDelta < 0 && isInContainerArea()) {
      setIsAnimationCompleted(false)
      setIsAnimating(true)
      accumulatedScrollRef.current = TOTAL_SCROLL_DISTANCE
      document.body.style.overflowY = 'scroll'
    }
    
    if (!isAnimating) return
    
    event.preventDefault()
    event.stopPropagation()
    
    const newAccumulated = Math.max(0, Math.min(TOTAL_SCROLL_DISTANCE, accumulatedScrollRef.current + scrollDelta))
    accumulatedScrollRef.current = newAccumulated
    
    const newProgress = newAccumulated / TOTAL_SCROLL_DISTANCE
    
    if (newProgress <= 0) {
      setScrollProgress(0)
      updateNotePositions(0)
      setIsAnimating(false)
      document.body.style.overflowY = 'auto'
      return
    }
    
    if (newProgress >= 1) {
      setScrollProgress(1)
      updateNotePositions(1)
      setIsAnimationCompleted(true)
      setIsAnimating(false)
      document.body.style.overflowY = 'auto'
      return
    }
    
    updateNotePositions(newProgress)
  }, [isAnimating, isAnimationCompleted, updateNotePositions, isInContainerArea])
  
  useEffect(() => {
    updateContainerPosition()
  }, [updateContainerPosition])

  useEffect(() => {
    if (!isAnimating && !isAnimationCompleted) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimating, isAnimationCompleted, handleScroll])
  
  useEffect(() => {
    if (isAnimating || isAnimationCompleted) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isAnimating, isAnimationCompleted, handleWheel])
  
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (isAnimating) {
      document.body.style.overflowY = 'scroll'
      document.addEventListener('scroll', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
    } else {
      document.body.style.overflowY = 'auto'
      document.removeEventListener('scroll', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
    }
    
    return () => {
      document.removeEventListener('scroll', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [isAnimating])
  
  useEffect(() => {
    const handleResize = () => {
      updateContainerPosition()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflowY = 'auto'
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [updateContainerPosition])
  
  const getNoteTransformY = useCallback((position: number): number => {
    return NOTE_TRAVEL_DISTANCE * (1 - position / 100)
  }, [])
  
  return {
    containerRef,
    notePositions: getNotePositions(),
    scrollProgress,
    isAnimationComplete: scrollProgress >= 1,
    isScrollLocked: isAnimating,
    getNoteTransformY
  }
}