import type { TBaseComponent } from '@/types'
import IconCta from '@/components/shared/icons/IconCta'

type TTravelCardProps = TBaseComponent & {
  image: string
  tagText: string
  tagColor: 'primary' | 'secondary'
  title: string
  description: string
  price: string
  priceColor?: 'primary' | 'secondary'
  hoverTitle?: string
  hoverDescription?: string
  onClick?: () => void
}

const TravelCard = ({
  image,
  tagText,
  tagColor,
  title,
  description,
  price,
  priceColor = 'secondary',
  hoverTitle,
  hoverDescription,
  onClick,
  className = ''
}: TTravelCardProps) => {
  const tagColorStyles = {
    primary: 'bg-[var(--color-figma-primary-500)]',
    secondary: 'bg-[var(--color-figma-secondary-500)]'
  }

  const priceColorStyles = {
    primary: 'text-[var(--color-figma-primary-950)]',
    secondary: 'text-[var(--color-figma-secondary-950)]'
  }

  const arrowColorStyles = {
    primary: 'text-[var(--color-figma-primary-950)]',
    secondary: 'text-[var(--color-figma-secondary-950)]'
  }

  return (
    <div 
      className={`flex flex-col gap-3 grow min-w-0 rounded-[16px] cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative rounded-[4px] w-full">
        <div 
          className="absolute w-full h-full bg-center bg-cover bg-no-repeat rounded-[4px] transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={`absolute ${tagColorStyles[tagColor]} box-border flex gap-2.5 items-center justify-center px-1 py-0 right-0 top-2`}>
          <div className="font-family-genseki text-[12px] leading-[1.5] text-white whitespace-nowrap">
            {tagText}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 items-end justify-start w-full">
        <div className="flex flex-col gap-2 items-start justify-start w-full">
          <div className={`flex flex-wrap gap-1.5 items-center justify-between w-full ${hoverTitle ? 'relative overflow-hidden' : ''}`}>
            <div className={`font-family-genseki text-[var(--color-figma-primary-950)] text-[14px] leading-[1.5] whitespace-nowrap ${hoverTitle ? 'transition-transform duration-300 ease-out group-hover:-translate-y-full' : ''}`}>
              {title}
            </div>
            {hoverTitle && (
              <div className="font-family-genseki text-[var(--color-figma-primary-950)] text-[14px] leading-[1.5] whitespace-nowrap absolute top-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {hoverTitle}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4 items-end justify-start w-full">
            <div className={`font-family-genseki font-medium text-[var(--color-figma-primary-950)] text-[16px] leading-[1.5] w-full ${hoverDescription ? 'relative overflow-hidden' : ''}`}>
              <div className={`${hoverDescription ? 'transition-transform duration-300 ease-out group-hover:-translate-y-full' : ''}`}>
                {description}
              </div>
              {hoverDescription && (
                <div className="absolute top-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  {hoverDescription}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between w-full">
              <div className={`font-family-noto-serif font-semibold text-[18px] leading-[1.5] whitespace-nowrap ${priceColorStyles[priceColor]}`}>
                {price}
              </div>
              <div className={`h-6 w-12 relative ${arrowColorStyles[tagColor]}`}>
                <IconCta />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelCard