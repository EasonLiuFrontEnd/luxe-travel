import { useState, useEffect, useCallback, useRef } from 'react'
import { APP_CONFIG } from '@/lib/config'

type TScrollState = {
  scrollY: number
  isScrolling: boolean
}

export const useThrottledScroll = (): TScrollState => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const frameId = useRef<number | null>(null)
  const lastScrollTime = useRef(0)

  const handleScroll = useCallback(() => {
    const now = Date.now()

    if (now - lastScrollTime.current < APP_CONFIG.SCROLL.THROTTLE_DELAY) {
      return
    }

    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
    }

    frameId.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
      setIsScrolling(true)
      lastScrollTime.current = now

      setTimeout(() => setIsScrolling(false), 150)
    })
  }, [])

  useEffect(() => {
    setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
    }
  }, [handleScroll])

  return { scrollY, isScrolling }
}

export const useScroll = (): TScrollState => useThrottledScroll()
