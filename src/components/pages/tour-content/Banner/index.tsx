import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { TTourProduct } from '@/api/tour-content'

type TBannerProps = Pick<
  TTourProduct,
  'category' | 'namePrefix' | 'name' | 'mainImageUrl'
>

const Banner = ({ category, namePrefix, name, mainImageUrl }: TBannerProps) => {
  const { isMobile } = useMediaQuery()
  const iconSize = isMobile ? 16 : 24
  const iconPath = isMobile ? 'M6 12L10 8L6 4' : 'M9 18L15 12L9 6'
  const strokeWidth = isMobile ? 1.33 : 2
  return (
    <div
      id='banner'
      className='flex flex-col gap-y-5 xl:gap-y-8 py-8 px-4 xl:pt-10 xl:px-9'
    >
      <div className='flex items-center xl:gap-x-2 font-family-genseki text-[12px] xl:text-[16px] xl:font-medium leading-[1.5] text-figma-primary-500'>
        <p>{category === 'GROUP' ? '精緻團體行' : '歐洲自由行'}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={iconSize}
          height={iconSize}
          viewBox={`0 0 ${iconSize} ${iconSize}`}
          fill='none'
        >
          <path
            d={iconPath}
            stroke='#5B5B6E'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p>
          {namePrefix}——{name}
        </p>
      </div>
      <div className='relative'>
        {isMobile && (
          <button
            className={cn(
              'absolute top-0 right-0 pl-3 pb-3 rounded-bl-2xl bg-figma-neutral-50 cursor-pointer',
              styles['link-concave-border'],
            )}
          >
            <Image
              src='/tour-content/link.svg'
              alt='link'
              width={40}
              height={40}
            />
          </button>
        )}
        <Image
          key='tour-content-theme-banner'
          src={mainImageUrl}
          alt={`${namePrefix} ${name}`}
          width={1824}
          height={670}
          className='h-[460px] xl:h-[670px] object-cover rounded-2xl'
          priority
        />
        <div
          className={cn(
            'absolute bottom-0 flex max-xl:flex-col justify-center xl:items-center max-xl:gap-y-1 xl:gap-x-4 py-2 px-4 xl:py-4 xl:pl-7 xl:pr-[72px] bg-figma-neutral-50 rounded-se-2xl',
            styles['title-concave-border'],
          )}
        >
          <h2 className='font-family-noto-serif font-bold text-[32px] xl:text-[64px] leading-[1.5] xl:leading-[1.2] text-figma-secondary-500'>
            {namePrefix}
          </h2>

          {!isMobile && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='120'
              height='1'
              viewBox='0 0 120 1'
              fill='none'
            >
              <path d='M0 0.5H120' stroke='#BDA05E' />
            </svg>
          )}
          <h3 className='font-family-noto-serif text-[16px] xl:text-[40px] font-semibold xl:font-bold leading-[1.5] xl:leading-[1.2] text-figma-primary-500'>
            {name}
          </h3>
        </div>
      </div>
    </div>
  )
}
export default Banner
