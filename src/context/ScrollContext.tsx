'use client'

import { createContext, useContext, useMemo } from 'react'
import type { IScrollContext } from '@/types'

const ScrollContext = createContext<IScrollContext | undefined>(undefined)

interface IScrollProvider {
  children: React.ReactNode
  value: IScrollContext
}

export const ScrollProvider = ({ children, value }: IScrollProvider) => {
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

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider')
  }
  return context
}
