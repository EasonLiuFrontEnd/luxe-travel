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
import DraggableCardStack from './DraggableCardStack'
import ThemeToursList from './ThemeToursList'

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
          <span className='font-noto-serif-h2-bold text-figma-secondary-500'>
            德國
          </span>
          <span className='font-noto-serif-h2-bold text-figma-primary-950 gradient-title-border'>
            啤酒節
          </span>
        </div>

        <span className='relative font-noto-serif-title-medium text-figma-secondary-500 before:content-[" "] before:block before:w-[60px] before:h-[1px] before:bg-figma-secondary-500 before:absolute before:top-1/2 before:left-[calc(100%+24px)] before:transform before:-translate-y-1/2 after:content-[" "] after:block after:w-[60px] after:h-[1px] after:bg-figma-secondary-500 after:absolute after:top-1/2 after:right-[calc(100%+24px)] after:transform after:-translate-y-1/2'>
          2025 Oktoberfest
        </span>
      </div>

      <section className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)] flex flex-col-reverse xl:flex-row justify-center items-center gap-6 pb-[40px] relative'>
        <div className='w-full h-[343px] absolute left-0 bottom-[-240px]'>
          <div
            className={cn(
              'w-full h-full absolute inset-0 opacity-10',
              styles.bookImage01,
            )}
          ></div>
          <div
            className={cn(
              'w-full h-full absolute inset-0 opacity-10',
              styles.bookImage02,
            )}
          ></div>
        </div>

        <div className='hidden xl:block rounded-2xl overflow-hidden aspect-[256/256] w-full h-full max-w-[256px] max-h-[256px] relative group/banner01'>
          <Image
            src='/theme/bg.png'
            alt='banner-bg-01'
            width={256}
            height={256}
            className='w-full h-full object-cover absolute inset-0 group-hover/banner01:opacity-0 transition-opacity duration-300'
          />
          <Image
            src='/theme/card.png'
            alt='banner-card-01'
            width={256}
            height={256}
            className='w-full h-full object-cover absolute inset-0 opacity-0 group-hover/banner01:opacity-100 transition-opacity duration-300'
          />
        </div>

        <div className='flex flex-col justify-center items-center w-full max-w-[368px] relative'>
          <div className='absolute top-0 mx-auto'>
            <span
              className={cn(
                'relative font-noto-serif-h3-bold text-figma-secondary-500 before:bg-figma-secondary-500 before:absolute before:w-[40px] before:h-[1.5px] before:top-1/2 before:left-[-40px] after:content-[" "] after:block after:w-[40px] after:h-[1.5px] after:bg-figma-secondary-500 after:absolute after:top-1/2 after:left-full',
                styles.bannerTitle,
              )}
            >
              O&apos;zapft is!
            </span>
          </div>

          <div
            className={cn(
              'w-full h-full aspect-[368/404] max-w-[368px] max-h-[404px] relative rounded-2xl overflow-hidden mt-[56px] group/text-card',
              styles.bannerImage02,
            )}
          >
            <div className='font-genseki-body-l-regular text-figma-primary-950 bg-figma-secondary-300 absolute bottom-0 left-0 w-full max-h-[202px] group-hover/text-card:max-h-[404px] h-full py-6 px-7 rounded-2xl transition-all duration-500 ease-in-out'>
              <p className='line-clamp-6 group-hover/text-card:line-clamp-none'>
                一年一度在慕尼黑舉辦的啤酒節活動(Oktoberfest),每年都吸引數百萬人湧進這充滿典雅風情的大城市。現場如大型的戶外遊樂場~
                啤酒帳篷、充滿著彩色燈光的遊樂設施，歡迎各國觀光客前來共遊,體驗這色彩繽紛的啤酒世界。彩繽紛的啤酒世界。
              </p>
            </div>
          </div>
        </div>

        <DraggableCardStack />

        <div className='hidden xl:flex flex-col justify-center items-center w-full max-w-[368px] relative'>
          <span className='font-luxurious-deco-l-regular text-figma-secondary-500 absolute top-[-24px] left-1/2 -translate-x-1/2 whitespace-nowrap'>
            9/20 - 10/5
          </span>
          <div
            className={cn(
              'w-full h-full aspect-[368/412] max-w-[368px] max-h-[412px] rounded-2xl mt-[56px]',
              styles.bannerImage03,
            )}
          ></div>
        </div>

        <div className='hidden xl:block rounded-2xl overflow-hidden aspect-[256/256] w-full h-full max-w-[256px] max-h-[256px] relative group/banner04'>
          <Image
            src='/theme/card.png'
            alt='banner-bg-04'
            width={256}
            height={256}
            className='w-full h-full object-cover absolute inset-0 group-hover/banner04:opacity-0 transition-opacity duration-300'
          />
          <Image
            src='/theme/bg.png'
            alt='banner-card-04'
            width={256}
            height={256}
            className='w-full h-full object-cover absolute inset-0 opacity-0 group-hover/banner04:opacity-100 transition-opacity duration-300'
          />
        </div>
      </section>

      <section className='w-full max-w-[1920px] mx-auto px-[clamp(12px,2.5vw,48px)] pb-[80px] relative'>
        <ThemeToursList />
      </section>
    </div>
  )
}

export default ThemePage
