import Image from 'next/image'
import FlightCard from './FlightCard'
import { flightData } from '../../config'
import TitleIcon from '../../Featured/icons/TitleIcon'

const Flight = () => {
  return (
    <div>
      <div className='flex items-center mb-3'>
        <TitleIcon
          topColor='#926D3C'
          bottomColor='#926D3C'
          scale={0.9}
          className='mr-2'
        />
        <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
          參考航班
        </p>
      </div>
      <div className='flex flex-col gap-y-5 py-5 px-4 xl:p-7 rounded-2xl bg-figma-neutral-0'>
        <div className='flex max-xl:flex-col items-center max-xl:gap-y-4 xl:gap-x-4'>
          <div className='box-content w-[32px] text-center font-genseki-body-s-bold text-figma-secondary-950 py-2 px-[10px] rounded-[40px] border border-figma-secondary-950'>
            去程
          </div>
          <div className='w-full flex flex-col gap-y-6 py-7 max-xl:px-5 xl:pt-7 xl:pl-8 xl:pb-[40px] rounded-[8px] bg-figma-secondary-50'>
            {flightData.map((flight) =>
              flight.direction === '去程' ? (
                <FlightCard key={flight.day} flight={flight} />
              ) : null,
            )}
          </div>
        </div>
        <div className='flex max-xl:flex-col items-center max-xl:gap-y-4 xl:gap-x-4'>
          <div className='box-content w-[32px] text-center font-genseki-body-s-bold text-figma-secondary-950 py-2 px-[10px] rounded-[40px] border border-figma-secondary-950'>
            回程
          </div>
          <div className='w-full flex flex-col gap-y-6 py-7 max-xl:px-5 xl:pt-7 xl:pl-8 xl:pb-[40px] rounded-[8px] bg-figma-secondary-50'>
            {flightData.map((flight) =>
              flight.direction === '回程' ? (
                <FlightCard key={flight.day} flight={flight} />
              ) : null,
            )}
          </div>
        </div>

        <div className='flex gap-x-2 items-start xl:items-center font-genseki-body-m-medium text-figma-primary-500 py-7 pl-4 pr-5 xl:p-7 rounded-2xl bg-figma-secondary-150'>
          <Image
            src='/tour-content/airplain.svg'
            alt='airplane'
            width={24}
            height={24}
          />
          參考航班,正確班機時刻表視航空班次的確認,敝公司保留調整之權利,以出發前說明會準。
        </div>
      </div>
    </div>
  )
}

export default Flight
