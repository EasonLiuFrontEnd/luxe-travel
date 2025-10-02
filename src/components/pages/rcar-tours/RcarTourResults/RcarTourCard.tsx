'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RightOnlyFlipBook } from '@/components/ui/RightOnlyFlipBook'
import type { TBaseComponent, TFlipBookPage } from '@/types'
import styles from './style.module.css'
import type { TTravelerReview } from '../config'

type TRcarTourCardProps = TBaseComponent & {
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
}

const RcarTourCard = ({
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
}: TRcarTourCardProps) => {
  const imageUrl = mainImageUrl

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
                src='/free-tours/logo.png'
                alt='Logo'
                width={64}
                height={17}
                className='object-contain'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'content',
      pageNumber: '',
      pageContentClassName: 'h-full w-full',
      content: (
        <div />
      )
    }
  ]

  return (
    <div
      className={cn(
        'group relative w-full max-w-[680px] xl:max-w-[900px]',
        styles.foldedCornerHolder, className,
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
          <div className='hidden xl:block absolute bg-figma-primary-300 bottom-0 right-0 transition-all duration-300 group-hover:-translate-x-[40px] group-hover:-translate-y-[36px] h-full w-full' />

          <div className='xl:bg-white flex flex-col justify-between w-full min-w-0 relative xl:gap-7 xl:pl-8 xl:pr-5 xl:py-5 transition-all duration-300'>
            <div className='flex flex-col xl:gap-3 w-full'>
              <div className='flex items-end xl:items-start xl:justify-between w-full'>
                <div className={cn('xl:hidden relative cursor-pointer', styles.foldedCornerMobile)} onClick={onDetailsClick}>
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
                        src='/free-tours/logo.png'
                        alt='Logo'
                        width={64}
                        height={17}
                        className='object-contain'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex-1 flex relative min-w-0'>
                  <div className='xl:hidden absolute z-[-1] bg-figma-primary-300 bottom-0 right-0 transition-all duration-300 -translate-x-[16px] -translate-y-[22px] h-full w-full' />

                  <div className='flex flex-col xl:flex-row xl:items-start justify-between gap-4 xl:gap-3 p-4 xl:p-0 w-full bg-figma-primary-0 xl:bg-transparent'>
                    <div className='flex flex-col gap-1 text-figma-primary-950 flex-1 min-w-0'>
                      <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular max-h-[21px] xl:max-h-[24px] overflow-hidden truncate'>
                        {subtitle}
                      </div>
                      <div className='font-noto-serif-h5-bold truncate'>
                        {title}
                      </div>
                    </div>
                    <div className='flex items-end gap-1 text-figma-primary-300 shrink-0'>
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

              <div className='flex flex-col gap-3 p-4 xl:p-0 bg-figma-primary-0 xl:bg-transparent'>
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

            <div className='bg-figma-primary-0 flex gap-4 items-start w-full relative p-4 xl:p-0'>
              {travelerReview && (
                <button
                  onClick={onReviewClick}
                  className='bg-white rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)] px-2.5 py-1 pb-2 flex gap-1 items-end shrink-0 hover:shadow-lg transition-shadow'
                >
                  <div className='flex flex-col gap-1 items-start'>
                    <div className='flex gap-0.5 items-center'>
                      <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                        <path d='M9 2.25L7.5 6.75L3 8.25L7.5 9.75L9 14.25L10.5 9.75L15 8.25L10.5 6.75L9 2.25Z' fill='#8BC3DE' />
                        <path d='M3.75 11.25L2.625 13.875L0 15L2.625 16.125L3.75 18.75L4.875 16.125L7.5 15L4.875 13.875L3.75 11.25Z' fill='#8BC3DE' />
                      </svg>
                      <span className='font-genseki-body-s-bold text-figma-primary-300'>
                        旅客迴響
                      </span>
                    </div>
                    <div className='flex gap-1 items-center'>
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
                  <div className='w-12 h-6 relative flex items-center justify-center'>
                    <svg width='48' height='24' viewBox='0 0 48 24' fill='none'>
                      <path
                        d='M12.3536 13.3536C12.5488 13.1583 12.5488 12.8417 12.3536 12.6464L9.17157 9.46447C8.97631 9.2692 8.65973 9.2692 8.46447 9.46447C8.2692 9.65973 8.2692 9.97631 8.46447 10.1716L11.2929 13L8.46447 15.8284C8.2692 16.0237 8.2692 16.3403 8.46447 16.5355C8.65973 16.7308 8.97631 16.7308 9.17157 16.5355L12.3536 13.3536ZM0 13.5H12V12.5H0V13.5Z'
                        fill='#926D3C'
                      />
                    </svg>
                  </div>
                </button>
              )}

              {note && (
                <div className='flex gap-1 items-start flex-1'>
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' className='shrink-0 mt-0.5'>
                    <circle cx='9' cy='9' r='7.5' stroke='#926D3C' strokeWidth='1.5' />
                    <path d='M9 6V9.75M9 12.75H9.0075' stroke='#926D3C' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
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

export default RcarTourCard