'use client'

import { useEffect, useState, useCallback } from 'react'

interface ScrollbarDimensions {
  scrollbarWidth: number
  viewportWidth: number
  contentWidth: number
}

export const useScrollbarWidth = (): ScrollbarDimensions => {
  const [dimensions, setDimensions] = useState<ScrollbarDimensions>({
    scrollbarWidth: 0,
    viewportWidth: 0,
    contentWidth: 0,
  })

  const calculateDimensions = useCallback((): ScrollbarDimensions => {
    if (typeof window === 'undefined') {
      return { scrollbarWidth: 0, viewportWidth: 0, contentWidth: 0 }
    }

    const windowWidth = window.innerWidth
    const documentWidth = document.documentElement.clientWidth
    const scrollbarWidthValue = windowWidth - documentWidth

    return {
      scrollbarWidth: scrollbarWidthValue,
      viewportWidth: windowWidth,
      contentWidth: documentWidth,
    }
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      const newDimensions = calculateDimensions()
      setDimensions(newDimensions)
    }

    updateDimensions()

    const handleResize = () => {
      updateDimensions()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateDimensions])

  return dimensions
}