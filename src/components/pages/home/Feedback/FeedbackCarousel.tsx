'use client'

import { useState, useEffect, useMemo } from 'react'
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
    color?: {
      bg: string
      text: string
    }
  }[]
  onApiChange?: (api: CarouselApi | undefined) => void
}

const FeedbackCard = ({ cardData, onApiChange }: TFeedbackCardProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    if (onApiChange) {
      onApiChange(api)
    }
  }, [api, onApiChange])

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
      overflowXHidden
      contentClassName='w-full'
      disableDefaultOverflow
      className='flex self-stretch w-full xl:mb-[60px]'
    >
      <CarouselContent className='xl:gap-x-[24px] mt-[60px] xl:mt-[120px]'>
        {cardData.map((card, index) => (
          <CarouselItem
            key={card.id}
            index={index}
            className={
              index === cardData.length - 1
                ? 'basis-auto pr-4 xl:pr-7'
                : 'basis-auto'
            }
          >
            <FeedbackCardItem
              id={card.id}
              mode={card.mode}
              nickname={card.nickname}
              content={card.content}
              linkUrl={card.linkUrl}
              order={card.order}
              stars={card.stars}
              imageUrl={card.imageUrl}
              color={card.color}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default FeedbackCard
