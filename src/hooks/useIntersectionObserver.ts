'use client'

import { useState, useEffect, RefObject } from 'react'

type TIntersectionObserverOptions = {
  threshold?: number | number[]
  rootMargin?: string
  onIntersect?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
}

type TIntersectionObserverResult = {
  isIntersecting: boolean
  intersectionRatio: number
  boundingClientRect: DOMRect | null
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  options: TIntersectionObserverOptions = {}
): TIntersectionObserverResult => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [intersectionRatio, setIntersectionRatio] = useState(0)
  const [boundingClientRect, setBoundingClientRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        const ratio = entry.intersectionRatio
        const rect = entry.boundingClientRect

        setIsIntersecting(isIntersecting)
        setIntersectionRatio(ratio)
        setBoundingClientRect(rect)

        if (isIntersecting) {
          options.onIntersect?.(entry)
        } else {
          options.onLeave?.(entry)
        }
      },
      {
        threshold: options.threshold || [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: options.rootMargin || '0px'
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin, options.onIntersect, options.onLeave])

  return {
    isIntersecting,
    intersectionRatio,
    boundingClientRect
  }
}
