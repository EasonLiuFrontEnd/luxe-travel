import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { Label } from './Label'

type TOption = {
  value: string
  label: string
}

type TRadioFieldGroupProps = {
  options: TOption[]
  value?: string
  onValueChange: (value: string) => void
  name: string
  className?: string
  orientation?: 'horizontal' | 'vertical'
  labelClassName?: string
  disabled?: boolean
}

export const RadioFieldGroup = ({
  options,
  value,
  onValueChange,
  name,
  className,
  orientation = 'horizontal',
  labelClassName,
  disabled = false,
}: TRadioFieldGroupProps) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
      className={cn(
        'flex items-center',
        orientation === 'horizontal' ? 'gap-4' : 'flex-col gap-2',
        className,
      )}
    >
      {options.map((option) => (
        <Label
          key={option.value}
          htmlFor={`${name}-${option.value}`}
          className={cn(
            'flex items-center gap-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer',
            'disabled:cursor-not-allowed disabled:opacity-50',
            labelClassName,
          )}
        >
          <RadioGroupItem
            value={option.value}
            id={`${name}-${option.value}`}
            disabled={disabled}
          />
          {option.label}
        </Label>
      ))}
    </RadioGroup>
  )
}
