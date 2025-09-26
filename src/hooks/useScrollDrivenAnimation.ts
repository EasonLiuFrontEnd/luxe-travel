'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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

  const calculateNotePosition = useCallback(
    (noteIndex: number, progress: number): number => {
      const stageStart = noteIndex * 0.2
      const stageEnd = (noteIndex + 1) * 0.2

      if (progress < stageStart) return 0
      if (progress >= stageEnd) return 100

      const stageProgress = (progress - stageStart) / 0.2
      return stageProgress * 100
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
    const currentAccumulated = accumulatedScrollRef.current + deltaY
    const clampedAccumulated = Math.max(
      0,
      Math.min(TOTAL_SCROLL_DISTANCE, currentAccumulated),
    )
    accumulatedScrollRef.current = clampedAccumulated

    const newProgress = clampedAccumulated / TOTAL_SCROLL_DISTANCE

    setState((prev) => {
      let newPhase = prev.animationPhase
      let canScroll = false

      if (prev.animationPhase === 'appearing' && newProgress >= 1) {
        newPhase = 'appeared'
        canScroll = true
      } else if (prev.animationPhase === 'disappearing' && newProgress <= 0) {
        newPhase = 'disappeared'
        canScroll = true
      } else if (
        prev.animationPhase === 'appearing' ||
        prev.animationPhase === 'disappearing'
      ) {
        canScroll = false
      }

      return {
        ...prev,
        animationProgress: newProgress,
        animationPhase: newPhase,
        canScroll,
      }
    })
  }, [])

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!state.isIntersecting) return

      const currentDirection = event.deltaY > 0 ? 'down' : 'up'

      if (state.animationPhase === 'appearing') {
        if (state.entryDirection === 'down' && currentDirection === 'up') {
          // 出現動畫進行中，反方向滾動，切換為消失動畫
          event.preventDefault()
          event.stopPropagation()
          setState((prev) => ({
            ...prev,
            scrollDirection: 'up',
            animationPhase: 'disappearing',
          }))
          // 根據當前進度反轉 accumulatedScrollRef
          accumulatedScrollRef.current =
            TOTAL_SCROLL_DISTANCE - accumulatedScrollRef.current
          return
        }
      } else if (state.animationPhase === 'disappearing') {
        if (state.entryDirection === 'up' && currentDirection === 'down') {
          // 消失動畫進行中，反方向滾動，切換為出現動畫
          event.preventDefault()
          event.stopPropagation()
          setState((prev) => ({
            ...prev,
            scrollDirection: 'down',
            animationPhase: 'appearing',
          }))
          // 根據當前進度反轉 accumulatedScrollRef
          accumulatedScrollRef.current =
            TOTAL_SCROLL_DISTANCE - accumulatedScrollRef.current
          return
        }
      } else if (state.animationPhase === 'appeared') {
        if (state.entryDirection === 'down' && currentDirection === 'up') {
          event.preventDefault()
          event.stopPropagation()
          setState((prev) => ({
            ...prev,
            scrollDirection: 'up',
            animationPhase: 'disappearing',
            canScroll: false,
          }))
          accumulatedScrollRef.current = TOTAL_SCROLL_DISTANCE
          return
        }
      } else if (state.animationPhase === 'disappeared') {
        if (state.entryDirection === 'up' && currentDirection === 'down') {
          event.preventDefault()
          event.stopPropagation()
          setState((prev) => ({
            ...prev,
            scrollDirection: 'down',
            animationPhase: 'appearing',
            canScroll: false,
          }))
          accumulatedScrollRef.current = 0
          return
        }
      }

      if (!state.canScroll) {
        event.preventDefault()
        event.stopPropagation()
        updateAnimationProgress(event.deltaY)
      }
    },
    [
      state.isIntersecting,
      state.canScroll,
      state.animationPhase,
      state.entryDirection,
      updateAnimationProgress,
    ],
  )

  const detectScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY
    const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up'
    lastScrollYRef.current = currentScrollY
    return direction
  }, [])

  useEffect(() => {
    if (!containerRef.current || isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const direction = detectScrollDirection()

        if (entry.isIntersecting && state.animationPhase === 'idle') {
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

            accumulatedScrollRef.current =
              direction === 'down' ? 0 : TOTAL_SCROLL_DISTANCE

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
        } else if (
          !entry.isIntersecting &&
          (state.animationPhase === 'appeared' ||
            state.animationPhase === 'disappeared')
        ) {
          setState((prev) => ({
            ...prev,
            isIntersecting: false,
            animationPhase: 'idle',
            canScroll: true,
            entryDirection: null,
          }))
        }
      },
      {
        threshold: 1,
        rootMargin: '-30% 0px -30% 0px',
      },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [
    detectScrollDirection,
    state.animationPhase,
    state.isInitialLoad,
    isMobile,
  ])

  useEffect(() => {
    if (state.isIntersecting && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [state.isIntersecting, handleWheel, isMobile])

  useEffect(() => {
    if (state.isInitialLoad && containerRef.current && !isMobile) {
      const h2Rect = containerRef.current.getBoundingClientRect()
      const isScrolledPast = h2Rect.top < 0

      if (isScrolledPast) {
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

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (state.isInitialLoad) {
        setState((prev) => ({
          ...prev,
          isInitialLoad: false,
        }))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [state.isInitialLoad, isMobile])

  // 行動裝置直接返回靜態狀態，無動畫
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
