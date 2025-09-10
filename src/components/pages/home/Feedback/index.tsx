'use client'

import FeedbackCard from './FeedbackCard'
import { useState, useRef } from 'react'
import type { TFeedbackType } from './FeedbackCard'

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const cardData: { type: TFeedbackType }[] = [
    { type: 'detailed' },
    { type: 'quote-short' },
    { type: 'quote-long' },
    { type: 'detailed' },
    { type: 'quote-short' },
    { type: 'quote-long' }
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
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : true
    
    let translateX = 0
    for (let i = 0; i < index; i++) {
      const cardWidth = getCardWidth(cardData[i].type, isMobile)
      translateX += cardWidth + gap
    }
    return translateX
  }

  const getMaxIndex = () => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : true
    let containerWidth: number
    
    if (isMobile) {
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375
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
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex(prev => prev + 1)
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
    <div className='flex flex-col items-center py-[60px] px-[12px] lg:py-[120px] lg:px-[48px] bg-neutral-50'>
      <h2 className='h-[89px] py-[6px] px-[12px] font-noto-serif-h2-bold text-figma-primary-950 box-border border-b-[26px] border-figma-secondary-300'>真實旅客回饋</h2>
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
      <div className='w-[1440px] hidden lg:flex justify-end mx-auto px-[24px]'>
        <button 
          onClick={handlePrevious}
          disabled={!canGoLeft}
          className={`group pt-[14px] pb-[18px] px-[20px] mr-[24px] rounded-[41px] border ${
            canGoLeft 
              ? 'border-figma-secondary-950 cursor-pointer hover:bg-figma-secondary-950' 
              : 'border-figma-secondary-300 cursor-not-allowed'
          }`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='56' height='12' viewBox='0 0 56 12' fill='none'>
            <path 
              d='M55 9.6665H56V11.6665H55V10.6665V9.6665ZM4 10.6665V11.6665H0.221157L3.50538 9.7974L4 10.6665ZM55 10.6665V11.6665H4V10.6665V9.6665H55V10.6665ZM4 10.6665L3.50538 9.7974L19.3193 0.797397L19.814 1.6665L20.3086 2.53561L4.49463 11.5356L4 10.6665Z' 
              className={canGoLeft ? 'group-hover:fill-figma-neutral-50' : ''}
              fill={canGoLeft ? '#926D3C' : '#E5D9BF'}
            />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          disabled={!canGoRight}
          className={`group pt-[14px] pb-[18px] px-[20px] rounded-[41px] border ${
            canGoRight 
              ? 'border-figma-secondary-950 cursor-pointer hover:bg-figma-secondary-950' 
              : 'border-figma-secondary-300 cursor-not-allowed'
          }`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='56' height='12' viewBox='0 0 56 12' fill='none'>
            <path 
              d='M1 9.6665H0V11.6665H1V10.6665V9.6665ZM52 10.6665V11.6665H55.2689L52.5595 9.83766L52 10.6665ZM1 10.6665V11.6665H52V10.6665V9.6665H1V10.6665ZM52 10.6665L52.5595 9.83766L39.2261 0.837655L38.6667 1.6665L38.1072 2.49535L51.4405 11.4954L52 10.6665Z' 
              className={canGoRight ? 'group-hover:fill-figma-neutral-50' : ''}
              fill={canGoRight ? '#926D3C' : '#E5D9BF'}
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Feedback