'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        // Base styling for Figma design
        'aspect-square size-5 shrink-0 rounded-full border-2 transition-colors outline-none cursor-pointer',
        // Figma-specific colors and states
        'border-figma-primary-300 bg-white',
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
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        {/* 整個圓圈填滿，不需要內部圓點 */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
