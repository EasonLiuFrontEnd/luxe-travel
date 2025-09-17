'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { flushSync } from 'react-dom'
import AdvantageCard from './AdvantageCard'
import styles from './styles.module.css'
import { transformAdvantageData } from './config'
import { useAdvantages } from '@/api/home/useAdvantages'
import { useAdvantageScroll } from '@/hooks/useAdvantageScroll'
import type { TBaseComponent } from '@/types'
import '@/styles/components.css'

type TAdvantageProps = TBaseComponent & {
  collectionRef?: React.RefObject<HTMLDivElement>
}

const Advantage = ({ className, collectionRef }: TAdvantageProps) => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const { backgroundRef, isTrackVisible, isScrolling, isReverseAnimation, scrollDirection } = useAdvantageScroll({ collectionRef })
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [currentTransform, setCurrentTransform] = useState('0px')
  const lastAnimationStateRef = React.useRef<{
    isReverseAnimation: boolean
    scrollDirection: 'down' | 'up' | null
    isScrolling: boolean
  } | null>(null)

  // Debug: 追蹤滾動和動畫狀態
  console.log('🎯 Advantage 狀態追蹤:', {
    isTrackVisible,
    isScrolling,
    isReverseAnimation,
    scrollDirection,
    isDragging,
    isMobile,
    trackRefCurrent: trackRef.current ? 'exists' : 'null'
  })


  const { query: advantagesQuery, mock } = useAdvantages()
  const {
    data: advantagesData,
    isLoading: isAdvantagesLoading,
    error: advantagesError,
  } = advantagesQuery

  const displayData = useMemo(() => {
    if (advantagesError || !advantagesData) {
      return transformAdvantageData(mock.rows)
    }

    if (isAdvantagesLoading) {
      return []
    }

    return transformAdvantageData(advantagesData)
  }, [advantagesError, advantagesData, isAdvantagesLoading, mock.rows])

  React.useEffect(() => {
    const checkMobileLayout = () => {
      const newIsMobile = window.innerWidth < 1280
      console.log('📱 響應式檢查:', {
        windowWidth: window.innerWidth,
        isMobile: newIsMobile,
        breakpoint: 1280
      })
      setIsMobile(newIsMobile)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  // 簡單直接的方法：監聽方向變化並捕獲位置
  const previousScrollDirection = React.useRef(scrollDirection)

  React.useEffect(() => {
    // 如果不在偵測區，重置 currentTransform
    if (!isTrackVisible) {
      if (currentTransform !== '0px') {
        console.log('🔄 離開偵測區，重置 currentTransform')
        setCurrentTransform('0px')
      }
      return
    }

    // 檢查方向是否改變（只在偵測區內）
    if (previousScrollDirection.current && previousScrollDirection.current !== scrollDirection) {
      console.log('🎯 偵測區內方向改變！', {
        從: previousScrollDirection.current,
        到: scrollDirection,
        時間: Date.now(),
        在偵測區: isTrackVisible
      })

      // 使用 requestAnimationFrame 確保在動畫類別改變之前捕獲位置
      requestAnimationFrame(() => {
        const trackElement = document.querySelector('[data-track="advantage-track"]') as HTMLElement

        if (trackElement) {
          const computedStyle = window.getComputedStyle(trackElement)
          const transform = computedStyle.transform

          console.log('🔍 找到元素並即時捕獲位置:', {
            element: trackElement,
            transform,
            時間: Date.now()
          })

          if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix.*\((.+)\)/)
            if (matrix) {
              const values = matrix[1].split(', ')
              const translateX = parseFloat(values[4]) || 0
              const newPosition = `${translateX}px`

              console.log('✅ 即時成功捕獲位置:', {
                translateX,
                newPosition,
                舊值: currentTransform
              })

              setCurrentTransform(newPosition)
            }
          }
        }
      })
    }

    // 更新記錄
    previousScrollDirection.current = scrollDirection
  }, [scrollDirection, isTrackVisible])

  // 追蹤 currentTransform 狀態變化
  React.useEffect(() => {
    console.log('🎭 currentTransform 狀態變化:', {
      新值: currentTransform,
      時間戳: Date.now(),
      來源: 'setState'
    })
  }, [currentTransform])

  // Debug: 追蹤 track 元素的位置和滾動狀態
  React.useEffect(() => {
    if (trackRef.current) {
      const trackElement = trackRef.current
      const rect = trackElement.getBoundingClientRect()
      console.log('📐 Track 元素位置資訊:', {
        scrollLeft: trackElement.scrollLeft,
        scrollWidth: trackElement.scrollWidth,
        clientWidth: trackElement.clientWidth,
        offsetLeft: trackElement.offsetLeft,
        offsetTop: trackElement.offsetTop,
        boundingRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      })
    }
  })




  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isMobile || !trackRef?.current) return
      const newStartX = e.pageX - trackRef.current.offsetLeft
      const newScrollLeft = trackRef.current.scrollLeft

      console.log('🖱️ 開始拖拽:', {
        pageX: e.pageX,
        offsetLeft: trackRef.current.offsetLeft,
        startX: newStartX,
        scrollLeft: newScrollLeft,
        isMobile
      })

      setIsDragging(true)
      setStartX(newStartX)
      setScrollLeft(newScrollLeft)
    },
    [isMobile],
  )

  const handleMouseLeave = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseUp = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !isMobile || !trackRef?.current) return
      const x = e.pageX - trackRef.current.offsetLeft
      const walk = (x - startX) * 2
      const newScrollLeft = scrollLeft - walk

      console.log('🏃 拖拽移動:', {
        pageX: e.pageX,
        x,
        startX,
        walk,
        oldScrollLeft: trackRef.current.scrollLeft,
        newScrollLeft,
        isDragging
      })

      trackRef.current.scrollLeft = newScrollLeft
    },
    [isDragging, isMobile, startX, scrollLeft],
  )

  return (
    <section
      className={`bg-figma-secondary-100 relative ${className || ''}`}
    >
      {/* 標題區域 */}
      <div
        ref={backgroundRef}
        className={`${styles.backgroundMap} relative xl:sticky xl:-top-[60px] pt-[60px] xl:pt-[200px] xl:left-0 px-0 pb-[60px] xl:pb-0 flex flex-col gap-[20px] xl:gap-[120px] items-center xl:h-[100vh]`}
      >
        <h2 className='inline-block font-family-noto-serif font-bold text-[32px] xl:text-[64px] xl:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] gradient-title-border'>
          典藏優勢
        </h2>

        <div className='content-stretch flex flex-col gap-2 xl:gap-6 items-center justify-center leading-[0] not-italic relative shrink-0 text-center w-full'>
          <div className='font-family-noto-serif font-semibold xl:font-bold min-w-full relative shrink-0 text-figma-primary-950 text-[18px] lg:text-[24px] lg:tracking-[12px] leading-[1.5] lg:leading-[1.2]'>
            機票｜住宿｜景點｜交通一站式安排
          </div>
          <div className='flex flex-col font-family-genseki justify-center relative shrink-0 text-figma-secondary-500 text-[16px] xl:text-[20px] w-full xl:w-[496px] leading-[1.2] xl:leading-[1.5]'>
            提升旅客安全 · 降低旅行風險
          </div>
        </div>
      </div>

      {/* 卡片區域 */}

      <div
        className={`px-3 xl:px-0 xl:w-full pb-[60px] xl:pb-0 w-full relative ${!isMobile ? styles.containerOverflow : ''}`}
      >
        <div
          ref={trackRef}
          data-track="advantage-track"
          className={`${isMobile ? `${styles.trackMobile} ${styles.scrollContainer}` : styles.track} ${isDragging && isMobile
            ? 'cursor-grabbing'
            : isMobile
              ? 'cursor-grab'
              : ''
            } ${(() => {
              if (isMobile) {
                console.log('📱 移動端模式，不套用動畫類別')
                return ''
              }

              if (!isTrackVisible) {
                const hiddenClass = isReverseAnimation ? styles.trackHiddenLeft : styles.trackHidden
                console.log('🙈 Track 不可見，套用隱藏類別:', {
                  isReverseAnimation,
                  hiddenClass,
                  trackHidden: styles.trackHidden,
                  trackHiddenLeft: styles.trackHiddenLeft
                })
                return hiddenClass
              }

              // 根據動畫類型和滾動方向決定動畫類別
              let animationClass = ''
              // 檢查是否為方向變化（應該使用動態起始位置）
              const isDirectionChange = previousScrollDirection.current &&
                scrollDirection &&
                previousScrollDirection.current !== scrollDirection

              // 檢查當前是否在動畫中 (不在初始位置)
              const currentTransformValue = parseFloat(currentTransform.replace('px', '')) || 0
              const isInAnimation = Math.abs(currentTransformValue) > 10 // 容錯範圍 10px

              console.log('🎭 動畫選擇條件:', {
                isReverseAnimation,
                scrollDirection,
                isScrolling,
                isDirectionChange,
                currentTransform,
                currentTransformValue,
                isInAnimation,
                lastState: lastAnimationStateRef.current
              })

              // 第二組判斷：偵測區內方向改變時的倒退動畫
              const hasValidStartPosition = currentTransform !== '0px'

              if (hasValidStartPosition) {
                // 偵測區內方向改變：使用從當前位置的倒退動畫
                console.log('🔄 使用倒退動畫（偵測區內方向改變）')

                if (isReverseAnimation) {
                  // 從下往上進入，現在方向改變
                  if (scrollDirection === 'down') {
                    // 從下往上進入後改成向下滾動 → 倒退到左邊
                    animationClass = isScrolling ? styles.trackSlideFromCurrentToLeft : styles.trackSlideFromCurrentToLeftPaused
                  } else {
                    // 從下往上進入後保持向上滾動 → 繼續左到右（這個不會發生，因為這不是方向改變）
                    animationClass = isScrolling ? styles.trackSlideFromCurrentToRight : styles.trackSlideFromCurrentToRightPaused
                  }
                } else {
                  // 從上往下進入，現在方向改變
                  if (scrollDirection === 'up') {
                    // 從上往下進入後改成向上滾動 → 倒退到右邊
                    animationClass = isScrolling ? styles.trackSlideFromCurrentToRight : styles.trackSlideFromCurrentToRightPaused
                  } else {
                    // 從上往下進入後保持向下滾動 → 繼續右到左（這個不會發生，因為這不是方向改變）
                    animationClass = isScrolling ? styles.trackSlideFromCurrentToCenter : styles.trackSlideFromCurrentToCenterPaused
                  }
                }
              } else {
                // 第一組判斷：如何進入偵測區的基礎動畫
                console.log('📍 使用進入動畫（初次進入偵測區）')

                if (isReverseAnimation) {
                  // 從下往上滑進入偵測區 → 左到右動畫
                  animationClass = isScrolling ? styles.trackSlideInReverse : styles.trackSlideInReversePaused
                } else {
                  // 從上往下滑進入偵測區 → 右到左動畫
                  if (scrollDirection === 'up') {
                    // 向上滾動時倒退（這個情況應該很少見）
                    animationClass = isScrolling ? styles.trackSlideBackToRight : styles.trackSlideBackToRightPaused
                  } else {
                    // 正常的右到左進入動畫
                    animationClass = isScrolling ? styles.trackSlideIn : styles.trackSlideInPaused
                  }
                }
              }

              console.log('🎬 動畫類別選擇:', {
                isReverseAnimation,
                scrollDirection,
                isScrolling,
                selectedClass: animationClass,
                allClasses: {
                  trackSlideBackToLeft: styles.trackSlideBackToLeft,
                  trackSlideBackToLeftPaused: styles.trackSlideBackToLeftPaused,
                  trackSlideInReverse: styles.trackSlideInReverse,
                  trackSlideInReversePaused: styles.trackSlideInReversePaused,
                  trackSlideBackToRight: styles.trackSlideBackToRight,
                  trackSlideBackToRightPaused: styles.trackSlideBackToRightPaused,
                  trackSlideIn: styles.trackSlideIn,
                  trackSlideInPaused: styles.trackSlideInPaused
                }
              })

              return animationClass
            })()}`}
          style={{ '--start-position': currentTransform } as React.CSSProperties}
          ref={(el) => {
            if (el) {
              console.log('🎨 Track 最終設置:', {
                fullClassName: el.className,
                computedTransform: window.getComputedStyle(el).transform,
                cssVariable: currentTransform,
                isTrackVisible,
                isMobile
              })
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {displayData.map((card, index) => {
            console.log(`🃏 卡片 ${index} 渲染:`, {
              cardId: card.id,
              cardTitle: card.title,
              index,
              isMobile,
              cardWidth: isMobile ? '318px' : '30vw (max 522px)',
              cardData: card
            })

            return (
              <div
                key={card.id}
                data-card-index={index}
                className={`${styles.cardContainer} flex-shrink-0 ${isMobile
                  ? 'w-[318px] max-w-none'
                  : 'w-[30vw] max-w-[522px]'
                  }`}
                ref={(el) => {
                  if (el) {
                    const rect = el.getBoundingClientRect()
                    console.log(`📏 卡片 ${index} 位置:`, {
                      index,
                      cardId: card.id,
                      offsetLeft: el.offsetLeft,
                      offsetTop: el.offsetTop,
                      clientWidth: el.clientWidth,
                      clientHeight: el.clientHeight,
                      boundingRect: {
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                        right: rect.right,
                        bottom: rect.bottom
                      }
                    })
                  }
                }}
              >
                <AdvantageCard card={card} />
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

export default Advantage
