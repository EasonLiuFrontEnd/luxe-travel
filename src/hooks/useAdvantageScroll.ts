'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

type TUseAdvantageScrollReturn = {
  backgroundRef: React.RefObject<HTMLDivElement>
  isTrackVisible: boolean
  isScrolling: boolean
  isReverseAnimation: boolean
  scrollDirection: 'down' | 'up' | null
}

type TUseAdvantageScrollParams = {
  collectionRef?: React.RefObject<HTMLDivElement>
}

export const useAdvantageScroll = ({ collectionRef }: TUseAdvantageScrollParams = {}): TUseAdvantageScrollReturn => {
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const [isTrackVisible, setIsTrackVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isReverseAnimation, setIsReverseAnimation] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasTriggeredReverseRef = useRef(false)
  const lastScrollY = useRef(0)

  const checkVisibility = useCallback(() => {
    if (!backgroundRef.current) return

    const rect = backgroundRef.current.getBoundingClientRect()
    const collectionRect = collectionRef?.current?.getBoundingClientRect()

    // 檢查 advantage 區域是否在視窗內（任何部分可見）
    const isAdvantageInViewport = rect.top < window.innerHeight && rect.bottom > 0
    // 檢查 collection 是否進入視窗（從下往上滑的觸發條件）
    const isCollectionEntering = collectionRect && collectionRect.top < window.innerHeight

    // 如果完全離開偵測區，重置反向動畫記憶
    if (!isAdvantageInViewport) {
      hasTriggeredReverseRef.current = false
    }

    // 如果 collection 進入視窗且是從下往上滑動，記錄反向動畫被觸發
    if (isAdvantageInViewport && isCollectionEntering && scrollDirection === 'up' && !hasTriggeredReverseRef.current) {
      hasTriggeredReverseRef.current = true
    }

    // 決定動畫方向
    const shouldUseReverseAnimation = isAdvantageInViewport && hasTriggeredReverseRef.current


    if (isAdvantageInViewport) {
      setIsTrackVisible(true)
      setIsReverseAnimation(shouldUseReverseAnimation)
    } else {
      setIsTrackVisible(false)
      setIsReverseAnimation(false)
    }
  }, [collectionRef, scrollDirection])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // 檢測滾動方向
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down')
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up')
    }
    lastScrollY.current = currentScrollY

    setIsScrolling(true)
    checkVisibility()

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }, [checkVisibility])

  useEffect(() => {
    if (!backgroundRef.current) return

    const currentElement = backgroundRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            checkVisibility()
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.5, 1]
      }
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    observer.observe(currentElement)

    checkVisibility()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll, checkVisibility])

  return {
    backgroundRef: backgroundRef as React.RefObject<HTMLDivElement>,
    isTrackVisible,
    isScrolling,
    isReverseAnimation,
    scrollDirection
  }
}