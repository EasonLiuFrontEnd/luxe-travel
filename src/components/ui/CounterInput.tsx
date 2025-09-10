import { cn } from '@/lib/utils'

type TCounterInputProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
  className?: string
  disabled?: boolean
}

export const CounterInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  unit = '位',
  className,
  disabled = false,
}: TCounterInputProps) => {
  const handleDecrement = () => {
    if (!disabled && value > min) {
      onChange(Math.max(min, value - 1))
    }
  }

  const handleIncrement = () => {
    if (!disabled && value < max) {
      onChange(Math.min(max, value + 1))
    }
  }

  return (
    <div
      className={cn(
        'flex gap-2.5 items-center justify-start px-0 py-3 border-b border-figma-primary-950-70',
        className,
      )}
    >
      <div className='flex-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950'>
        {label}
      </div>

      <button
        type='button'
        className='backdrop-blur-sm rounded-[25px] border border-figma-primary-300 p-[2px] shrink-0 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={handleDecrement}
        disabled={disabled || value <= min}
      >
        <div className='size-4 flex items-center justify-center'>
          <span className='text-figma-primary-300 text-xs'>-</span>
        </div>
      </button>

      <div className='flex gap-[3px] items-center justify-start'>
        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
          {value}
        </span>
        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
          {unit}
        </span>
      </div>

      <button
        type='button'
        className='backdrop-blur-sm rounded-[25px] border border-figma-primary-950 p-[2px] shrink-0 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={handleIncrement}
        disabled={disabled || value >= max}
      >
        <div className='size-4 flex items-center justify-center'>
          <span className='text-figma-primary-950 text-xs'>+</span>
        </div>
      </button>
    </div>
  )
}
