'use client'

import { useEffect } from 'react'

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      if (scrollbarWidth > 0) {
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
      }
      
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }

    return () => {
      document.body.classList.remove('scroll-locked')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
  }, [isLocked])
}
