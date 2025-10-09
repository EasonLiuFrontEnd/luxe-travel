import Image from 'next/image'
import type { TFlight } from '../config'
import styles from './style.module.css'

type TFlightCardProps = {
  flight: TFlight
  className?: string
}

const FlightCard = ({ flight, className = '' }: TFlightCardProps) => {
  return (
    <div className={`w-[770px] flex gap-x-3.5 ${className}`}>
      <p className='font-family-luxurious text-4xl tracking-[3.6px] text-figma-secondary-500'>
        Day {flight.day}
      </p>
      <div className='flex flex-col gap-y-4'>
        <div>
          <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
            {flight.departure.time}
          </p>
          <p className='font-genseki-body-s-regular text-figma-primary-500'>
            {flight.departure.code}
          </p>
        </div>
        <p className='font-genseki-body-xs-regular text-figma-primary-500'>
          {flight.duration}
        </p>
        <div className='relative'>
          <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
            {flight.arrival.time}
          </p>
          {flight.arrival.dayOffset && (
            <p className='absolute right-[10px] top-[-6px] font-noto-serif-body-m-semibold text-figma-accent-brown'>
              +{flight.arrival.dayOffset}
            </p>
          )}
          <p className='font-genseki-body-s-regular text-figma-primary-500'>
            {flight.arrival.code}
          </p>
        </div>
      </div>
      <div className={styles['vertical-line']}></div>
      <div className='flex flex-col justify-between'>
        <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
          {flight.departure.airport}
        </p>
        <div>
          <div className='flex items-center'>
            <Image
              src='/tour-content/EVA Air.jpg'
              alt='EVA-icon'
              width={93}
              height={72}
              className='w-5 h-5'
            />
            <p className='font-genseki-body-s-regular text-figma-primary-950'>
              {flight.airline}
            </p>
          </div>
          <p className='font-genseki-body-xs-regular text-figma-primary-500'>
            航班 {flight.flightNumber}
          </p>
        </div>
        <p className='font-noto-serif-body-l-semibold text-figma-primary-950'>
          {flight.arrival.airport}
        </p>
      </div>
    </div>
  )
}

export default FlightCard
