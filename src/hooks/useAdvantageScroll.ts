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

    console.log('👁️ 可見性檢查:', {
      windowHeight: window.innerHeight,
      advantageRect: {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height
      },
      collectionRect: collectionRect ? {
        top: collectionRect.top,
        bottom: collectionRect.bottom,
        height: collectionRect.height
      } : null,
      isAdvantageInViewport,
      isCollectionEntering,
      scrollDirection,
      hasTriggeredReverse: hasTriggeredReverseRef.current
    })

    // 如果完全離開偵測區，重置反向動畫記憶
    if (!isAdvantageInViewport) {
      hasTriggeredReverseRef.current = false
    }

    // 如果 collection 進入視窗且是從下往上滑動，記錄反向動畫被觸發
    if (isAdvantageInViewport && isCollectionEntering && scrollDirection === 'up' && !hasTriggeredReverseRef.current) {
      hasTriggeredReverseRef.current = true
      console.log('🔄 觸發反向動畫記憶')
    }

    // 決定動畫方向
    const shouldUseReverseAnimation = isAdvantageInViewport && hasTriggeredReverseRef.current

    console.log('🎭 動畫方向決定:', {
      isAdvantageInViewport,
      hasTriggeredReverse: hasTriggeredReverseRef.current,
      shouldUseReverseAnimation,
      finalTrackVisible: isAdvantageInViewport,
      finalReverseAnimation: isAdvantageInViewport ? shouldUseReverseAnimation : false
    })

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
    const scrollDiff = currentScrollY - lastScrollY.current

    // 檢測滾動方向
    let newScrollDirection = scrollDirection
    let directionChanged = false

    if (currentScrollY > lastScrollY.current) {
      newScrollDirection = 'down'
      directionChanged = scrollDirection !== 'down'
      setScrollDirection('down')
    } else if (currentScrollY < lastScrollY.current) {
      newScrollDirection = 'up'
      directionChanged = scrollDirection !== 'up'
      setScrollDirection('up')
    }

    console.log('🌊 滾動事件詳細分析:', {
      currentScrollY,
      lastScrollY: lastScrollY.current,
      scrollDiff,
      oldDirection: scrollDirection,
      newDirection: newScrollDirection,
      directionChanged,
      isScrolling: true,
      時間戳: Date.now()
    })

    if (directionChanged) {
      console.log('🔄 Hook 檢測到方向變化!', {
        從: scrollDirection,
        到: newScrollDirection,
        在滾動位置: currentScrollY
      })
    }

    lastScrollY.current = currentScrollY

    setIsScrolling(true)
    checkVisibility()

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      console.log('⏰ 滾動停止 timeout 觸發')
      setIsScrolling(false)
    }, 150)
  }, [checkVisibility, scrollDirection])

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