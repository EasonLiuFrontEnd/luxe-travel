import { cn } from '@/lib/utils'

type TCounterInputProps = {
  label: string
  value: number | undefined
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
  className?: string
  disabled?: boolean
}

export const CounterInput = ({
  label,
  value: valueProp,
  onChange,
  min = 0,
  max = 99,
  unit = '位',
  className,
  disabled = false,
}: TCounterInputProps) => {
  const value = valueProp ?? min
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    if (rawValue === '') {
      onChange(0)
      return
    }

    const inputValue = parseInt(rawValue, 10)
    if (!isNaN(inputValue)) {
      const clampedValue = Math.max(min, Math.min(max, inputValue))
      onChange(clampedValue)
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-start px-0 py-3 border-b border-figma-primary-950-70',
        className,
      )}
    >
      <div className='flex-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950'>
        {label}
      </div>

      <div className='flex items-center gap-[10px]'>
        <button
          type='button'
          className={cn(
            'backdrop-blur-sm rounded-[25px] border p-[2px] shrink-0 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed',
            disabled || value <= min
              ? 'border-figma-primary-300'
              : 'border-figma-primary-950',
          )}
          onClick={handleDecrement}
          disabled={disabled || value <= min}
        >
          <div className='size-4 flex items-center justify-center'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 8H12'
                stroke={disabled || value <= min ? '#b7b8c2' : '#383841'}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </button>

        <div className='flex gap-[3px] items-center justify-start'>
          <input
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className='w-8 h-6 text-center bg-transparent border-none outline-none font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950 cursor-text focus:outline-none'
          />
          <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
            {unit}
          </span>
        </div>

        <button
          type='button'
          className={cn(
            'backdrop-blur-sm rounded-[25px] border p-[2px] shrink-0 cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed',
            disabled || value >= max
              ? 'border-figma-primary-300'
              : 'border-figma-primary-950',
          )}
          onClick={handleIncrement}
          disabled={disabled || value >= max}
        >
          <div className='size-4 flex items-center justify-center'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 4V12M4 8H12'
                stroke={disabled || value >= max ? '#b7b8c2' : '#383841'}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
