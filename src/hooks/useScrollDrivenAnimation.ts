'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL_SCROLL_DISTANCE = 1000
const NOTE_TRAVEL_DISTANCE = 200

type TAnimationState = {
  isIntersecting: boolean
  scrollDirection: 'up' | 'down' | null
  isAnimating: boolean
  animationProgress: number
  canScroll: boolean
}

export const useScrollDrivenAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const accumulatedScrollRef = useRef(0)
  const lastScrollYRef = useRef(0)
  
  const [state, setState] = useState<TAnimationState>({
    isIntersecting: false,
    scrollDirection: null,
    isAnimating: false,
    animationProgress: 0,
    canScroll: true
  })

  const calculateNotePosition = useCallback((noteIndex: number, progress: number): number => {
    const stageStart = noteIndex * 0.2
    const stageEnd = (noteIndex + 1) * 0.2
    
    if (progress < stageStart) return 0
    if (progress >= stageEnd) return 100
    
    const stageProgress = (progress - stageStart) / 0.2
    return stageProgress * 100
  }, [])

  const getNotePositions = useCallback((): number[] => {
    return Array.from({ length: 5 }, (_, index) =>
      calculateNotePosition(index, state.animationProgress)
    )
  }, [calculateNotePosition, state.animationProgress])

  const getNoteTransformY = useCallback((position: number): number => {
    if (state.scrollDirection === 'down') {
      return NOTE_TRAVEL_DISTANCE * (1 - position / 100)
    } else {
      return NOTE_TRAVEL_DISTANCE * ((100 - position) / 100)
    }
  }, [state.scrollDirection])

  const updateAnimationProgress = useCallback((deltaY: number) => {
    const currentAccumulated = accumulatedScrollRef.current + deltaY
    const clampedAccumulated = Math.max(0, Math.min(TOTAL_SCROLL_DISTANCE, currentAccumulated))
    accumulatedScrollRef.current = clampedAccumulated
    
    const newProgress = clampedAccumulated / TOTAL_SCROLL_DISTANCE
    
    setState(prev => ({
      ...prev,
      animationProgress: newProgress,
      canScroll: newProgress >= 1 || newProgress <= 0
    }))
  }, [])

  const handleWheel = useCallback((event: WheelEvent) => {
    if (!state.isIntersecting || state.canScroll) return
    
    event.preventDefault()
    event.stopPropagation()
    
    updateAnimationProgress(event.deltaY)
  }, [state.isIntersecting, state.canScroll, updateAnimationProgress])

  const detectScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY
    const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up'
    lastScrollYRef.current = currentScrollY
    return direction
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const direction = detectScrollDirection()
        
        if (entry.isIntersecting && !state.isAnimating) {
          setState(prev => ({
            ...prev,
            isIntersecting: true,
            scrollDirection: direction,
            isAnimating: true,
            animationProgress: direction === 'down' ? 0 : 1,
            canScroll: false
          }))
          
          accumulatedScrollRef.current = direction === 'down' ? 0 : TOTAL_SCROLL_DISTANCE
        } else if (!entry.isIntersecting && state.isAnimating) {
          setState(prev => ({
            ...prev,
            isIntersecting: false,
            isAnimating: false,
            canScroll: true
          }))
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px'
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [detectScrollDirection, state.isAnimating])

  useEffect(() => {
    if (state.isAnimating && !state.canScroll) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [state.isAnimating, state.canScroll, handleWheel])

  return {
    containerRef,
    notePositions: getNotePositions(),
    scrollProgress: state.animationProgress,
    isAnimationComplete: state.animationProgress >= 1,
    isScrollLocked: !state.canScroll,
    getNoteTransformY
  }
}