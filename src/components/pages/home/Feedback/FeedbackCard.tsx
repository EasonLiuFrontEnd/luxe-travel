'use client'

import Image from "next/image"
import { useState } from 'react'

const FeedbackCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`relative flex flex-col items-center w-[523px] pt-[103px] pb-[24px] px-[24px] bg-figma-neutral-0 ${isExpanded ? 'max-h-[714px]' : 'max-h-[374px]'}`}>
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
      <p className={`mb-[20px] ${isExpanded ? '' : 'line-clamp-6'} overflow-hidden`}>
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

export default FeedbackCard