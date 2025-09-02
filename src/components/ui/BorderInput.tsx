import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type TBorderInputProps = React.ComponentProps<'input'> & {
  showCounter?: boolean
  counterMax?: number
}

export const BorderInput = forwardRef<HTMLInputElement, TBorderInputProps>(
  ({ className, showCounter = false, counterMax = 100, ...props }, ref) => {
    const currentLength = props.value ? String(props.value).length : 0

    return (
      <div className='w-full relative'>
        <div className='flex flex-wrap gap-2.5 items-center justify-start px-0 py-3 w-full border-b border-figma-primary-950-70'>
          <input
            ref={ref}
            className={cn(
              'flex-1 bg-transparent border-none outline-none',
              'font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
              'placeholder:text-figma-primary-300',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'focus:outline-none',
              className,
            )}
            {...props}
            maxLength={showCounter ? counterMax : props.maxLength}
          />
          {showCounter && (
            <div className='flex gap-1.5 items-center justify-start shrink-0'>
              <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                {currentLength}/{counterMax}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  },
)

BorderInput.displayName = 'BorderInput'
