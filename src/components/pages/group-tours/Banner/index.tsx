'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TBaseComponent } from '@/types'

type TGroupToursBannerProps = TBaseComponent

const GroupToursBanner = ({ className }: TGroupToursBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = 6

  const handlePrevSlide = () => {
    setCurrentSlide(prev => prev > 1 ? prev - 1 : totalSlides)
  }

  const handleNextSlide = () => {
    setCurrentSlide(prev => prev < totalSlides ? prev + 1 : 1)
  }

  return (
    <section className={`px-3 py-4 xl:px-12 xl:py-15 ${className || ''}`} style={{ backgroundColor: '#F5F5F5' }}>
      <div className='flex flex-col gap-8 max-w-[1824px] mx-auto'>
        <div className='flex gap-6 items-center'>
          <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950 xl:w-[714px]'>
            精緻團體行
          </h1>
        </div>

        <div className='relative w-full h-[400px] xl:h-[670px] rounded-2xl overflow-hidden'>
          <div className='absolute inset-0'>
            <Image
              src='/images/group-tours/spain-portugal-banner.jpg'
              alt='航向伊比利亞 - 西葡珍寶探尋16天'
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='absolute top-0 left-0 rounded-br-2xl px-6 py-3' style={{ backgroundColor: '#F5F5F5' }}>
            <div className='flex gap-5 items-center'>
              <h2 className='font-family-noto-serif font-bold text-[32px] xl:text-[64px] leading-[1.2] text-figma-secondary-500 whitespace-nowrap'>
                航向伊比利亞
              </h2>
              <div className='h-px w-[60px] xl:w-[120px] bg-figma-secondary-500'></div>
              <h3 className='font-family-noto-serif font-bold text-[20px] xl:text-[40px] leading-[1.2] text-figma-primary-500 whitespace-nowrap'>
                西葡珍寶探尋16天
              </h3>
            </div>
          </div>

          <div className='absolute bottom-0 right-0 rounded-tl-2xl px-6 py-3 max-w-[350px] xl:max-w-[715px]' style={{ backgroundColor: '#F5F5F5' }}>
            <p className='font-family-genseki text-figma-primary-500 text-sm xl:text-base leading-[1.5] text-right'>
              走訪伊比利亞半島的璀璨文明，一次收藏西班牙與葡萄牙的藝術、歷史與風土人情。從馬德里到里斯本，沿途探訪世界遺產古城、高第建築、葡萄酒莊與陽光海岸，16 天展開一場經典與浪漫交織的文化之旅。
            </p>
          </div>

          <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 items-center'>
            <button
              onClick={handlePrevSlide}
              className='p-2 text-white hover:text-figma-secondary-500 transition-colors'
              aria-label='Previous slide'
            >
              <ChevronLeft size={32} />
            </button>

            <div className='flex gap-1 items-center text-white font-family-genseki text-2xl leading-[1.2]'>
              <span>{currentSlide.toString().padStart(2, '0')}</span>
              <span>/</span>
              <span>{totalSlides.toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={handleNextSlide}
              className='p-2 text-white hover:text-figma-secondary-500 transition-colors'
              aria-label='Next slide'
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GroupToursBanner