'use client'

import { createContext, useContext, useMemo } from 'react'
import type { TScrollContext } from '@/types'

const ScrollContext = createContext<TScrollContext | undefined>(undefined)

type TScrollProvider = {
  children: React.ReactNode
  value: TScrollContext
}

export const ScrollProvider = ({ children, value }: TScrollProvider) => {
  const memoizedValue = useMemo(
    () => ({
      scrollY: value.scrollY,
      logoProgress: value.logoProgress,
    }),
    [value.scrollY, value.logoProgress],
  )

  return (
    <ScrollContext.Provider value={memoizedValue}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = (): TScrollContext => {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider')
  }
  return context
}
