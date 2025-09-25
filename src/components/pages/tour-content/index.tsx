import Image from 'next/image'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

const TourContent = ()=> {
  return (
    <div className='bg-figma-neutral-50'>
      <div className='flex flex-col gap-y-8 pt-10 px-9'>
        <div className='flex items-center gap-x-2 font-genseki-body-m-medium text-figma-primary-500'>
          <p>精緻團體行</p>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M9 18L15 12L9 6' stroke='#5B5B6E' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
          <p>航向伊比利亞——西葡珍寶探尋16天</p>
        </div>
        <div className='relative'>
          <Image
            src='/tour-content/theme.jpg'
            alt='theme-banner'
            width={1824}
            height={670}
            className='h-[670px] object-cover rounded-2xl'
          />
          <div className={cn(
              'absolute bottom-0 flex justify-center items-center gap-x-4 py-4 pl-7 pr-[72px] bg-figma-neutral-50 rounded-se-2xl',
              styles['concave-border-before'],
              styles['concave-border-after'],
            )}
          >
            <h2 className='font-noto-serif-h2-bold text-figma-secondary-500'>航向伊比利亞</h2>
            <svg xmlns='http://www.w3.org/2000/svg' width='120' height='1' viewBox='0 0 120 1' fill='none'>
              <path d='M0 0.5H120' stroke='#BDA05E'/>
            </svg>
            <h3 className='font-noto-serif-h3-bold text-figma-primary-500'>西葡珍寶探尋16天</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TourContent