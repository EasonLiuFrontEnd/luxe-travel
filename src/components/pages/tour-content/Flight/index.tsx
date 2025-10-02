import FlightCard from './FlightCard'
import { flightData } from '../config'

const Flight = () => {
  return (
    <div>
      <div className='flex items-center mb-3'>
        <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none' className='p-1 mr-2'>
          <path d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z' fill='#926D3C' />
          <path d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z' fill='#926D3C' />
        </svg>
        <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>參考航班</p>
      </div>
      <div className='flex flex-col gap-y-5 p-7 rounded-2xl bg-figma-neutral-0'>
        <div className='flex items-center gap-x-4'>
          <div className='box-content w-[32px] text-center font-genseki-body-s-bold text-figma-secondary-950 py-3 px-[10px] rounded-[40px] border border-figma-secondary-950'>
            去程
          </div>
          <div className='flex flex-col gap-y-6 pt-7 pl-8 pb-[40px] rounded-[8px] bg-figma-secondary-50'>
            {flightData.map(flight =>
              flight.direction === '去程' ?
                <FlightCard key={flight.day} flight={flight} /> : null
            )}
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
          <div className='box-content w-[32px] text-center font-genseki-body-s-bold text-figma-secondary-950 py-3 px-[10px] rounded-[40px] border border-figma-secondary-950'>
            回程
          </div>
          <div className='flex flex-col gap-y-6 pt-7 pl-8 pb-[40px] rounded-[8px] bg-figma-secondary-50'>
            {flightData.map(flight =>
              flight.direction === '回程' ?
                <FlightCard key={flight.day} flight={flight} /> : null
            )}
          </div>
        </div>

        <div className='flex gap-x-2 items-center font-genseki-body-m-medium text-figma-primary-500 p-7 rounded-2xl bg-figma-secondary-150'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path d="M6 18L8 18L13 10.4211L18.5 10.4211C19.33 10.4211 20 9.78632 20 9C20 8.21368 19.33 7.57895 18.5 7.57895L13 7.57895L8 -5.24537e-07L6 -6.11959e-07L8.5 7.57895L3 7.57895L1.5 5.68421L0 5.68421L1 9L0 12.3158L1.5 12.3158L3 10.4211L8.5 10.4211L6 18Z" fill="#926D3C" />
          </svg>
          參考航班,正確班機時刻表視航空班次的確認,敝公司保留調整之權利,以出發前說明會準。
        </div>
      </div>
    </div>
  )
}

export default Flight