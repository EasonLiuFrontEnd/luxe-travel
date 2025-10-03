import ItineraryCarousel from './ItineraryCarousel'
import { cn } from "@/lib/utils"
import styles from "./styles.module.css"
import { TBaseComponent } from "@/types"
import type { TItinerary } from '../config'

type TItineraryCardProps = TBaseComponent & {
  itenerary: TItinerary
}

const ItineraryCard = ({ itenerary }: TItineraryCardProps) => {
  return (
    <div className="min-h-[700px] ml-[152px] mr-9 rounded-2xl bg-figma-neutral-0">
      <div className="flex justify-between">
        <h3 className={cn("relative px-7 rounded-ee-2xl bg-figma-neutral-50", styles['concave-border'])}>
          <span className="font-luxurious-deco-l-regular text-figma-secondary-500 mr-6">{itenerary.day}</span>
          <span className="font-noto-serif-h3-bold text-figma-primary-500">{itenerary.destination}</span>
        </h3>
      </div>
      <div className="box-content flex gap-x-9 pt-[28px] px-7 pb-9">
        <div className="flex flex-col w-[541px] h-full justify-between">
          <div>
            <div className="flex items-center mb-8">
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none' className='p-1 mr-2'>
                <path d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z' fill='#926D3C' />
                <path d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z' fill='#926D3C' />
              </svg>
              <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>參考行車時間距離</p>
            </div>
            <div className="flex flex-col gap-y-7 font-noto-serif-title-medium text-figma-primary-950 whitespace-nowrap">
              {itenerary.route.map((route, index) => (
                <div key={index} className="flex items-center gap-x-4">
                  <p>{route.start}</p>
                  <div className="w-full text-center font-genseki-body-m-medium text-figma-primary-500">
                    <p>{route.time}</p>
                    <div className={styles['horizontal-line']}></div>
                    <p>{route.distance}</p>
                  </div>
                  <p>{route.end}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="w-7 h-[3px] bg-figma-secondary-950 mt-[27px] mb-5"></div>
            <p className="font-genseki-h6-regular text-figma-primary-950">{itenerary.routeDescription}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-5">
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none' className='p-1 mr-2'>
              <path d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z' fill='#926D3C' />
              <path d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z' fill='#926D3C' />
            </svg>
            <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>精選行程</p>
          </div>
          <ItineraryCarousel />
        </div>
      </div>
    </div>
  )
}
export default ItineraryCard