import { cn } from '@/lib/utils'

type TFormSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
  hasBorder?: boolean
  borderColor?: string
}

export const FormSection = ({
  title,
  children,
  className,
  hasBorder = false,
  borderColor = 'border-figma-secondary-500',
}: TFormSectionProps) => {
  return (
    <div
      className={cn(
        'flex flex-col self-stretch bg-white rounded-2xl w-full p-8 gap-4',
        hasBorder && `border ${borderColor}`,
        className,
      )}
    >
      <div className='flex flex-col gap-1'>
        <h3 className='font-noto-serif-h5-bold text-[18px] text-figma-primary-950'>
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}
