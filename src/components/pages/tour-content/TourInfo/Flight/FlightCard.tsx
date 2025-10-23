import Image from 'next/image'
import type { TFlight } from '@/api/tour-content'
import styles from './style.module.css'

type TFlightCardProps = {
  flight: TFlight
  className?: string
}

const FlightCard = ({ flight, className = '' }: TFlightCardProps) => {
  const formattedDay = flight.day.toString().padStart(2, '0')

  return (
    <div
      className={`xl:w-[90%] flex max-xl:flex-col max-xl:gap-y-3.5 xl:gap-x-3.5 ${className}`}
    >
      <p className='font-family-luxurious text-4xl tracking-[3.6px] text-figma-secondary-500'>
        Day {formattedDay}
      </p>
      <div className='flex gap-x-3 xl:gap-x-3.5'>
        <div className='flex flex-col gap-y-4'>
          <div>
            <p className='font-family-noto-serif text-[16px] xl:text-[18px] font-semibold leading-[1.5] text-figma-primary-950'>
              {flight.departTime}
            </p>
            <p className='font-genseki-body-s-regular text-figma-primary-500'>
              {flight.departAirport}
            </p>
          </div>
          <p className='font-genseki-body-xs-regular text-figma-primary-500'>
            {flight.duration}
          </p>
          <div className='relative'>
            <p className='font-family-noto-serif text-[16px] xl:text-[18px] font-semibold leading-[1.5] text-figma-primary-950'>
              {flight.arriveTime}
            </p>
            {flight.crossDay && (
              <p className='absolute right-[10px] top-[-6px] font-noto-serif-body-m-semibold text-figma-accent-brown'>
                +1
              </p>
            )}
            <p className='font-genseki-body-s-regular text-figma-primary-500'>
              {flight.arriveAirport}
            </p>
          </div>
        </div>
        <div className={styles['vertical-line']}></div>
        <div className='flex flex-col justify-between'>
          <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
            {flight.departName}({flight.departAirport})
          </p>
          <div>
            <div className='flex items-center'>
              <Image
                key={`flight-airline-${flight.id}`}
                src={''}
                alt='EVA-icon'
                width={93}
                height={72}
                className='w-5'
              />
              <p className='font-genseki-body-s-regular text-figma-primary-950'>
                {flight.airlineName}
              </p>
            </div>
            <p className='font-genseki-body-xs-regular text-figma-primary-500'>
              航班 {flight.flightNo}
            </p>
          </div>
          <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
            {flight.arriveName}({flight.arriveAirport})
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlightCard
