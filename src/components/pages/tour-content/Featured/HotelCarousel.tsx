import Image from 'next/image'
import FeaturedCarousel from './FeaturedCarousel'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const HotelCarousel = () => {
  const { isMobile } = useMediaQuery()
  return (
    <>
      <div
        className='relative py-[40px] px-4 xl:pt-[150px] xl:px-[240px] xl:pb-[172px]'
        style={{
          background:
            'linear-gradient(180deg, #F5F5F5 0%, rgba(189, 160, 94, 0.25) 40%, rgba(189, 160, 94, 0.25) 80%, #F5F5F5 100%)',
        }}
      >
        {isMobile ? (
          <>
            <Image
              src='/tour-content/plus-aggregate-m.svg'
              alt='plus-aggregate-m'
              width={90}
              height={90}
              className='rounded-2xl object-cover absolute top-0 left-0 z-0'
            />
            <Image
              src='/tour-content/plus-aggregate-large-m.svg'
              alt='plus-aggregate-large-m'
              width={111}
              height={88}
              className='rounded-2xl object-cover absolute bottom-0 right-0 translate-y-[45%] z-0'
            />
          </>
        ) : (
          <>
            <Image
              src='/tour-content/plus-aggregate.svg'
              alt='plus-aggregate'
              width={290}
              height={290}
              className='rounded-2xl object-cover absolute top-0 left-0 z-0'
            />
            <Image
              src='/tour-content/plus-aggregate-large.svg'
              alt='plus-aggregate-large'
              width={429}
              height={395}
              className='rounded-2xl object-cover absolute bottom-0 right-0 translate-y-[45%] z-0'
            />
          </>
        )}
        <FeaturedCarousel
          images={['/tour-content/hotel-lobby.jpg']}
          className='rounded-2xl overflow-hidden z-10'
        />
      </div>
      <div className='mx-[20px] xl:mx-[240px] mb-[40px] xl:mb-[150px]'>
        <h3 className='font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] mb-[40px] xl:mb-11'>
          <p className='text-figma-secondary-500'>典藏旅遊</p>
          <p className='text-figma-primary-950'>為您精選高性價比的飯店</p>
        </h3>
        <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
          我們不譁眾取寵,而是把您的每一分費用花在真正的需要上。
          <br />
          <br />
          一趟美好的旅遊,除了精緻的行程外,優質的住宿同樣重要,
          <br />
          我們為您精選具高性價比的飯店,除優質四星飯店外,我們更安排了六晚五星級飯店,
          <br />
          一晚哥多華、一晚格拉納達、二晚里斯本、二晚巴塞隆納,讓您在一天飽覽歐洲美景後,
          <br />
          能在舒適的飯店享受一夜好眠,迎接下一天的精彩。
        </p>
      </div>
    </>
  )
}

export default HotelCarousel
