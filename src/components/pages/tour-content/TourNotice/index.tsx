import React from 'react'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

type TTourNoticeProps = {
  itemCount: number
  reminder: string
  policy: string
}

const convertBrTagsToElements = (text: string) => {
  const parts = text.split('<br/>')
  return parts.map((part, index) =>
    React.createElement(
      React.Fragment,
      { key: index },
      part,
      index < parts.length - 1 ? React.createElement('br') : null,
    ),
  )
}

const TourNotice = ({ itemCount, reminder, policy }: TTourNoticeProps) => {
  const { isMobile } = useMediaQuery()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      id='tour-notice'
      style={{
        position: 'sticky',
        top: `${60 + itemCount * 10}px`,
        zIndex: itemCount,
      }}
    >
      <div className='flex flex-col border-t border-figma-secondary-500 bg-figma-secondary-100'>
        <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 my-10 xl:mt-13 xl:mb-12 gradient-title-border'>
          貼心提醒與參團須知
        </h2>
        <div className='flex flex-col gap-y-5 xl:mt-9 mb-[44px] xl:mb-11'>
          <div className='flex flex-col gap-y-8 pt-5 px-5 pb-[30px] mx-4 xl:pt-8 xl:px-8 xl:pb-10 xl:mx-[240px] rounded-2xl bg-figma-neutral-0'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                className='p-1 mr-2'
              >
                <path
                  d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z'
                  fill='#926D3C'
                />
                <path
                  d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z'
                  fill='#926D3C'
                />
              </svg>
              <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
                旅客篇
              </p>
            </div>
            <p
              className={cn(
                'font-family-genseki leading-[1.5] text-figma-primary-950',
                isMobile && !isExpanded ? 'max-h-80 overflow-hidden' : '',
              )}
            >
              {convertBrTagsToElements(reminder)}
            </p>
            {isMobile && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className='self-center font-genseki-body-s-regular text-figma-secondary-500 py-2 px-4 border border-figma-secondary-500 rounded-[18px]'
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          <div className='pt-5 px-5 pb-[30px] mx-4 xl:pt-8 xl:px-8 xl:pb-10 xl:mx-[240px] rounded-2xl bg-figma-neutral-0'>
            <div className='flex items-center mb-8'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                className='p-1 mr-2'
              >
                <path
                  d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z'
                  fill='#926D3C'
                />
                <path
                  d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z'
                  fill='#926D3C'
                />
              </svg>
              <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
                航空篇
              </p>
            </div>
            <p className='font-family-genseki leading-[1.5] text-figma-primary-950'>
              {convertBrTagsToElements(policy)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourNotice
