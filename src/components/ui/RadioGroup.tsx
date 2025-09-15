'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'aspect-square size-5 shrink-0 rounded-full border transition-colors outline-none cursor-pointer',
        'border-figma-secondary-500 bg-white',
        'data-[state=checked]:border-figma-secondary-500 data-[state=checked]:bg-figma-secondary-500',
        'focus-visible:ring-2 focus-visible:ring-figma-secondary-500 focus-visible:ring-opacity-50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-figma-function-alert',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
