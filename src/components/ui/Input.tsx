import { cn } from '@/lib/utils'

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex w-full bg-transparent outline-none transition-colors',
        'border-0 border-b border-figma-primary-950-70 px-0 py-3',
        'font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
        'placeholder:text-figma-primary-300 placeholder:font-genseki-body-m-regular',
        'focus:border-figma-primary-950 focus:outline-none',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-figma-primary-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-figma-function-alert',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
