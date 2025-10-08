'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollLock } from '@/hooks/useScrollLock'

const TOTAL_SCROLL_DISTANCE = 1000
const NOTE_TRAVEL_DISTANCE = 200

type TAnimationPhase =
  | 'idle'
  | 'appearing'
  | 'appeared'
  | 'disappearing'
  | 'disappeared'

type TAnimationState = {
  isIntersecting: boolean
  scrollDirection: 'up' | 'down' | null
  animationPhase: TAnimationPhase
  animationProgress: number
  canScroll: boolean
  isInitialLoad: boolean
  entryDirection: 'up' | 'down' | null
}

export const useScrollDrivenAnimation = () => {
  const { isMobile } = useMediaQuery()
  const containerRef = useRef<HTMLDivElement>(null)
  const accumulatedScrollRef = useRef(0)
  const lastScrollYRef = useRef(0)

  const [state, setState] = useState<TAnimationState>({
    isIntersecting: false,
    scrollDirection: null,
    animationPhase: 'idle',
    animationProgress: 0,
    canScroll: true,
    isInitialLoad: true,
    entryDirection: null,
  })

  useScrollLock(!state.canScroll && state.isIntersecting && !isMobile)

  const calculateNotePosition = useCallback(
    (noteIndex: number, progress: number): number => {
      const stageStart = noteIndex * 0.2
      const stageEnd = (noteIndex + 1) * 0.2

      if (progress < stageStart) return 0
      if (progress >= stageEnd) return 100

      const stageProgress = (progress - stageStart) / 0.2
      const easedProgress = stageProgress * stageProgress * (3 - 2 * stageProgress)
      return easedProgress * 100
    },
    [],
  )

  const getNotePositions = useCallback((): number[] => {
    return Array.from({ length: 5 }, (_, index) =>
      calculateNotePosition(index, state.animationProgress),
    )
  }, [calculateNotePosition, state.animationProgress])

  const getNoteTransformY = useCallback(
    (position: number): number => {
      if (state.scrollDirection === 'down') {
        return NOTE_TRAVEL_DISTANCE * (1 - position / 100)
      } else {
        return NOTE_TRAVEL_DISTANCE * ((100 - position) / 100)
      }
    },
    [state.scrollDirection],
  )

  const updateAnimationProgress = useCallback((deltaY: number) => {
    const sensitivity = 0.8
    const adjustedDeltaY = deltaY * sensitivity
    
    const currentAccumulated = accumulatedScrollRef.current + adjustedDeltaY
    const clampedAccumulated = Math.max(
      0,
      Math.min(TOTAL_SCROLL_DISTANCE, currentAccumulated),
    )
    accumulatedScrollRef.current = clampedAccumulated

    const newProgress = clampedAccumulated / TOTAL_SCROLL_DISTANCE

    setState((prev) => {
      let newPhase = prev.animationPhase
      let shouldRelease = false

      if (prev.animationPhase === 'appearing' && newProgress >= 1) {
        newPhase = 'appeared'
        shouldRelease = true
      } else if (prev.animationPhase === 'disappearing' && newProgress <= 0) {
        newPhase = 'disappeared'
        shouldRelease = true
      }

      return {
        ...prev,
        animationProgress: newProgress,
        animationPhase: newPhase,
        canScroll: newPhase === 'appeared' || newPhase === 'disappeared',
      }
    })
  }, [])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!state.isIntersecting) return

      if (state.animationPhase === 'appearing' || state.animationPhase === 'disappearing') {
        updateAnimationProgress(event.deltaY)
      }
    },
    [state.isIntersecting, state.animationPhase, updateAnimationProgress],
  )

  const detectScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY
    const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up'
    lastScrollYRef.current = currentScrollY
    return direction
  }, [])

  useEffect(() => {
    if (!containerRef.current || isMobile) return

    const handleScroll = () => {
      if (!containerRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const isContainerAtTop = Math.abs(containerRect.top) <= 100
      const direction = detectScrollDirection()

      if (isContainerAtTop && state.animationPhase === 'idle') {
        setState((prev) => {
          if (prev.isInitialLoad) {
            accumulatedScrollRef.current = TOTAL_SCROLL_DISTANCE
            return {
              ...prev,
              isIntersecting: true,
              scrollDirection: direction,
              animationPhase: 'appeared',
              animationProgress: 1,
              canScroll: true,
              isInitialLoad: false,
              entryDirection: 'down',
            }
          }

          const newPhase = direction === 'down' ? 'appearing' : 'disappearing'
          const newProgress = direction === 'down' ? 0 : 1
          accumulatedScrollRef.current = direction === 'down' ? 0 : TOTAL_SCROLL_DISTANCE

          return {
            ...prev,
            isIntersecting: true,
            scrollDirection: direction,
            animationPhase: newPhase,
            animationProgress: newProgress,
            canScroll: false,
            entryDirection: direction,
          }
        })
      } else if (!isContainerAtTop && state.animationPhase !== 'idle') {
        setState((prev) => ({
          ...prev,
          isIntersecting: false,
          animationPhase: 'idle',
          canScroll: true,
          entryDirection: null,
        }))
        accumulatedScrollRef.current = 0
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [
    detectScrollDirection,
    state.animationPhase,
    state.isInitialLoad,
    state.isIntersecting,
    isMobile,
  ])

  useEffect(() => {
    if (state.isIntersecting && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: true })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [state.isIntersecting, handleWheel, isMobile])


  useEffect(() => {
    if (state.isInitialLoad && containerRef.current && !isMobile) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const isContainerAtTop = Math.abs(containerRect.top) <= 50

      if (isContainerAtTop) {
        accumulatedScrollRef.current = TOTAL_SCROLL_DISTANCE
        setState((prev) => ({
          ...prev,
          animationPhase: 'appeared',
          animationProgress: 1,
          isInitialLoad: false,
          entryDirection: 'down',
          canScroll: true,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          isInitialLoad: false,
        }))
      }
    } else if (state.isInitialLoad && isMobile) {
      setState((prev) => ({
        ...prev,
        isInitialLoad: false,
      }))
    }
  }, [state.isInitialLoad, isMobile])

  if (isMobile) {
    return {
      containerRef,
      notePositions: [100, 100, 100, 100, 100],
      scrollProgress: 1,
      isAnimationComplete: true,
      isScrollLocked: false,
      getNoteTransformY: () => 0,
    }
  }

  return {
    containerRef,
    notePositions: getNotePositions(),
    scrollProgress: state.animationProgress,
    isAnimationComplete:
      state.animationPhase === 'appeared' ||
      state.animationPhase === 'disappeared',
    isScrollLocked: !state.canScroll,
    getNoteTransformY,
  }
}