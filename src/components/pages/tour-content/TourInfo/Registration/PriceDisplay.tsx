import { cn } from '@/lib/utils'

type TPriceDisplayProps = {
  value: string
  prefix?: string
  suffix?: string
  className?: string
  valueClassName?: string
  applyStyleOnAllText?: boolean
}

type TPriceState = {
  display: string
  color: string
  isValid: boolean
}

const getPriceState = (value: string): TPriceState => {
  if (value === 'NIL') {
    return { display: '無此報價', color: 'text-figma-primary-300', isValid: false }
  }

  const numValue = parseInt(value, 10)
  if (Number.isNaN(numValue) || numValue === 0) {
    return {
      display: '敬請電洽',
      color: 'text-figma-secondary-950',
      isValid: false,
    }
  }

  return { display: `$${value}`, color: 'text-figma-primary-950', isValid: true }
}

const PriceDisplay = ({
  value,
  prefix,
  suffix,
  className,
  valueClassName,
  applyStyleOnAllText = false,
}: TPriceDisplayProps) => {
  const { display, color, isValid } = getPriceState(value)

  if (!isValid) {
    return <span className={cn(className, color)}>{display}</span>
  }

  if (applyStyleOnAllText) {
    return (
      <span className={cn(className, color, valueClassName)}>
        {prefix && `${prefix}`}
        {display}
        {suffix && `${suffix}`}
      </span>
    )
  }

  return (
    <span className={cn(className, color)}>
      {prefix && `${prefix} `}
      <span className={valueClassName}>{display}</span>
      {suffix && `${suffix}`}
    </span>
  )
}

export default PriceDisplay
