'use client'

import { useRef } from 'react'

export const useScrollDrivenAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return {
    containerRef,
    notePositions: [100, 100, 100, 100, 100],
    scrollProgress: 1,
    isAnimationComplete: true,
    isScrollLocked: false,
    getNoteTransformY: () => 0,
  }
}
