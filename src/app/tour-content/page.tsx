'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import Banner from '@/components/pages/tour-content/Banner'
import DepartureDate from '@/components/pages/tour-content/DepartureDate'
import Flight from '@/components/pages/tour-content/Flight'
import Registration from '@/components/pages/tour-content/Registration'
import Featured from '@/components/pages/tour-content/Featured'
import DailyItinerary from '@/components/pages/tour-content/DailyItinerary'

const TourContentPage = () => {
  return (
    <div className='bg-figma-neutral-50'>
      <Banner />
      <div className='flex pb-7 px-9'>
        <div className='box-content flex flex-col gap-y-5 pt-3.5 px-7 pb-7 w-[914px]'>
          <DepartureDate />
          <Flight />
          <Image
            key='flight-map'
            src='/tour-content/flight-map.jpg'
            alt='flight-map'
            width={866}
            height={644.14}
            className='box-content w-[866px] h-[644px] p-7 rounded-2xl bg-figma-neutral-0'
          />
          <div className='flex flex-col gap-y-2.5 p-7 rounded-2xl bg-figma-secondary-150'>
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
                NOTE
              </p>
            </div>
            <p className='font-family-genseki leading-[1.5] text-figma-primary-500'>
              上方為參考航班，實際航班時間以航空公司為最終確認。若因航空公司或不可抗力因素，變動航班時間或轉機點，造成團體行程變更、增加餐食，本公司將不另行加價。若行程變更、減少餐食，則酌於退費。幾乎所有外籍航空公司之團體機票(含燃油附加稅)一經開票後，均無退票價值，此點基於航空公司之規定，敬請見諒。因應航空公司開票及保險的需求，及為了提供您在旅途中更完善的服務，請務必在繳交訂金的時候填妥客戶基本資料表。旅客資料表下載
              <br />
              <br />
              西班牙為君主立憲制國家,如皇室舉行活動而關閉任何國內景點,不會提前預告,且西班牙宗教節慶假期多元,並對於團體訂票規則採行嚴格實名制,如遇滿或不開放參觀,則依行程順暢度改安排其他替代之門票,如對於此狀況無法接受者,煩請貴賓們斟酌報名,以免影響您的遊興。
            </p>
          </div>
          <div className='relative flex flex-col bg-figma-neutral-0 rounded-2xl'>
            <h5
              className={cn(
                'relative mx-auto font-noto-serif-h5-bold text-figma-secondary-500 py-4 px-7 rounded-b-2xl bg-figma-primary-50',
                styles['concave-border'],
              )}
            >
              貼心安排
            </h5>
            <ul className='box-content h-[289px] list-disc font-genseki-h6-regular text-figma-primary-950 pt-9 px-9 pb-11 ml-6'>
              <li>提供【隨身無線導覽耳機】每人一台。</li>
              <li>贈送每人一張【歐洲網路卡】。</li>
              <li>贈送每位旅客行李綁帶及歐洲轉換插頭各乙只。</li>
              <li>為每位旅客提高投保履約責任險500萬/醫療20萬。</li>
              <li>
                旅客未滿 15 歲或 70
                歲以上,依保險規定最高上限【意外死殘保額新臺幣 200
                萬元、意外醫療保額新臺幣 20 萬,有額外需要敬請自行加購旅平】。
              </li>
            </ul>
            <div className='absolute left-[-10px] bottom-[-22px] flex items-center gap-x-5'>
              <p className='font-noto-serif-h2-regular text-figma-secondary-100'>
                Made to
              </p>
              <p className='font-luxurious-deco-l-regular text-figma-secondary-100'>
                measyre
              </p>
            </div>
          </div>
        </div>
        <Registration />
      </div>
      <Featured />
      <DailyItinerary />
    </div>
  )
}
export default TourContentPage
