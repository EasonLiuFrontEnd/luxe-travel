'use client'

import FeedbackCarousel from './FeedbackCarousel'
import { useState, useEffect, useMemo } from 'react'
import type { TFeedbackMode } from './FeedbackCardItem'
import type { CarouselApi } from '@/components/ui/Carousel'
import { useFeedBack } from '@/api/home/useFeedBack'
import '@/styles/components.css'

const Feedback = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canGoLeft, setCanGoLeft] = useState(false)
  const [canGoRight, setCanGoRight] = useState(false)

  const {
    query: {
      data: feedbacksData,
      isLoading: isFeedbacksLoading,
      error: feedbacksError,
    },
    mock,
  } = useFeedBack()

  const effectiveData = useMemo(() => {
    if (feedbacksError && process.env.NODE_ENV !== 'production') {
      return mock.rows
    }

    if (isFeedbacksLoading) {
      return []
    }

    return feedbacksData || []
  }, [feedbacksError, feedbacksData, isFeedbacksLoading, mock.rows])

  const cardData: {
    id: string
    mode: TFeedbackMode
    nickname?: string
    content: string
    linkUrl?: string
    order: number
    stars?: number
    imageUrl?: string
  }[] = useMemo(() => {
    return (effectiveData || []).map((feedback) => ({
      id: feedback.id,
      mode: feedback.mode,
      nickname:
        feedback.mode === 'REAL' ? feedback.nickname || undefined : undefined,
      content: feedback.content,
      linkUrl:
        feedback.mode !== 'REAL' ? feedback.linkUrl || undefined : undefined,
      order: feedback.order,
      stars: feedback.mode === 'REAL' ? feedback.stars || undefined : undefined,
      imageUrl:
        feedback.mode === 'VIRTUAL'
          ? feedback.imageUrl || undefined
          : undefined,
    }))
  }, [effectiveData])

  useEffect(() => {
    if (!carouselApi) return

    setCanGoLeft(true)
    setCanGoRight(true)
  }, [carouselApi])

  const handlePrevious = () => carouselApi?.scrollPrev()
  const handleNext = () => carouselApi?.scrollNext()

  return (
    <div
      className='relative flex flex-col items-center py-[60px] px-[12px] xl:py-[120px] xl:px-[48px] border-t border-figma-secondary-500'
      style={{
        background:
          'linear-gradient(to bottom, #F7F4EC, rgba(247, 244, 236, 0.00)), #F5F5F5',
      }}
    >
      <h2 className='font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-[12px] gradient-title-border'>
        真實旅客回饋
      </h2>
      <FeedbackCarousel
        cardData={cardData}
        autoPlayInterval={10000}
        onApiChange={setCarouselApi}
      />
      <div className='w-[75vw] hidden xl:flex justify-end mx-auto px-[24px]'>
        <button
          onClick={handlePrevious}
          disabled={!canGoLeft}
          className={`group pt-[14px] pb-[18px] px-[20px] mr-[24px] rounded-[41px] border ${
            canGoLeft
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
          className={`group pt-[14px] pb-[18px] px-[20px] rounded-[41px] border ${
            canGoRight
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
