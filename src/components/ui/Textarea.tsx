import { cn } from '@/lib/utils'

const Textarea = ({
  className,
  ...props
}: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full bg-transparent outline-none transition-colors field-sizing-content',
        'border-0 border-b border-[rgba(56,56,65,0.7)] px-0 py-3 min-h-16',
        'font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
        'placeholder:text-[#b7b8c2] placeholder:font-genseki-body-m-regular',
        'focus:border-figma-primary-950 focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-figma-function-alert',
        'resize-none',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
