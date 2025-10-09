'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RightOnlyFlipBook } from '@/components/ui/RightOnlyFlipBook'
import type { TFlipBookPage } from '../../../../types'
import type { TTravelerReview } from '../types'
import styles from './style.module.css'
import IconCta from '@/components/shared/icons/IconCta'

export type TTourCardProps = {
  title: string
  subtitle: string
  description: string
  price: number
  tags: string[]
  mainImageUrl: string
  travelerReview?: TTravelerReview
  note?: string
  onDetailsClick?: () => void
  onReviewClick?: () => void
  tourType: 'free' | 'rcar'
  logoPath: string
  className?: string
}

const TourCard = ({
  title,
  subtitle,
  description,
  price,
  tags,
  mainImageUrl,
  travelerReview,
  note,
  onDetailsClick,
  onReviewClick,
  className,
  tourType,
  logoPath,
}: TTourCardProps) => {
  const imageUrl = mainImageUrl

  const colorTheme = {
    bgColor:
      tourType === 'free'
        ? 'bg-figma-accent-blue-normal'
        : 'bg-figma-primary-300',
    textColor:
      tourType === 'free'
        ? 'text-figma-accent-blue-normal'
        : 'text-figma-primary-300',
  }

  const flipBookPages: TFlipBookPage[] = [
    {
      id: 'cover',
      pageNumber: '',
      pageContentClassName: 'h-full w-full',
      content: (
        <div className='relative h-full w-full'>
          <div
            className='h-full w-full bg-center bg-cover bg-no-repeat flex items-center relative'
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
              <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
            </div>
            <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

            <div className='absolute h-[17px] w-[64px] top-[10px] xl:top-[13px] left-1/2 transform -translate-x-1/2'>
              <Image
                src={logoPath}
                alt='Logo'
                width={64}
                height={17}
                className='object-contain'
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'content',
      pageNumber: '',
      pageContentClassName: 'h-full w-full',
      content: <div />,
    },
  ]

  return (
    <div
      className={cn(
        'group/tour-card relative w-full xl:max-w-[896px]',
        styles.foldedCornerHolder,
        className,
      )}
    >
      <div className='flex items-end relative isolate w-full'>
        <div className='hidden xl:block xl:w-[245px] xl:h-[326px] xl:bg-figma-neutral-50 relative shrink-0 z-[1] transition-transform duration-300 origin-bottom-left cursor-pointer'>
          <RightOnlyFlipBook
            pages={flipBookPages}
            width={245}
            height={326}
            showCover={false}
            enableBackwardFlip={false}
            onFlip={onDetailsClick}
          />
        </div>

        <div className='relative flex flex-1 min-w-0'>
          <div
            className={`hidden xl:block absolute ${colorTheme.bgColor} bottom-0 right-0 transition-all duration-300 group-hover/tour-card:-translate-x-[40px] group-hover/tour-card:-translate-y-[36px] h-full w-full`}
          />

          <div className='xl:bg-white flex flex-col justify-between w-full min-w-0 relative xl:gap-7 xl:pl-8 xl:pr-5 xl:py-5 transition-all duration-300'>
            <div className='flex flex-col xl:gap-3 w-full'>
              <div className='flex items-end xl:items-start xl:justify-between w-full'>
                <div
                  className={cn(
                    'xl:hidden relative cursor-pointer',
                    styles.foldedCornerMobile,
                  )}
                  onClick={onDetailsClick}
                >
                  <div
                    className='bg-center bg-cover bg-no-repeat flex items-center relative shrink-0 h-[193px] w-[145px] min-w-[145px]'
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
                      <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
                    </div>
                    <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

                    <div className='absolute h-[17px] w-[64px] top-[10px] left-1/2 transform -translate-x-1/2'>
                      <Image
                        src={logoPath}
                        alt='Logo'
                        width={64}
                        height={17}
                        className='object-contain'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex-1 flex relative min-w-0'>
                  <div
                    className={`xl:hidden absolute z-[-1] ${colorTheme.bgColor} bottom-0 right-0 transition-all duration-300 -translate-x-[16px] -translate-y-[22px] h-full w-full`}
                  />

                  <div className='xl:relative flex flex-col xl:flex-row xl:items-start justify-between gap-4 xl:gap-3 pt-4 px-4 pb-3 xl:p-0 w-full bg-figma-primary-0 xl:bg-transparent'>
                    <div className='flex flex-col gap-1 text-figma-primary-950 flex-1 min-w-0'>
                      <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular max-h-[21px] xl:max-h-[24px] overflow-hidden truncate'>
                        {subtitle}
                      </div>
                      <div className='font-noto-serif-h5-bold'>
                        {title}
                      </div>
                    </div>
                    <div
                      className={`flex gap-1 items-end justify-end ${colorTheme.textColor} shrink-0 xl:absolute xl:top-[-8px] xl:right-0`}
                    >
                      <div className='whitespace-nowrap font-noto-serif-body-l-semibold xl:font-noto-serif-h5-bold'>
                        ＄{price.toLocaleString()}
                      </div>
                      <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular'>
                        起
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3 pt-4 px-4 pb-3 xl:p-0 bg-figma-primary-0 xl:bg-transparent'>
                <div className='flex flex-wrap gap-3'>
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className='bg-figma-primary-500 px-2 py-1 text-white font-genseki-body-s-regular'
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className='font-genseki-body-xs-regular text-figma-primary-950 line-clamp-4 xl:line-clamp-2'>
                  {description}
                </div>
              </div>
            </div>

            <div className='bg-figma-primary-0 flex gap-3 xl:gap-5 items-start w-full relative p-4 xl:p-0'>
              {travelerReview && (
                <button
                  onClick={onReviewClick}
                  className='bg-white rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)] px-2.5 pt-1 pb-3 flex gap-2 items-end shrink-0 cursor-pointer group'
                >
                  <div className='flex flex-col gap-2 items-start'>
                    <div className='flex gap-1 items-center'>
                      <Image
                        src='/tours/deco.svg'
                        alt='Deco'
                        width={18}
                        height={18}
                        className='object-contain'
                      />
                      <span
                        className={`font-genseki-body-s-bold ${colorTheme.textColor}`}
                      >
                        旅客迴響
                      </span>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <div className='w-5 h-5 rounded-xl overflow-hidden relative'>
                        <Image
                          src={travelerReview.avatarUrl}
                          alt={travelerReview.author}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <span className='font-genseki-body-s-regular text-figma-primary-950'>
                        {travelerReview.author}
                      </span>
                    </div>
                  </div>
                  <div className='w-[48px] h-[24px] flex items-center justify-end'>
                    <div className='w-[24.68px] group-hover:w-[37.68px] transition-all duration-300 overflow-hidden'>
                      <IconCta className={`text-[var(--color-figma-secondary-950)]`} />
                    </div>
                  </div>
                </button>
              )}

              {note && (
                <div className='flex gap-2 items-start flex-1'>
                  <Image src='/tours/icon.svg' alt='Icon' width={15} height={15} className='object-contain' />
                  <p className='font-genseki-body-xs-regular text-figma-secondary-950 line-clamp-2'>
                    {note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourCard
