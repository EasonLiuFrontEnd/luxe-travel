import { cn } from '@/lib/utils'
import { TBaseComponent } from '@/types'

type TCarouselControlsProps = TBaseComponent & {
  current: number
  count: number
  onPrevious: () => void
  onNext: () => void
}

const CarouselControls = ({
  current,
  count,
  onPrevious,
  onNext,
  className,
}: TCarouselControlsProps) => {
  const formatNumber = (num: number) => {
    return String(num).padStart(2, '0')
  }

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <button
        onClick={onPrevious}
        className={cn(
          'w-[24px] h-[24px] rounded-full cursor-pointer',
          'flex items-center justify-center',
          'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
          'transition-colors duration-200',
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='14'
          viewBox='0 0 8 14'
          fill='none'
        >
          <path
            d='M7 13.1426L1 7.14258L7 1.14258'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <div className='font-genseki-body-m-medium text-figma-secondary-500'>
        {formatNumber(current + 1)} / {formatNumber(count)}
      </div>

      <button
        onClick={onNext}
        className={cn(
          'w-[24px] h-[24px] rounded-full cursor-pointer',
          'flex items-center justify-center',
          'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
          'transition-colors duration-200',
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='14'
          viewBox='0 0 8 14'
          fill='none'
        >
          <path
            d='M1 13.1426L7 7.14258L1 1.14258'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  )
}

export default CarouselControls
