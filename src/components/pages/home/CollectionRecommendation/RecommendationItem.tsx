import Image from 'next/image'
import IconCta from '@/components/shared/icons/IconCta'

type TRecommendationItem = {
  id: string
  title: string
  country: string
  imageSrc: string
  imageAlt: string
  linkUrl: string
}

type TRecommendationItemProps = {
  item: TRecommendationItem
  onClick?: (linkUrl: string) => void
  style?: React.CSSProperties
  className?: string
}

const RecommendationItem = ({
  item,
  onClick,
  className,
  style,
}: TRecommendationItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item.linkUrl)
    }
  }

  return (
    <div
      className={`group cursor-pointer ${className}`}
      onClick={handleClick}
      style={style}
    >
      <Image
        key={`recommendation-${item.country}`}
        src={item.imageSrc}
        alt={item.imageAlt}
        width={60}
        height={60}
        className='rounded-[4px] w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] md:w-[50px] md:h-[50px] object-cover flex-shrink-0'
      />

      <div className='flex flex-col justify-start h-full flex-1'>
        <div className='flex flex-col gap-[6px] h-full'>
          <p className='font-genseki-body-s-regular text-figma-primary-950'>
            {item.title}
          </p>

          <div className='flex items-center justify-between w-full h-full'>
            <p className='font-genseki-h6-bold text-figma-primary-950 mb-auto'>
              {item.country}
            </p>
            <div className='w-[48px] h-[24px] flex-shrink-0 flex items-center justify-end text-figma-secondary-950 mt-auto'>
              <IconCta />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationItem
