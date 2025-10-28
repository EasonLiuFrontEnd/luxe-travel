import { useMemo } from 'react'
import Image from 'next/image'
import FlightCard from './FlightCard'
import type { TFlight } from '@/api/tour-content'
import TitleIcon from '../../Highlight/icons/TitleIcon'

type TFlightProps = {
  flights: TFlight[]
}

const Flight = ({ flights }: TFlightProps) => {
  const groupedFlights = useMemo(() => {
    const outbound = flights
      .filter((f) => f.direction === 'OUTBOUND')
      .sort((a, b) => a.day - b.day)
    const returnFlights = flights
      .filter((f) => f.direction === 'RETURN')
      .sort((a, b) => a.day - b.day)

    return [
      { key: 'outbound', label: '去程', flights: outbound },
      { key: 'return', label: '回程', flights: returnFlights },
    ]
  }, [flights])

  const remarks = useMemo(
    () => flights.filter((f) => f.remark).map((f) => f.remark),
    [flights],
  )

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
        {groupedFlights.map(({ key, label, flights: flightList }) => (
          <div
            key={key}
            className='flex max-xl:flex-col items-center max-xl:gap-y-4 xl:gap-x-4'
          >
            <div className='box-content min-w-[32px] text-center font-genseki-body-s-bold text-figma-secondary-950 py-2 px-[10px] rounded-[40px] border border-figma-secondary-950'>
              {label}
            </div>
            <div className='w-full flex flex-col gap-y-6 py-7 max-xl:px-5 xl:pt-7 xl:pl-8 xl:pb-[40px] rounded-[8px] bg-figma-secondary-50'>
              {flightList.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </div>
        ))}

        {remarks.length > 0 && (
          <div className='flex gap-x-2 items-start xl:items-center font-genseki-body-m-medium text-figma-primary-500 py-7 pl-4 pr-5 xl:p-7 rounded-2xl bg-figma-secondary-150'>
            <Image
              src='/tour-content/airplain.svg'
              alt='airplane'
              width={24}
              height={24}
            />
            <div className='flex flex-col gap-y-2'>
              {remarks.map((remark, index) => (
                <p key={index}>{remark}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flight
