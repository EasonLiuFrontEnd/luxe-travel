import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ImageGrid = () => {
  const { isMobile } = useMediaQuery()

  return (
    <div className='bg-figma-secondary-100'>
      <div className='flex justify-between'>
        <Image
          src='/tour-content/food-a.jpg'
          alt='food-a'
          width={586}
          height={586}
          className='w-[clamp(142px,33vw,586px)] h-[clamp(142px,33vw,586px)] rounded-2xl object-cover mt-10 ml-[27px] xl:mt-12 xl:ml-[301px]'
        />
        <Image
          src='/tour-content/tradition.jpg'
          alt='tradition'
          width={610}
          height={610}
          className='w-[clamp(148px,35vw,610px)] h-[clamp(148px,35vw,610px)] rounded-2xl object-cover mt-[140px] mr-7 ml-[34px] xl:mt-[280px] xl:mr-[288px] xl:ml-[135px]'
        />
      </div>
      <div className='flex max-xl:flex-col'>
        <div className='relative mt-5 ml-[61px] mb-[40px] xl:mt-[64px] xl:ml-[459px] xl:mb-[170px]'>
          {isMobile ? (
            <Image
              src='/tour-content/plus-aggregate-small.svg'
              alt='plus-aggregate-small-m'
              width={58}
              height={58}
              className='absolute top-[-15px] left-[-27px] rounded-2xl object-cover z-0'
            />
          ) : (
            <Image
              src='/tour-content/plus-aggregate-small.svg'
              alt='plus-aggregate-small'
              width={234}
              height={234}
              className='absolute top-[-64px] left-[-113px] rounded-2xl object-cover z-0'
            />
          )}

          <Image
            src='/tour-content/food-b.jpg'
            alt='food-b'
            width={428}
            height={428}
            className='w-[clamp(108px,30vw,428px)] h-[clamp(108px,30vw,428px)] relative rounded-2xl object-cover'
          />
        </div>
        <div className='xl:w-[609px] max-xl:mx-[20px] max-xl:mb-10 xl:mt-[193px] ml-[135px]'>
          <h3 className='font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500 mb-[40px] xl:mb-[45px]'>
            道地西葡統美食、百年餐廳、佛朗明哥舞晚宴---為您呈現多感官的美味盛宴!
          </h3>
          <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
            馬德里百年酒窖餐廳、塞哥維亞香烤乳豬、佛朗明哥舞晚宴、Tapas、法朵
            Fado 晚宴、葡萄牙海鮮
            <br />
            <br />
            燉飯、波多百年餐廳.....豐富的菜色、精彩的表演,為您呈現多感官的美味盛宴。
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageGrid
