'use client'

import Image from "next/image"
import { useState } from 'react'

export type TFeedbackType = 'detailed' | 'quote-short' | 'quote-long'

type TFeedbackCardProps = {
  type: TFeedbackType
}

const FeedbackCard = ({ type }: TFeedbackCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleNavigation = () => {
    console.log('Navigate to feedback page')
  }

  if (type === 'detailed') {
    return (
      <div className={`relative flex flex-col items-center w-[320px] lg:w-[523px] pt-[103px] pb-[24px] px-[24px] bg-figma-neutral-0 rounded-[16px] ${isExpanded ? 'max-h-[714px]' : 'max-h-[374px]'}`}>
        <div className="absolute top-[-28px] flex flex-col items-center">
          <Image
            src='/home/feedback/avatar.jpg'
            alt='avatar'
            width={56}
            height={56}
            className="mb-[12px]"
          />
          <Image
            src='/home/feedback/rating.jpg'
            alt='rating'
            width={88}
            height={16}
            className="mb-[4px]"
          />
          <p className="font-genseki-body-s-bold text-figma-primary-950">Yuting Pan</p>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' width='33' height='33' viewBox='0 0 33 33' fill='none' className='mb-[16px]'>
          <path d='M23.3067 18.8978C20.4513 18.8978 18.1364 16.5665 18.1364 13.6909C18.1364 10.8158 20.4513 8.48451 23.3067 8.48451C26.1622 8.48451 28.4771 10.8158 28.4771 13.6909L28.5 14.4349C28.5 20.1861 23.8702 24.8481 18.1593 24.8481V21.8727C20.1322 21.8727 21.9873 21.0992 23.382 19.6941C23.6509 19.4241 23.8958 19.1361 24.1167 18.834C23.8527 18.876 23.5822 18.8978 23.3067 18.8978ZM9.67036 18.8978C6.81491 18.8978 4.5 16.5665 4.5 13.6909C4.5 10.8158 6.81491 8.48451 9.67036 8.48451C12.5258 8.48451 14.8407 10.8158 14.8407 13.6909L14.8636 14.4349C14.8636 20.1861 10.2338 24.8481 4.52291 24.8481V21.8727C6.49582 21.8727 8.35091 21.0992 9.74564 19.6941C10.0145 19.4241 10.2595 19.1361 10.4804 18.834C10.2164 18.876 9.94582 18.8978 9.67036 18.8978Z' fill='#383841'/>
        </svg>
        <p className={`mb-[20px] font-genseki-body-m-regular ${isExpanded ? '' : 'line-clamp-6'} overflow-hidden`}>
          在選擇蜜月旅行時，看了好多旅行團的行程總是覺得差強人意，更無法接受繳了高額的費用卻可能無法保證期待的景觀列車可以搭乘，但也不希望完全都是自己處理行程的一切，畢竟是第一次要去歐洲，擔心自己缺乏經驗安排的不夠完善等等。在兩方的拉扯中意外發現還有一種「半自助」的方式，因而找上典藏來幫我們客製行程、安排、準備行前的一切事項，包含住宿機票交通等，真的讓忙錄於工作的我們放心不少。旅遊期間有問題詢問也都能隨時獲得答覆，真的非常非常感謝Johnny與Annie這個期間的協助，讓我們可以順利完成旅程。
        </p>
        <button 
          onClick={handleToggle}
          className='py-[4px] px-[12px] font-genseki-body-s-regular text-figma-secondary-500 rounded-[18px] border border-figma-secondary-500 cursor-pointer hover:bg-figma-secondary-500 hover:text-figma-neutral-0'
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    )
  }

  if (type === 'quote-short') {
    return (
      <div className="w-[320px] h-[323px] p-[24px] rounded-[16px] text-figma-accent-blue-normal bg-figma-accent-blue-light">
        <div className="inline-block p-[20px] mb-[24px] rounded-[64px] border border-figma-accent-blue-normal">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
            <path d="M34.2101 28.0139C29.9269 28.0139 26.4545 24.517 26.4545 20.2035C26.4545 15.8909 29.9269 12.394 34.2101 12.394C38.4933 12.394 41.9656 15.8909 41.9656 20.2035L42 21.3195C42 29.9465 35.0553 36.9395 26.4889 36.9395V32.4763C29.4483 32.4763 32.2309 31.3161 34.323 29.2085C34.7264 28.8035 35.0937 28.3715 35.4251 27.9182C35.0291 27.9812 34.6233 28.0139 34.2101 28.0139ZM13.7555 28.0139C9.47237 28.0139 6 24.517 6 20.2035C6 15.8909 9.47237 12.394 13.7555 12.394C18.0387 12.394 21.5111 15.8909 21.5111 20.2035L21.5455 21.3195C21.5455 29.9465 14.6007 36.9395 6.03437 36.9395V32.4763C8.99373 32.4763 11.7764 31.3161 13.8685 29.2085C14.2718 28.8035 14.6392 28.3715 14.9705 27.9182C14.5745 27.9812 14.1687 28.0139 13.7555 28.0139Z" fill="#8BC3DE"/>
          </svg>
        </div>
        <p className="w-[272px] font-noto-serif-h4-medium mb-[20px]">我想只有「典藏」等級才能無後顧之憂的旅遊！</p>
        <button 
          onClick={handleNavigation}
          className='block mx-auto py-[4px] px-[12px] font-genseki-body-s-regular text-figma-accent-blue-normal rounded-[18px] cursor-pointer border border-figma-accent-blue-normal hover:bg-figma-accent-blue-normal hover:text-figma-accent-blue-light'
        >
          Show more
        </button>
      </div>
    )
  }

  return (
    <div className="w-[320px] h-[475px] p-[24px] rounded-[16px] text-figma-primary-0 bg-[url('/home/feedback/scenery.jpg')] bg-cover bg-center">
      <div className="inline-block p-[20px] mb-[24px] rounded-[64px] border border-figma-primary-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
          <path d="M34.2101 28.0139C29.9269 28.0139 26.4545 24.517 26.4545 20.2035C26.4545 15.8909 29.9269 12.394 34.2101 12.394C38.4933 12.394 41.9656 15.8909 41.9656 20.2035L42 21.3195C42 29.9465 35.0553 36.9395 26.4889 36.9395V32.4763C29.4483 32.4763 32.2309 31.3161 34.323 29.2085C34.7264 28.8035 35.0937 28.3715 35.4251 27.9182C35.0291 27.9812 34.6233 28.0139 34.2101 28.0139ZM13.7555 28.0139C9.47237 28.0139 6 24.517 6 20.2035C6 15.8909 9.47237 12.394 13.7555 12.394C18.0387 12.394 21.5111 15.8909 21.5111 20.2035L21.5455 21.3195C21.5455 29.9465 14.6007 36.9395 6.03437 36.9395V32.4763C8.99373 32.4763 11.7764 31.3161 13.8685 29.2085C14.2718 28.8035 14.6392 28.3715 14.9705 27.9182C14.5745 27.9812 14.1687 28.0139 13.7555 28.0139Z" fill="#FFFFFF"/>
        </svg>
      </div>
      <p className="w-[272px] h-[266px] font-noto-serif-h4-medium mb-[20px]">推薦給想嘗試自助旅行又懶得作功課的朋友們！</p>
      <button 
        onClick={handleNavigation}
        className='block mx-auto py-[4px] px-[12px] font-genseki-body-s-regular text-figma-accent-blue-normal rounded-[18px] cursor-pointer border border-figma-accent-blue-normal hover:bg-figma-accent-blue-normal hover:text-figma-accent-blue-light'
      >
        Show more
      </button>
    </div>
  )
}

export default FeedbackCard