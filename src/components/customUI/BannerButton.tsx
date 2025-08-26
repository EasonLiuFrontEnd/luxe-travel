import type { TButton } from '@/types/components'
import { cn } from '@/lib/utils'

const Button = ({
  children,
  size = 'md',
  onClick,
  disabled = false,
  className,
  ...props
}: TButton) => {
  const baseClasses = 'transition-all duration-300 cursor-pointer'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-8 py-4 text-xl',
    '2xl': 'px-8 py-4 text-2xl',
    '3xl': 'px-8 py-4 text-3xl',
  }

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  )

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
