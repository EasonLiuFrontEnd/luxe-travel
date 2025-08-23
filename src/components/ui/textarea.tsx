import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        // Base Figma-matching styles
        'flex w-full bg-transparent outline-none transition-colors field-sizing-content',
        // Figma-specific border (bottom only) and spacing
        'border-0 border-b border-[rgba(56,56,65,0.7)] px-0 py-3 min-h-16',
        // Figma typography
        'font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950',
        // Figma placeholder color
        'placeholder:text-[#b7b8c2] placeholder:font-genseki-body-m-regular',
        // Focus states
        'focus:border-figma-primary-950 focus:outline-none',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Error state
        'aria-invalid:border-figma-function-alert',
        // Resize behavior
        'resize-none',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
