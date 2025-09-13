import Image from 'next/image'

const Introduction = () => {
  return (
    <div
      className={`w-full xl:flex-[0_0_39.2%] xl:max-w-[753.6px] pb-7 px-[17px] xl:pl-7 xl:pr-0`}
    >
      <div className='flex flex-col items-center gap-5 xl:gap-7 xl:max-w-[705px]'>
        <div className='relative mx-[62.5px] xl:mx-0'>
          <Image
            src='/home/itinerary/it-italy/introduction.jpg'
            alt='義大利介紹圖片'
            className='aspect-[216/160] xl:aspect-[705/347] object-cover rounded-2xl'
            width={705}
            height={347}
          />
          <div className='absolute top-0 right-0 bg-[var(--color-figma-neutral-50)] xl:px-7 xl:py-4 px-5 py-3 rounded-tr-2xl rounded-bl-2xl'>
            <span className='font-family-noto-serif font-bold xl:text-2xl text-lg leading-[120%] text-[var(--color-figma-primary-950)]'>
              義大利
            </span>
          </div>
        </div>

        <p className='font-family-genseki text-base text-[var(--color-figma-primary-950)]'>
          義大利，位於南歐的地中海心臟，是一個融合藝術、歷史與美食的迷人國度。從古羅馬的壯麗遺跡到托斯卡納的葡萄園，再到威尼斯蜿蜒的水道，義大利以其獨特的文化魅力與自然風光吸引無數旅人前往。這裡是文藝復興的發源地，也是世界聞名的美食天堂，一口義大利麵與一杯濃郁濃縮咖啡，便能感受屬於義大利的熱情與靈魂。
        </p>
      </div>
    </div>
  )
}

export default Introduction
