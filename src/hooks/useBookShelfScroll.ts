'use client'

import { useRef, useState, useEffect } from 'react'

export const useBookShelfScroll = () => {
  const bookShelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

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

  return {
    bookShelfRef,
    trackRef,
    isFixed: false,
    scrollProgress: 0,
    isMobile,
  }
}
