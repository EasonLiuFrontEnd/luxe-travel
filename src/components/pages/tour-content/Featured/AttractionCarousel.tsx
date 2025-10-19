'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import TitleIcon from './icons/TitleIcon'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'

const items = [
  { id: 1, text: '西班牙經典城市探索' },
  { id: 2, text: '葡萄牙魅力城鎮與自然奇觀之旅' },
  { id: 3, text: '傾聽西葡心靈旋律' },
]

const sceneImages = [
  {
    id: 'a',
    src: '/tour-content/scene-a.jpg',
    alt: 'scene-a',
    position: 'top' as const,
  },
  {
    id: 'b',
    src: '/tour-content/scene-b.jpg',
    alt: 'scene-b',
    position: 'bottom' as const,
  },
  {
    id: 'c',
    src: '/tour-content/scene-c.jpg',
    alt: 'scene-c',
    position: 'top' as const,
  },
  {
    id: 'd',
    src: '/tour-content/scene-d.jpg',
    alt: 'scene-d',
    position: 'bottom' as const,
  },
  {
    id: 'aa',
    src: '/tour-content/scene-a.jpg',
    alt: 'scene-aa',
    position: 'top' as const,
  },
  {
    id: 'bb',
    src: '/tour-content/scene-b.jpg',
    alt: 'scene-bb',
    position: 'bottom' as const,
  },
  {
    id: 'cc',
    src: '/tour-content/scene-c.jpg',
    alt: 'scene-cc',
    position: 'top' as const,
  },
  {
    id: 'dd',
    src: '/tour-content/scene-d.jpg',
    alt: 'scene-dd',
    position: 'bottom' as const,
  },
]

const cityCards = [
  {
    id: 1,
    number: '01',
    subtitle: '優雅之都，西班牙之心',
    cityZh: '馬德里',
    cityEn: 'Madrid',
  },
  {
    id: 2,
    number: '02',
    subtitle: '伊莎貝拉的傳奇,夢幻之城',
    cityZh: '塞哥維亞',
    cityEn: 'Segovia',
  },
  {
    id: 3,
    number: '03',
    subtitle: '白牆紅花的詩意巷弄,南方花園城市',
    cityZh: '哥多華',
    cityEn: 'Cordoba',
  },
  {
    id: 4,
    number: '04',
    subtitle: '摩爾文化的瑰寶,石榴之城',
    cityZh: '格拉納達',
    cityEn: 'Grabada',
  },
  {
    id: 41,
    number: '04',
    subtitle: '摩爾文化的瑰寶,石榴之城',
    cityZh: '格拉納達',
    cityEn: 'Grabada',
  },
  {
    id: 42,
    number: '04',
    subtitle: '摩爾文化的瑰寶,石榴之城',
    cityZh: '格拉納達',
    cityEn: 'Grabada',
  },

]

