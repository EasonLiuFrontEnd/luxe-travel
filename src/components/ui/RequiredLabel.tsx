import { cn } from '@/lib/utils'

type TRequiredLabelProps = {
  children: React.ReactNode
  required?: boolean
  className?: string
  subText?: string
  requiredText?: string
}

export const RequiredLabel = ({
  children,
  required = false,
  className,
  subText,
  requiredText,
}: TRequiredLabelProps) => {
  return (
    <div className='flex flex-wrap gap-0.5 items-center justify-start'>
      <div className='flex gap-1 items-center justify-start'>
        <div
          className={cn(
            "font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950",
            className,
          )}
        >
          {children}
        </div>
        {required && (
          <span className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
            *
          </span>
        )}
      </div>
      {subText && (
        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
          {subText}
        </span>
      )}
      {requiredText && (
        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-function-alert'>
          {requiredText}
        </span>
      )}
    </div>
  )
}
