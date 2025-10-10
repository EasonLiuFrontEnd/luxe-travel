import Image from 'next/image'

const ImageGrid = () => {
  return (
    <div className='bg-figma-secondary-100'>
      <div className='flex items-start'>
        <Image
          src='/tour-content/food-a.jpg'
          alt='food-a'
          width={586}
          height={586}
          className='rounded-2xl object-cover mt-[120px] ml-[301px]'
        />
        <Image
          src='/tour-content/tradition.jpg'
          alt='tradition'
          width={610}
          height={610}
          className='rounded-2xl object-cover mt-[281px] ml-[135px]'
        />
      </div>
      <div className='flex'>
        <div className='relative mt-[64px] ml-[459px] mb-[170px]'>
          <Image
            src='/tour-content/plus-aggregate-small.svg'
            alt='plus-aggregat-small'
            width={234}
            height={234}
            className='absolute top-[-64px] left-[-113px] rounded-2xl object-cover z-0'
          />
          <Image
            src='/tour-content/food-b.jpg'
            alt='food-b'
            width={428}
            height={428}
            className='relative rounded-2xl object-cover'
          />
        </div>
        <div className='w-[609px] mt-[193px] ml-[135px]'>
          <h3 className='font-noto-serif-h3-bold text-figma-secondary-500 mb-[45px]'>
            道地西葡統美食、百年餐廳、佛朗明哥舞晚宴---為您呈現多感官的美味盛宴!
          </h3>
          <p className='font-genseki-h6-regular text-figma-primary-950'>
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