const AttractionCarousel = () => {
  const [activeId, setActiveId] = useState(1)
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollState()
    api.on('select', updateScrollState)
    api.on('reInit', updateScrollState)

    return () => {
      api.off('select', updateScrollState)
      api.off('reInit', updateScrollState)
    }
  }, [api])

  const { isMobile } = useMediaQuery()

  return (
    <>
      <Carousel
        opts={{ loop: true, dragFree: false, watchDrag: false, align: 'start' }}
        plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className='w-full mt-[41px] xl:mt-[112px]'
      >
        <CarouselContent className='flex'>
          {sceneImages.map((image, index) => (
            <CarouselItem key={image.id} className='basis-auto'>
              <Image
                src={image.src}
                alt={image.alt}
                width={428}
                height={664}
                className={cn(
                  'w-[clamp(215px,30vw,428px)] h-[clamp(334px,46vw,664px)] mr-7 xl:mr-10 rounded-2xl object-cover',
                  index % 2 === 0 ? 'mt-[95px] xl:mt-[190px]' : 'mb-[95px] xl:mb-[190px]',
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='bg-figma-secondary-100'>
        <div className='flex flex-col ml-4 xl:ml-12 rounded-es-2xl bg-figma-neutral-50'>
          <div className='flex max-xl:flex-col xl:items-end gap-x-5 pt-[40px] pl-4 pb-[36px] xl:pt-12 xl:pl-[105px] xl:pb-[72px]'>
            <div className='xl:min-w-[520px] pb-6'>
              <h3 className='font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] mb-[40px] xl:mb-[148px]'>
                <div className='text-figma-secondary-500'>西葡名城——</div>
                <div className='text-figma-primary-950'>
                  一次走訪,經典必訪無一遺漏
                </div>
              </h3>
              <div className='flex flex-col'>
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      'flex items-center p-[10px] text-left transition-colors cursor-pointer',
                      activeId === item.id
                        ? 'text-figma-secondary-500'
                        : 'text-figma-primary-950 hover:text-figma-secondary-500',
                    )}
                  >
                    <TitleIcon
                      topColor='#B0AFAB'
                      bottomColor='#C4A980'
                      className='mr-4'
                    />
                    <p className='font-family-noto-serif text-[18px] xl:text-[24px] font-semibold xl:font-bold leading-[1.5] xl:leading-[1.2]'>{item.text}</p>
                  </button>
                ))}
              </div>
            </div>
            <Carousel
              setApi={setApi}
              opts={{ watchDrag: false }}
              className='w-full overflow-hidden'
            >
              <CarouselContent className='-ml-0'>
                {cityCards.map((city) => (
                  <CarouselItem
                    key={city.id}
                    className='box-content pl-0 basis-auto'
                  >
                    <div className='p-7 border-r border-figma-secondary-500'>
                      <div className='font-noto-serif-title-medium text-figma-secondary-500'>
                        {city.number}
                      </div>
                      <div className='font-genseki-body-m-regular text-figma-primary-950'>
                        {city.subtitle}
                      </div>
                      <div className='flex justify-between mt-6'>
                        <div className='min-w-[138px] font-noto-serif-h4-medium text-figma-primary-950 mr-4'>
                          {city.cityZh}
                        </div>
                        <div className='font-luxurious-deco-regular text-figma-secondary-500'>
                          {city.cityEn}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className='ml-auto mr-8 xl:mr-[240px] mb-[58px] xl:mb-[117px]'>
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                'group pt-3 px-4 pb-4 xl:pt-[14px] xl:pl-7 xl:pr-[20px] xl:pb-[18px] mr-4 xl:mr-7 border rounded-[41px] transition-colors',
                canScrollPrev
                  ? 'border-figma-secondary-950 text-[#926D3C] cursor-pointer'
                  : 'border-figma-secondary-300 text-[#E5D9BF] cursor-not-allowed',
              )}
            >
              {isMobile ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 25 9" fill="none">
                  <path d="M24 6.375H25V8.375H24V7.375V6.375ZM4 7.375V8.375H0.317585L3.49418 6.51236L4 7.375ZM24 7.375V8.375H4V7.375V6.375H24V7.375ZM4 7.375L3.49418 6.51236L13.7267 0.512361L14.2326 1.375L14.7384 2.23764L4.50582 8.23764L4 7.375Z" fill="currentColor" />
                </svg>
              ) : (
                <div
                  className={cn(
                    'transition-transform duration-200 origin-right',
                    canScrollPrev && 'group-hover:scale-x-[1.186]',
                  )}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='43'
                    height='12'
                    viewBox='0 0 48 12'
                    fill='none'
                  >
                    <path
                      d='M47 9.14258H48V11.1426H47V10.1426V9.14258ZM4 10.1426V11.1426H0.7311L3.4405 9.31373L4 10.1426ZM47 10.1426V11.1426H4V10.1426V9.14258H47V10.1426ZM4 10.1426L3.4405 9.31373L16.7739 0.313729L17.3333 1.14258L17.8928 1.97143L4.5595 10.9714L4 10.1426Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              )
              }

            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                'group pt-3 px-4 pb-4 xl:pt-[14px] xl:pl-7 xl:pr-[20px] xl:pb-[18px] xl:mr-7 border rounded-[41px] transition-colors',
                canScrollNext
                  ? 'border-figma-secondary-950 text-[#926D3C] cursor-pointer'
                  : 'border-figma-secondary-300 text-[#E5D9BF] cursor-not-allowed',
              )}
            >
              <div
                className={cn(
                  'transition-transform duration-200 origin-left',
                  canScrollNext && 'group-hover:scale-x-[1.186]',
                )}
              >
                {isMobile ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 25 9" fill="none">
                    <path d="M1 6.375H0V8.375H1V7.375V6.375ZM21 7.375V8.375H24.6824L21.5058 6.51236L21 7.375ZM1 7.375V8.375H21V7.375V6.375H1V7.375ZM21 7.375L21.5058 6.51236L11.2733 0.512361L10.7674 1.375L10.2616 2.23764L20.4942 8.23764L21 7.375Z" fill="#926D3C" />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='43'
                    height='12'
                    viewBox='0 0 48 12'
                    fill='none'
                  >
                    <path
                      d='M1 9.14258H0V11.1426H1V10.1426V9.14258ZM44 10.1426V11.1426H47.2689L44.5595 9.31373L44 10.1426ZM1 10.1426V11.1426H44V10.1426V9.14258H1V10.1426ZM44 10.1426L44.5595 9.31373L31.2261 0.313729L30.6667 1.14258L30.1072 1.97143L43.4405 10.9714L44 10.1426Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AttractionCarousel
