'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export type TFeedbackMode = 'REAL' | 'SOCIAL'

type TFeedbackCardItemProps = {
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
}

const FeedbackCardItem = ({
  id,
  mode,
  nickname,
  content,
  linkUrl,
  order,
  stars,
  imageUrl,
  color,
}: TFeedbackCardItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const textRef = useRef<HTMLParagraphElement>(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (mode === 'REAL' && textRef.current) {
      const element = textRef.current
      const isOverflowing = element.scrollHeight > element.clientHeight
      setShowButton(isOverflowing)
    }
  }, [mode, content])

  if (mode === 'REAL') {
    return (
      <div
        id={id}
        className={`relative flex flex-col items-center w-[320px] xl:w-[523px] pt-[103px] pb-[24px] px-[24px] bg-figma-neutral-0 rounded-[16px] ${isExpanded ? 'max-h-[714px]' : 'max-h-[374px]'}`}
      >
        <div className='absolute top-[-28px] flex flex-col items-center'>
          <Image
            key={`feedback-avatar-${id}`}
            src='/home/feedback/avatar.jpg'
            alt='avatar'
            width={56}
            height={56}
            className='mb-[12px] rounded-[50%] overflow-hidden'
          />
          <div className='flex gap-[2px] mb-[4px]'>
            {Array.from({ length: stars || 0 }).map((_, index) => (
              <Image
                key={`feedback-star-${id}-${index}`}
                src='/home/feedback/rating.svg'
                alt='star'
                width={16}
                height={16}
              />
            ))}
          </div>
          <p className='font-genseki-body-s-bold text-figma-primary-950'>
            {nickname}
          </p>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='33'
          height='33'
          viewBox='0 0 33 33'
          fill='none'
          className='mb-[16px]'
        >
          <path
            d='M23.3067 18.8978C20.4513 18.8978 18.1364 16.5665 18.1364 13.6909C18.1364 10.8158 20.4513 8.48451 23.3067 8.48451C26.1622 8.48451 28.4771 10.8158 28.4771 13.6909L28.5 14.4349C28.5 20.1861 23.8702 24.8481 18.1593 24.8481V21.8727C20.1322 21.8727 21.9873 21.0992 23.382 19.6941C23.6509 19.4241 23.8958 19.1361 24.1167 18.834C23.8527 18.876 23.5822 18.8978 23.3067 18.8978ZM9.67036 18.8978C6.81491 18.8978 4.5 16.5665 4.5 13.6909C4.5 10.8158 6.81491 8.48451 9.67036 8.48451C12.5258 8.48451 14.8407 10.8158 14.8407 13.6909L14.8636 14.4349C14.8636 20.1861 10.2338 24.8481 4.52291 24.8481V21.8727C6.49582 21.8727 8.35091 21.0992 9.74564 19.6941C10.0145 19.4241 10.2595 19.1361 10.4804 18.834C10.2164 18.876 9.94582 18.8978 9.67036 18.8978Z'
            fill='#383841'
          />
        </svg>
        <p
          ref={textRef}
          className={`mb-[20px] font-genseki-body-m-regular ${isExpanded ? '' : 'line-clamp-6'} overflow-hidden`}
        >
          {content}
        </p>
        {showButton && (
          <button
            onClick={handleToggle}
            className='
              py-[4px] px-[12px] font-genseki-body-s-regular text-figma-secondary-500
              rounded-[18px] border border-figma-secondary-500 cursor-pointer transition-colors duration-300
              hover:text-figma-secondary-950 hover:border-figma-secondary-950
            '
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    )
  }

  if (mode === 'SOCIAL' && imageUrl) {
    return (
      <div
        id={id}
        data-order={order}
        className='w-[320px] h-[323px] p-[24px] rounded-[16px] text-white bg-cover bg-center'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className='inline-block p-[20px] mb-[24px] rounded-[64px] border border-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='49'
            viewBox='0 0 48 49'
            fill='none'
          >
            <path
              d='M34.2101 28.0139C29.9269 28.0139 26.4545 24.517 26.4545 20.2035C26.4545 15.8909 29.9269 12.394 34.2101 12.394C38.4933 12.394 41.9656 15.8909 41.9656 20.2035L42 21.3195C42 29.9465 35.0553 36.9395 26.4889 36.9395V32.4763C29.4483 32.4763 32.2309 31.3161 34.323 29.2085C34.7264 28.8035 35.0937 28.3715 35.4251 27.9182C35.0291 27.9812 34.6233 28.0139 34.2101 28.0139ZM13.7555 28.0139C9.47237 28.0139 6 24.517 6 20.2035C6 15.8909 9.47237 12.394 13.7555 12.394C18.0387 12.394 21.5111 15.8909 21.5111 20.2035L21.5455 21.3195C21.5455 29.9465 14.6007 36.9395 6.03437 36.9395V32.4763C8.99373 32.4763 11.7764 31.3161 13.8685 29.2085C14.2718 28.8035 14.6392 28.3715 14.9705 27.9182C14.5745 27.9812 14.1687 28.0139 13.7555 28.0139Z'
              fill='#FFFFFF'
            />
          </svg>
        </div>
        <p className='w-[272px] font-noto-serif-h4-medium mb-[20px]'>
          {content}
        </p>
        {linkUrl && (
          <a
            href={linkUrl}
            className='
              block mx-auto py-[4px] px-[12px] font-genseki-body-s-regular text-figma-accent-blue-normal
              rounded-[18px] cursor-pointer border border-figma-accent-blue-normal transition-colors duration-300
              hover:text-figma-secondary-950 hover:border-figma-secondary-950 text-center
            '
          >
            Show more
          </a>
        )}
      </div>
    )
  }

  return (
    <div
      id={id}
      data-order={order}
      className='w-[320px] p-[24px] rounded-[16px]'
      style={{
        backgroundColor: color?.bg,
        color: color?.text,
      }}
    >
      <div
        className='inline-block p-[20px] mb-[24px] rounded-[64px] border'
        style={{ borderColor: color?.text }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='49'
          viewBox='0 0 48 49'
          fill='none'
        >
          <path
            d='M34.2101 28.0139C29.9269 28.0139 26.4545 24.517 26.4545 20.2035C26.4545 15.8909 29.9269 12.394 34.2101 12.394C38.4933 12.394 41.9656 15.8909 41.9656 20.2035L42 21.3195C42 29.9465 35.0553 36.9395 26.4889 36.9395V32.4763C29.4483 32.4763 32.2309 31.3161 34.323 29.2085C34.7264 28.8035 35.0937 28.3715 35.4251 27.9182C35.0291 27.9812 34.6233 28.0139 34.2101 28.0139ZM13.7555 28.0139C9.47237 28.0139 6 24.517 6 20.2035C6 15.8909 9.47237 12.394 13.7555 12.394C18.0387 12.394 21.5111 15.8909 21.5111 20.2035L21.5455 21.3195C21.5455 29.9465 14.6007 36.9395 6.03437 36.9395V32.4763C8.99373 32.4763 11.7764 31.3161 13.8685 29.2085C14.2718 28.8035 14.6392 28.3715 14.9705 27.9182C14.5745 27.9812 14.1687 28.0139 13.7555 28.0139Z'
            fill={color?.text}
          />
        </svg>
      </div>
      <p className='w-[272px] font-noto-serif-h4-medium mb-[20px]'>{content}</p>
      {linkUrl && (
        <a
          href={linkUrl}
          className='
            block mx-auto py-[4px] px-[12px] font-genseki-body-s-regular text-figma-accent-blue-normal
            rounded-[18px] border border-figma-accent-blue-normal cursor-pointer transition-colors duration-300
            hover:text-figma-secondary-950 hover:border-figma-secondary-950 text-center
          '
        >
          Show more
        </a>
      )}
    </div>
  )
}

export default FeedbackCardItem
