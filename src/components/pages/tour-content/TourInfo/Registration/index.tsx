import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PriceDisplay from './PriceDisplay'
import type { TTour } from '@/api/tour-content'

type TRegistrarionProps = {
  category: 'GROUP' | 'FREE' | 'RCAR'
  tours: TTour[]
  selectedTourId?: string
  priceMin: number
  className?: string
}

const calculateDays = (departDate: string, returnDate: string): number => {
  const depart = new Date(departDate)
  const ret = new Date(returnDate)
  const diffTime = Math.abs(ret.getTime() - depart.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
}

const Registration = ({
  category,
  tours,
  selectedTourId,
  priceMin,
  className,
}: TRegistrarionProps) => {
  const { isMobile } = useMediaQuery()

  if (!tours || tours.length === 0) {
    return null
  }

  const tour = selectedTourId
    ? tours.find((t) => t.id === selectedTourId) || tours[0]
    : tours[0]

  if (!tour) {
    return null
  }

  const days = calculateDays(tour.departDate, tour.returnDate)

  const getColorClass = (value: string): string => {
    if (value === 'NIL') {
      return 'text-figma-primary-300'
    }
    const numValue = parseInt(value, 10)
    if (Number.isNaN(numValue) || numValue === 0) {
      return 'text-figma-secondary-950'
    }
    return 'text-figma-primary-950'
  }

  const depositColor = getColorClass(tour.deposit)
  const adultColor = getColorClass(tour.adult)
  const childWithBedColor = getColorClass(tour.childWithBed)
  const childExtraBedColor = getColorClass(tour.childExtraBed)
  const childNoBedColor = getColorClass(tour.childNoBed)
  const infantColor = getColorClass(tour.infant)

  const priceValueClassName =
    'font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2] tracking-[1.6px]'

  return (
    <div
      className={cn(
        'xl:box-content xl:w-[45.9vw] xl:h-[590px] xl:sticky xl:top-12 flex flex-col gap-y-[30px] p-5 xl:p-7 xl:mt-[49px] xl:mr-7 mb-5 xl:mb-7 rounded-2xl bg-figma-neutral-0 font-family-genseki text-[16px] xl:text-[20px] leading-[1.2] xl:leading-[1.5] text-figma-primary-950',
        className,
      )}
    >
      {!isMobile && (
        <button
          className={cn(
            'absolute top-0 right-0 pl-3 pb-3 rounded-bl-2xl bg-figma-neutral-50 cursor-pointer',
            styles['concave-border'],
          )}
        >
          <Image
            src='/tour-content/link.svg'
            alt='link'
            width={40}
            height={40}
          />
        </button>
      )}
      <div className='flex max-xl:flex-col max-xl:gap-y-7 xl:gap-x-7'>
        {category === 'GROUP' && (
          <div className='xl:min-w-[328px] mr-[50px]'>
            <div className='flex justify-between'>
              <p className='font-genseki-body-m-medium max-xl:mr-[10px]'>
                出發日期
              </p>
              <button className='font-genseki-body-s-regular text-figma-secondary-950 underline cursor-pointer'>
                更改出發日
              </button>
            </div>
            <div>
              <span className='font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2] tracking-[1.6px] mr-3'>
                {tour.departDate} - {tour.returnDate}
              </span>
              <span>
                共
                <span className='font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2]'>
                  {days}
                </span>
                天
              </span>
            </div>
          </div>
        )}
        <div className='min-w-[328px]'>
          <p className='font-genseki-body-m-medium'>訂金</p>
          <p>
            <PriceDisplay
              value={tour.deposit}
              suffix='/每人'
              valueClassName={priceValueClassName}
              applyStyleOnAllText={true}
              className={depositColor}
            />
          </p>
        </div>
      </div>
      {category === 'GROUP' && (
        <div>
          <p className='font-genseki-body-m-medium mb-3'>團費說明</p>
          <div className='grid grid-cols-[auto_1fr] xl:grid-cols-[184px_1fr] gap-x-5 xl:gap-x-7 gap-y-2.5 items-center'>
            <span>大人（年滿12歲）</span>
            <span>
              <PriceDisplay
                value={tour.adult}
                prefix='每位'
                suffix='起'
                valueClassName={cn(priceValueClassName, 'mx-2')}
                className={adultColor}
              />
            </span>
            <span className='max-xl:col-span-2'>小孩（2-未滿12歲）</span>
            <div className='max-xl:col-span-2 flex flex-wrap gap-x-5 max-xl:gap-y-3 xl:gap-x-[30px]'>
              <p>
                佔床
                <PriceDisplay
                  value={tour.childWithBed}
                  suffix='起'
                  valueClassName={priceValueClassName}
                  className={cn(childWithBedColor, 'ml-2')}
                />
              </p>
              <p>
                加床
                <PriceDisplay
                  value={tour.childExtraBed}
                  suffix='起'
                  valueClassName={priceValueClassName}
                  className={cn(childExtraBedColor, 'ml-2')}
                />
              </p>
              <p>
                不佔床
                <PriceDisplay
                  value={tour.childNoBed}
                  suffix='起'
                  valueClassName={priceValueClassName}
                  className={cn(childNoBedColor, 'ml-2')}
                />
              </p>
            </div>
            <span>嬰兒（未滿2歲）</span>
            <PriceDisplay
              value={tour.infant}
              suffix='起'
              valueClassName={priceValueClassName}
              className={infantColor}
            />
          </div>
        </div>
      )}
      <div className='xl:pb-[30px] xl:border-b xl:border-figma-secondary-500'>
        <div className='flex items-center gap-x-[10px] mb-3'>
          <Image
            src='/tour-content/notice.svg'
            alt='link'
            width={24}
            height={24}
          />
          <p className='font-genseki-body-m-medium'>備註</p>
        </div>
        <div className='font-genseki-body-m-regular text-figma-primary-400'>
          {!tour.note ? '無' : tour.note}
        </div>
      </div>
      {!isMobile && (
        <div className='flex justify-between'>
          <h3 className='font-noto-serif-h3-bold text-figma-secondary-500'>
            ＄{priceMin?.toLocaleString() || '無此報價'}
            <span className='font-genseki-h6-regular ml-2'>起</span>
          </h3>
          <button className='box-content w-[336px] min-w-[128px] font-genseki-h6-regular text-figma-primary-0 py-[9px] px-7 rounded-[60px] bg-figma-function-available-normal hover:bg-figma-function-available-light cursor-pointer'>
            我要報名
          </button>
        </div>
      )}
    </div>
  )
}

export default Registration
