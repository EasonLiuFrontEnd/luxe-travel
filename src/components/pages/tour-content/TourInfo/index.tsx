'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import DepartureDate from './DepartureDate'
import Flight from './Flight'
import Registration from './Registration'
import Feedback from './Feedback'
import PriceIncludes from './PriceIncludes'
import TitleIcon from '../Highlight/icons/TitleIcon'
import type {
  TTour,
  TFlight,
  TTourProduct,
  TFeedback,
} from '@/api/tour-content'

type TTourInfoProps = {
  category: 'GROUP' | 'FREE'
  tours: TTour[]
  flights: TFlight[]
  mapUrl?: TTourProduct['map']
  note: string
  deposit?: string
  feedback?: TFeedback
  description?: string
}

const TourInfo = ({
  category,
  tours,
  flights,
  mapUrl,
  note,
  deposit,
  feedback,
  description,
}: TTourInfoProps) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(
    tours[0]?.id || '',
  )
  const noteLines = note.split('\n')

  const handleTourSelect = (id: string) => {
    setSelectedTourId(id)
  }

  return (
    <div
      id='tour-info'
      className='flex flex-col xl:flex-row  pb-7 px-4 xl:pb-7 xl:px-9'
    >
      <div className='order-2 xl:order-1 w-full xl:max-w-[48.7vw] box-content flex flex-col gap-y-5 xl:pt-3.5 xl:px-7 xl:pb-7'>
        {category === 'GROUP' && (
          <DepartureDate tours={tours} onTourSelect={handleTourSelect} />
        )}
        {category === 'FREE' && feedback && <Feedback feedback={feedback} />}
        {category === 'FREE' && description && (
          <PriceIncludes description={description} />
        )}
        <Flight flights={flights} />
        {mapUrl && (
          <Image
            key='flight-map'
            src={mapUrl}
            alt='flight-map'
            width={866}
            height={644}
            className='w-full object-cover py-5 px-7 xl:p-7 rounded-2xl bg-figma-neutral-0'
          />
        )}
        <div className='flex flex-col gap-y-2.5 p-5 xl:p-7 rounded-2xl bg-figma-secondary-150'>
          <div className='flex items-center'>
            <TitleIcon
              topColor='#926D3C'
              bottomColor='#926D3C'
              scale={0.9}
              className='mr-2'
            />
            <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
              NOTE
            </p>
          </div>
          <p className='font-family-genseki leading-[1.5] text-figma-primary-500'>
            {noteLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < noteLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        {category === 'GROUP' && (
          <div className='relative flex flex-col bg-figma-neutral-0 rounded-2xl'>
            <h5
              className={cn(
                'relative mx-auto font-noto-serif-h5-bold text-figma-secondary-500 py-4 px-7 rounded-b-2xl bg-figma-primary-50',
                styles['concave-border'],
              )}
            >
              貼心安排
            </h5>
            <ul className='box-content xl:h-[289px] list-disc font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950 pt-7 px-4 pb-10 xl:pt-9 xl:px-9 xl:pb-11 ml-6'>
              <li>需要從後端補資料</li>
            </ul>
            <div className='absolute left-[-5px] bottom-[-10px] xl:left-[-10px] xl:bottom-[-22px] flex items-center gap-x-5'>
              <p className='font-family-noto-serif text-[32px] xl:text-[64px] max-xl:font-medium leading-[1.2] text-figma-secondary-100'>
                Made to
              </p>
              <p className='font-family-luxurious text-[64px] xl:text-[96px] leading-[1.2] text-figma-secondary-100'>
                measyre
              </p>
            </div>
          </div>
        )}
      </div>
      <Registration
        category={category}
        tours={tours}
        deposit={deposit}
        selectedTourId={selectedTourId}
        className='order-1 xl:order-2'
      />
    </div>
  )
}

export default TourInfo
