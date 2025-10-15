'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import FeedbackCardItem from './FeedbackCardItem'
import type { TFeedbackMode } from './FeedbackCardItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'

type TFeedbackCardProps = {
  cardData: {
    id: string
    mode: TFeedbackMode
    nickname?: string
    content: string
    linkUrl?: string
    order: number
    stars?: number
    imageUrl?: string
  }[]
  autoPlayInterval?: number
  onApiChange?: (api: CarouselApi | undefined) => void
}

const FeedbackCard = ({
  cardData,
  autoPlayInterval = 5000,
  onApiChange,
}: TFeedbackCardProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const { isMobile } = useMediaQuery()
  const [isAutoPlaying, setIsAutoPlaying] = useState(!isMobile)

  useEffect(() => {
    if (onApiChange) {
      onApiChange(api)
    }
  }, [api, onApiChange])

  useEffect(() => {
    if (!api || !isAutoPlaying || isMobile) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, isAutoPlaying, autoPlayInterval, isMobile])

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsAutoPlaying(false)
    }
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsAutoPlaying(true)
    }
  }, [isMobile])

  const carouselOpts = useMemo(
    () => ({
      align: 'start' as const,
      loop: true,
      containScroll: 'trimSnaps' as const,
      ...(isMobile && { dragFree: true }),
    }),
    [isMobile],
  )

  return (
    <Carousel
      setApi={setApi}
      opts={carouselOpts}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      overflowXHidden
      contentClassName='w-full'
      disableDefaultOverflow
      className='flex self-stretch w-full xl:mb-[60px]'
    >
      <CarouselContent className='xl:gap-x-[24px] mt-[60px] xl:mt-[120px]'>
        {cardData.map((card, index) => (
          <CarouselItem key={card.id} index={index} className='basis-auto'>
            <FeedbackCardItem
              id={card.id}
              mode={card.mode}
              nickname={card.nickname}
              content={card.content}
              linkUrl={card.linkUrl}
              order={card.order}
              stars={card.stars}
              imageUrl={card.imageUrl}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default FeedbackCard
