'use client'

import { useState, useEffect } from 'react'
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
  cardData: { mode: TFeedbackMode }[]
  autoPlayInterval?: number
  onApiChange?: (api: CarouselApi | undefined) => void
}

const FeedbackCard = ({
  cardData,
  autoPlayInterval = 5000,
  onApiChange
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

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsAutoPlaying(false)
    }
  }
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsAutoPlaying(true)
    }
  }

  const carouselOpts = {
    align: 'start' as const,
    loop: false,
    ...(isMobile && { dragFree: true }),
  }

  return (
    <Carousel
      setApi={setApi}
      opts={carouselOpts}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='flex self-stretch w-full min-h-[587px] mb-[60px]'
    >
      <CarouselContent className='gap-x-[24px] mt-[60px] xl:mt-[120px]'>
        {cardData.map((card, index) => (
          <CarouselItem key={index} className='basis-auto'>
            <FeedbackCardItem mode={card.mode} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default FeedbackCard
