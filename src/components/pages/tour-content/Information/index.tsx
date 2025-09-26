import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/ui/Carousel'
import { mockTimeSlots } from '../config'
import TimeSlotCard from './TimeSlotCard'

const Information = () => {
  return (
    <div className="flex pb-7 px-9">
      <div className="box-content flex flex-col gap-y-5 py-3.5 px-7 w-[914px]">
        {/* 出發日期 */}
        <div className="gap-y-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="p-1 mr-2">
              <path d="M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z" fill="#926D3C"/>
              <path d="M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z" fill="#926D3C"/>
            </svg>
            <p className="font-noto-serif-body-l-semibold text-figma-secondary-950">出發日期</p>
          </div>
          <div className="p-7 rounded-2xl bg-figma-neutral-0">
            <Carousel
              opts={{
                slidesToScroll: 1,
                containScroll: 'trimSnaps',
                align: 'start'
              }}
              className="relative"
            >
              <CarouselContent className="gap-x-3">
                {mockTimeSlots.map((slot) => (
                  <CarouselItem key={slot.id} className="basis-auto pl-0">
                    <TimeSlotCard slot={slot} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information