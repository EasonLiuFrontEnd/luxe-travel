'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

type TBookShelfScrollHook = {
  bookShelfRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLDivElement>
  isHorizontalMode: boolean
}

export const useBookShelfScroll = (): TBookShelfScrollHook => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isHorizontalMode, setIsHorizontalMode] = useState(false)
  
  const bookShelfStartY = useRef(0)
  const maxHorizontalScroll = useRef(0)
  const horizontalProgress = useRef(0)
  const frozenScrollPosition = useRef(0)
  const exitCooldown = useRef(false)

  const calculateScrollArea = useCallback(() => {
    if (!bookShelfRef.current || !trackRef.current) return
    
    const bookShelf = bookShelfRef.current
    const track = trackRef.current
    const rect = bookShelf.getBoundingClientRect()
    const scrollTop = window.scrollY
    
    bookShelfStartY.current = rect.top + scrollTop - window.innerHeight + rect.height
    
    const trackWidth = track.scrollWidth
    const bookShelfWidth = bookShelf.clientWidth
    maxHorizontalScroll.current = Math.max(0, trackWidth - bookShelfWidth)
  }, [])

  const updateTrackPosition = useCallback(() => {
    if (!trackRef.current) return
    
    trackRef.current.style.transition = 'transform 0.1s ease-out'
    trackRef.current.style.transform = `translateX(-${horizontalProgress.current}px)`
  }, [])

  const handleWheel = useCallback((event: WheelEvent) => {
    const currentScrollY = window.scrollY
    const isInBookShelfArea = Math.abs(currentScrollY - bookShelfStartY.current) <= 100
    
    if (isInBookShelfArea && !isHorizontalMode && !exitCooldown.current) {
      event.preventDefault()
      setIsHorizontalMode(true)
      frozenScrollPosition.current = currentScrollY
      document.body.style.overflow = 'hidden'
      document.body.style.transition = 'all 0.3s ease'
    }
    
    if (isHorizontalMode) {
      event.preventDefault()
      
      const delta = event.deltaY
      const scrollSpeed = 3
      
      horizontalProgress.current += delta * scrollSpeed
      horizontalProgress.current = Math.max(0, Math.min(horizontalProgress.current, maxHorizontalScroll.current))
      
      updateTrackPosition()
      
      if ((horizontalProgress.current >= maxHorizontalScroll.current && delta > 0) || 
          (horizontalProgress.current <= 0 && delta < 0)) {
        setIsHorizontalMode(false)
        exitCooldown.current = true
        document.body.style.overflow = ''
        document.body.style.transition = ''
        
        setTimeout(() => {
          window.scrollTo({
            top: horizontalProgress.current >= maxHorizontalScroll.current 
              ? frozenScrollPosition.current + 150 
              : frozenScrollPosition.current - 150,
            behavior: 'smooth'
          })
          
          setTimeout(() => {
            exitCooldown.current = false
          }, 500)
        }, 50)
      }
    }
  }, [isHorizontalMode, updateTrackPosition])

  const handleResize = useCallback(() => {
    calculateScrollArea()
  }, [calculateScrollArea])

  useEffect(() => {
    calculateScrollArea()
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [handleWheel, handleResize, calculateScrollArea])

  return {
    bookShelfRef,
    trackRef,
    isHorizontalMode
  }
}