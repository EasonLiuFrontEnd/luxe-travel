'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        // Base styling - 無圓角，20px 尺寸
        'peer shrink-0 border-2 transition-colors outline-none rounded-none cursor-pointer w-5 h-5 aspect-square',
        // Figma-specific colors and states
        'border-figma-secondary-500 bg-white',
        'data-[state=checked]:border-figma-secondary-500 data-[state=checked]:bg-figma-secondary-500',
        // Focus states
        'focus-visible:ring-2 focus-visible:ring-figma-secondary-500 focus-visible:ring-opacity-50',
        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Error state
        'aria-invalid:border-figma-function-alert',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        {/* 無勾選圖標，純色填充 */}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
