import { useState, useEffect } from 'react'

type TMediaQueryState = {
  isMobile: boolean
}

export const useMediaQuery = (): TMediaQueryState => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 374px)')

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Set initial state
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return { isMobile }
}
