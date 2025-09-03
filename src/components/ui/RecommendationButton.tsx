import type { TBaseComponent } from '@/types'

type TRecommendationButtonProps = TBaseComponent & {
  text: string
  variant?: 'primary' | 'secondary'
}

const RecommendationButton = ({ 
  text, 
  variant = 'primary', 
  className = '',
  ...props 
}: TRecommendationButtonProps) => {
  const variantStyles = {
    primary: 'border-[var(--color-figma-secondary-500)] text-[var(--color-figma-secondary-500)] hover:border-[var(--color-figma-secondary-950)] hover:text-[var(--color-figma-secondary-950)]',
    secondary: 'border-[var(--color-figma-primary-500)] text-[var(--color-figma-primary-500)] hover:border-[var(--color-figma-secondary-950)] hover:text-[var(--color-figma-secondary-950)]'
  }

  return (
    <div 
      className={`box-border flex gap-2 items-center justify-end px-3 py-1 relative rounded-[18px] border border-solid cursor-pointer transition-colors duration-300 ease-out ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <div className="font-family-genseki text-[14px] leading-[1.5] whitespace-nowrap">
        {text}
      </div>
    </div>
  )
}

export default RecommendationButton