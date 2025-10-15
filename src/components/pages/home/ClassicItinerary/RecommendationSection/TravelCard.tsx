'use client'

import IconCta from '@/components/shared/icons/IconCta'
import Image from 'next/image'
type TTravelCardProps = {
  image?: string
  tagText: string
  tagColor: 'primary' | 'secondary'
  title: string
  description: string
  price: string
  priceColor?: 'primary' | 'secondary'
  hoverTitle?: string
  hoverDescription?: string
  onClick?: () => void
  className?: string
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
  className = '',
}: TTravelCardProps) => {
  const tagColorStyles = {
    primary: 'bg-[var(--color-figma-primary-500)]',
    secondary: 'bg-[var(--color-figma-secondary-500)]',
  }

  const priceColorStyles = {
    primary: 'text-[var(--color-figma-primary-950)]',
    secondary: 'text-[var(--color-figma-secondary-950)]',
  }

  const arrowColorStyles = {
    primary: 'text-[var(--color-figma-primary-950)]',
    secondary: 'text-[var(--color-figma-secondary-950)]',
  }

  return (
    <div
      className={`flex flex-row md:grid md:grid-rows-subgrid md:row-span-4 gap-3 rounded-[16px] xl:rounded-[16px] rounded-[4px] cursor-pointer w-full min-w-0 group ${className}`}
      onClick={onClick}
    >
      <div className='w-full max-w-[96px] md:max-w-full aspect-square aspect-[120/120] overflow-hidden relative rounded-[4px]'>
        {image && image.trim() !== '' ? (
          <Image
            key={`travel-card-${title}`}
            src={image}
            alt={title}
            className='absolute w-full h-full object-cover rounded-[4px] hover-fade-scale'
            width={238}
            height={238}
          />
        ) : (
          <div className='absolute w-full h-full bg-figma-neutral-200 rounded-[4px] flex items-center justify-center'>
            <span className='text-figma-neutral-400 text-[12px]'>No image</span>
          </div>
        )}
        <div
          className={`absolute ${tagColorStyles[tagColor]} box-border flex gap-2.5 items-center justify-center px-1 py-0 left-0 xl:right-0 xl:left-auto top-3 xl:top-3 top-2`}
        >
          <div className='font-family-genseki text-[12px] leading-[1.5] text-white whitespace-nowrap px-2'>
            {tagText}
          </div>
        </div>
      </div>

      <div className='flex flex-col md:contents gap-3 md:gap-0 items-end md:items-start justify-start w-full'>
        <div className='flex flex-col md:contents gap-2 md:gap-0 items-start justify-between w-full'>
          <div
            className={`flex flex-wrap gap-1.5 items-center justify-start w-full min-w-0 ${hoverTitle ? 'relative overflow-hidden' : ''}`}
          >
            <div
              className={`font-family-genseki text-[var(--color-figma-primary-950)] text-[14px] leading-[1.5] ${hoverTitle ? 'transition-opacity duration-300 ease-out group-hover:opacity-0' : ''}`}
            >
              {title}
            </div>
            {hoverTitle && (
              <div className='font-family-genseki text-[var(--color-figma-primary-950)] text-[14px] leading-[1.5] absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100'>
                {hoverTitle}
              </div>
            )}
          </div>

          <div className='flex flex-col md:contents gap-4 md:gap-0 items-end md:items-start justify-start w-full'>
            <div
              className={`font-family-genseki font-medium text-[var(--color-figma-primary-950)] text-[16px] leading-[1.5] w-full min-w-0 ${hoverDescription ? 'relative overflow-hidden' : ''}`}
            >
              <div
                className={`${hoverDescription ? 'transition-opacity duration-300 ease-out group-hover:opacity-0' : ''}`}
              >
                {description}
              </div>
              {hoverDescription && (
                <div className='absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100'>
                  {hoverDescription}
                </div>
              )}
            </div>

            <div className='flex items-center justify-between w-full min-w-0'>
              <div
                className={`font-family-noto-serif font-semibold text-[18px] leading-[1.5] ${priceColorStyles[priceColor]}`}
              >
                {price}
              </div>

              <div className='w-[24.68px] group-hover:w-[37.68px] transition-all duration-300 overflow-hidden'>
                <IconCta className={`${arrowColorStyles[tagColor]}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelCard
