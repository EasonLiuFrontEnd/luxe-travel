import Image from 'next/image'
import IconCta from '@/components/shared/icons/IconCta'
import type { TBaseComponent } from '@/types'
import type { TRecommendationItem } from './config'

type TRecommendationItemProps = TBaseComponent & {
  item: TRecommendationItem
  onClick?: () => void
}

const RecommendationItem = ({
  item,
  onClick,
  className,
}: TRecommendationItemProps) => {
  return (
    <div className={`group cursor-pointer ${className}`} onClick={onClick}>
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        width={60}
        height={60}
        className='rounded-lg'
      />

      <div>
        <p className='font-medium text-gray-900 mb-2'>{item.title}</p>

        <div className='flex items-center justify-between'>
          <p className='text-gray-600'>{item.country}</p>
          <div className='w-[24.68px] group-hover:w-[37.68px] transition-all duration-300 overflow-hidden'>
            <IconCta />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationItem
