'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'

const Checkbox = ({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer shrink-0 border transition-colors outline-none rounded-none cursor-pointer w-5 h-5 aspect-square',
        'border-figma-secondary-500 bg-white',
        'data-[state=checked]:border-figma-secondary-500 data-[state=checked]:bg-figma-secondary-500',
        'focus-visible:ring-2 focus-visible:ring-figma-secondary-500 focus-visible:ring-opacity-50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-figma-function-alert',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      ></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
