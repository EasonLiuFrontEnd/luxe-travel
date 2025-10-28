'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import styles from './style.module.css'
import '@/styles/components.css'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const ThemePage = () => {
  return (
    <div className={styles.background}>
      <div className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)] pt-[112px] pb-8'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/group-tours'>團體專區</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/group-tours/theme'>主題旅遊</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>德國啤酒節</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)] flex flex-col items-center gap-7 pb-8'>
        <div className='flex justify-center gap-2'>
          <span className='font-noto-serif-h2-bold text-figma-secondary-500'>德國</span>
          <span className='font-noto-serif-h2-bold text-figma-primary-950 gradient-title-border'>啤酒節</span>
        </div>

        <span className='relative font-noto-serif-title-medium text-figma-secondary-500 before:content-[" "] before:block before:w-[60px] before:h-[1px] before:bg-figma-secondary-500 before:absolute before:top-1/2 before:left-[calc(100%+24px)] before:transform before:-translate-y-1/2 after:content-[" "] after:block after:w-[60px] after:h-[1px] after:bg-figma-secondary-500 after:absolute after:top-1/2 after:right-[calc(100%+24px)] after:transform after:-translate-y-1/2'>2025 Oktoberfest</span>
      </div>

      <section className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)] flex justify-center items-center gap-6 pb-[calc(40px+18px)]'>
        {/* TODO: 最左邊卡片(256*256) hover會切換圖片 */}
        <div className={cn('rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat aspect-[256/256] max-w-[256px] max-h-[256px]', styles.bannerImage01)}>
          <Image src='/theme/card.png' alt='banner-01' width={256} height={256} className='w-full h-full object-cover' />
        </div>

        {/* TODO: 中間左側卡片(368*404) hover時會出現文字 */}
        <div className='flex flex-col justify-center items-center'>
          <span className={cn('relative font-noto-serif-h3-bold text-figma-secondary-500 before:bg-figma-secondary-500 before:absolute before:w-[40px] before:h-[1.5px] before:top-1/2 before:left-[-40px] after:content-[" "] after:block after:w-[40px] after:h-[1.5px] after:bg-figma-secondary-500 after:absolute after:top-1/2 after:left-full', styles.bannerTitle)}>O'zapft is!</span>

          <div className={cn('w-full h-full aspect-[368/404] max-w-[368px] max-h-[404px] relative rounded-2xl', styles.bannerImage02)}>
            <div className='font-genseki-body-l-regular text-figma-primary-950 bg-figma-secondary-300 absolute bottom-0 left-0 max-h-[202px] py-6 px-7 rounded-2xl'>
              <p className='line-clamp-6'>
                一年一度在慕尼黑舉辦的啤酒節活動(Oktoberfest),每年都吸引數百萬人湧進這充滿典雅風情的大城市。現場如大型的戶外遊樂場~ 啤酒帳篷、充滿著彩色燈光的遊樂設施，歡迎各國觀光客前來共遊,體驗這色彩繽紛的啤酒世界。彩繽紛的啤酒世界。
              </p>
            </div>
          </div>
        </div>

        {/* TODO: 中間卡片(480*519) 4張重疊(只有第一張有圖片) 滑鼠向下拖曳會出現下一張卡片(但卡片重疊數量不變) 每張卡片的下方中間有個半圓凹槽 */}
        <div className='flex flex-col justify-center items-center relative w-full h-full aspect-[480/519] max-w-[480px] max-h-[519px] '>
          <div className='w-full h-full border border-figma-secondary-950 rounded-2xl absolute top-0 left-0'></div>
          <div className='w-full h-full border border-figma-secondary-950 rounded-2xl absolute top-[6px] left-0'></div>
          <div className='w-full h-full border border-figma-secondary-950 rounded-2xl absolute top-[12px] left-0'></div>
          <div className={cn('w-full h-full rounded-2xl absolute top-[18px] left-0', styles.bannerImage05)}></div>
        </div>

        {/* TODO: 中間右側卡片(368*412) 靜態圖片 無任何效果 */}
        <div className='flex flex-col justify-center items-center'>
          <span className='font-luxurious-deco-l-regular text-figma-secondary-500'>9/20 - 10/5</span>
          <div className={cn('w-full h-full aspect-[368/412] max-w-[368px] max-h-[412px] rounded-2xl', styles.bannerImage03)}></div>
        </div>

        {/* TODO: 最右邊卡片(256*256) hover會切換圖片 */}
        <div className={cn('rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat aspect-[256/256] max-w-[256px] max-h-[256px]', styles.bannerImage04)}>
          <Image src='/theme/bg.png' alt='banner-04' width={256} height={256} className='w-full h-full object-cover' />
        </div>
      </section>

      <section className='w-full h-[343px] relative'>
        <div className={cn('w-full h-full absolute inset-0 opacity-15', styles.bookImage01)}></div>
        <div className={cn('w-full h-full absolute inset-0 opacity-15', styles.bookImage02)}></div>
      </section>

      <section className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)]'>
        {/* TODO: 這邊使用和group-tours相同的GroupTourCard元件 是否要共用GroupTourCard元件? */}
      </section>
    </div>
  )
}

export default ThemePage
