'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

export type TSlideContent = {
  id: number
  title: string
  subtitle: string
  description: string
}

type TTourBannerProps = {
  className?: string
  tourType: 'free-tours' | 'group-tours' | 'rcar-tours'
  slideContent: TSlideContent[]
  tours?: Array<{
    id: string
    namePrefix: string
    name: string
    summary: string
    mainImageUrl: string
  }>
  isLoading?: boolean
  hasError?: boolean
  altTextPrefix?: string
}

const TourBanner = ({
  className,
  tourType,
  slideContent,
  tours = [],
  isLoading = false,
  hasError = false,
  altTextPrefix = '精選行程',
}: TTourBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(1)

  const shouldShowDefault = hasError
  const shouldShowApi = !isLoading && !hasError && tours && tours.length > 0
  const totalSlides = shouldShowApi
    ? tours.length
    : shouldShowDefault
      ? slideContent.length
      : 1

  const currentContent = shouldShowApi
    ? {
        title: tours[currentSlide - 1]?.namePrefix || '',
        subtitle: tours[currentSlide - 1]?.name || '',
        description: tours[currentSlide - 1]?.summary || '',
      }
    : shouldShowDefault
      ? slideContent[currentSlide - 1]
      : { title: '', subtitle: '', description: '' }

  const currentImageUrl = shouldShowApi
    ? tours[currentSlide - 1]?.mainImageUrl
    : undefined

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides))
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1))
  }

  return (
    <section
      className={cn(
        'relative mt-5 xl:mt-8 mb-8 xl:mb-[60px] px-[clamp(12px,2.5vw,48px)]',
        className,
      )}
    >
      <div className='absolute mt-[-1px] z-10 bg-figma-neutral-50 rounded-br-2xl'>
        <div
          className={cn(
            'flex gap-2 xl:gap-[20px] xl:items-center flex-col xl:flex-row px-4 py-2 xl:px-7 xl:py-[26.5px]',
            styles.titleContainer,
          )}
        >
          <h2 className='font-noto-serif-tc font-bold text-[32px] xl:text-[64px] leading-[1.2] text-figma-secondary-500 whitespace-nowrap transition-all duration-500'>
            {currentContent.title}
          </h2>
          {!isLoading && (
            <div className='hidden xl:block h-px xl:w-[120px] bg-figma-secondary-500'></div>
          )}
          <h3 className='font-noto-serif-tc font-bold text-[16px] xl:text-[40px] leading-[1.2] text-figma-primary-500 whitespace-nowrap transition-all duration-500'>
            {currentContent.subtitle}
          </h3>
        </div>
      </div>

      <div className='xl:relative flex flex-col rounded-2xl xl:w-full xl:h-[670px]'>
        <div className='relative xl:absolute xl:inset-0 flex w-full h-[460px] xl:h-full'>
          {shouldShowApi && (
            <Image
              key={`tour-banner-api-${currentSlide}`}
              src={currentImageUrl || `/${tourType}/${currentSlide}.jpg`}
              alt={`${altTextPrefix} ${currentSlide}`}
              width={1824}
              height={670}
              className='object-cover transition-opacity duration-500 w-full h-full rounded-2xl'
              priority={currentSlide === 1}
            />
          )}

          {shouldShowDefault && (
            <Image
              key={`tour-banner-default-${currentSlide}`}
              src={`/${tourType}/${currentSlide}.jpg`}
              alt={`${altTextPrefix} ${currentSlide}`}
              width={1824}
              height={670}
              className='object-cover transition-opacity duration-500 w-full h-full rounded-2xl'
              priority={currentSlide === 1}
            />
          )}

          {!isLoading && !hasError && tours && tours.length === 0 && (
            <div className='w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center'>
              <div className='text-gray-500 text-lg'>暫無主打商品</div>
            </div>
          )}

          {(shouldShowApi || shouldShowDefault) && (
            <div className={styles.controls}>
              <div
                className={cn(
                  'pr-[5px] pl-[10px] pb-[9px] pt-[13px] xl:px-0 xl:py-0 flex items-center gap-[6px]',
                  styles.controlsContainer,
                )}
              >
                <button
                  onClick={handlePrevSlide}
                  className={cn(
                    'w-[32px] h-[32px] rounded-full cursor-pointer',
                    'flex items-center justify-center',
                    'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0 transition-colors',
                  )}
                  aria-label='Previous slide'
                >
                  <ChevronLeft className='w-6 h-6' />
                </button>

                <div className={styles.slideCounter}>
                  <span>{currentSlide.toString().padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{totalSlides.toString().padStart(2, '0')}</span>
                </div>

                <button
                  onClick={handleNextSlide}
                  className={cn(
                    'w-[32px] h-[32px] rounded-full cursor-pointer',
                    'flex items-center justify-center',
                    'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0 transition-colors',
                  )}
                  aria-label='Next slide'
                >
                  <ChevronRight className='w-6 h-6' />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='xl:absolute xl:bottom-0 xl:right-0 xl:rounded-tl-2xl xl:bg-figma-neutral-50'>
          <div
            className={cn(
              ' xl:px-7 pt-5 xl:py-4 xl:max-w-[40vw]',
              styles.descriptionContainer,
            )}
          >
            <p className='font-genseki-gothic text-figma-primary-500 text-sm xl:text-base leading-[1.5] transition-all duration-500'>
              {currentContent.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TourBanner
