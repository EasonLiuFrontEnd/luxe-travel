'use client'

import FeedbackCard from './FeedbackCard'
import { useState, useRef } from 'react'
import type { TFeedbackType } from './FeedbackCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMediaQuery()
  const gradientStyle = {
    background:
      'linear-gradient(to bottom, transparent 0%, transparent calc(100% - 26px), #e5d9bf calc(100% - 26px), #e5d9bf 100%)',
  }

  const cardData: { type: TFeedbackType }[] = [
    { type: 'detailed' },
    { type: 'quote-short' },
    { type: 'quote-long' },
    { type: 'detailed' },
    { type: 'quote-short' },
    { type: 'quote-long' },
  ]

  const totalCards = cardData.length
  const gap = 24
  const rightMargin = 50

  const getCardWidth = (type: TFeedbackType, isMobile: boolean): number => {
    if (type === 'detailed') {
      return isMobile ? 320 : 523
    }
    return 320
  }

  const getTranslateX = (index: number) => {
    let translateX = 0
    for (let i = 0; i < index; i++) {
      const cardWidth = getCardWidth(cardData[i].type, isMobile)
      translateX += cardWidth + gap
    }
    return translateX
  }

  const getMaxIndex = () => {
    let containerWidth: number

    if (isMobile) {
      const screenWidth =
        typeof window !== 'undefined' ? window.innerWidth : 375
      containerWidth = screenWidth - 24 - 120
    } else {
      containerWidth = 1440
    }

    const safetyMargin = isMobile ? rightMargin + 150 : rightMargin

    let totalWidth = 0
    for (let i = 0; i < totalCards; i++) {
      const cardWidth = getCardWidth(cardData[i].type, isMobile)
      totalWidth += cardWidth
      if (i < totalCards - 1) totalWidth += gap
    }

    const maxTranslateX = totalWidth - containerWidth + safetyMargin

    for (let i = totalCards - 1; i >= 0; i--) {
      if (getTranslateX(i) <= maxTranslateX) {
        return i
      }
    }
    return 0
  }

  const canGoLeft = currentIndex > 0
  const canGoRight = currentIndex < getMaxIndex()

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 30

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }
  }

  return (
    <div className='relative flex flex-col items-center py-[60px] px-[12px] lg:py-[120px] lg:px-[48px] bg-neutral-50'>
      <h2
        className='font-noto-serif-tc font-bold text-[32px] lg:text-[64px] lg:leading-[1.2] text-figma-primary-950 py-[6px] px-[12px]'
        style={gradientStyle}
      >
        真實旅客回饋
      </h2>
      <div className='flex self-stretch min-h-[587px] mb-[60px] overflow-hidden'>
        <div
          ref={containerRef}
          className='flex gap-x-[24px] mt-[60px] lg:mt-[120px] transition-transform duration-300'
          style={{ transform: `translateX(-${getTranslateX(currentIndex)}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cardData.map((card, index) => (
            <FeedbackCard key={index} type={card.type} />
          ))}
        </div>
      </div>
      <div className='w-[75vw] hidden lg:flex justify-end mx-auto px-[24px]'>
        <button
          onClick={handlePrevious}
          disabled={!canGoLeft}
          className={`group pt-[14px] pb-[18px] px-[20px] mr-[24px] rounded-[41px] border ${canGoLeft
            ? 'border-figma-secondary-950 cursor-pointer'
            : 'border-figma-secondary-300 cursor-not-allowed'
            }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='12'
            viewBox='0 0 48 12'
            fill='none'
            className={`transition-transform duration-300 origin-right ${canGoLeft ? 'group-hover:scale-x-[1.167]' : ''}`}
          >
            <path
              d='M47 9.6665H48V11.6665H47V10.6665V9.6665ZM4 10.6665V11.6665H0.221157L3.50538 9.7974L4 10.6665ZM47 10.6665V11.6665H4V10.6665V9.6665H47V10.6665ZM4 10.6665L3.50538 9.7974L16.8739 0.797397L17.3686 1.6665L17.8632 2.53561L4.49463 11.5356L4 10.6665Z'
              fill={canGoLeft ? '#926D3C' : '#E5D9BF'}
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={`group pt-[14px] pb-[18px] px-[20px] rounded-[41px] border ${canGoRight
            ? 'border-figma-secondary-950 cursor-pointer'
            : 'border-figma-secondary-300 cursor-not-allowed'
            }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='12'
            viewBox='0 0 48 12'
            fill='none'
            className={`transition-transform duration-300 origin-left ${canGoRight ? 'group-hover:scale-x-[1.167]' : ''}`}
          >
            <path
              d='M1 9.6665H0V11.6665H1V10.6665V9.6665ZM44 10.6665V11.6665H47.2689L44.5595 9.83766L44 10.6665ZM1 10.6665V11.6665H44V10.6665V9.6665H1V10.6665ZM44 10.6665L44.5595 9.83766L31.2261 0.837655L30.6667 1.6665L30.1072 2.49535L43.4405 11.4954L44 10.6665Z'
              fill={canGoRight ? '#926D3C' : '#E5D9BF'}
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Feedback
