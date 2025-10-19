import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const TextImages = () => {
  const { isMobile } = useMediaQuery()
  return (
    <div className='flex max-xl:flex-col max-xl:gap-y-9 mx-[20px] xl:mx-[240px]'>
      <div className='xl:w-[587px] xl:mt-[75px] xl:mr-[121px]'>
        <h3 className='text-center font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500'>
          別再陷入
          <br />
          <span className='relative'>
            超五星飯店迷思
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='274'
              height='29'
              viewBox='0 0 274 29'
              fill='none'
              className='absolute -bottom-[10px] xl:-bottom-2 -left-[38px] xl:-left-11 scale-[0.595] xl:scale-100 origin-left'
            >
              <path
                d='M156.5 1.92773C114.679 14.0286 125.796 5.6797 74.3078 16.4969M74.3078 16.4969C37.1516 24.3031 9.37927 26.4679 2.80777 23.4277C-8 18.4277 31.8078 -0.933907 74.3078 16.4969ZM74.3078 16.4969C116.141 24.8533 214.408 36.5523 272.808 16.4969'
                stroke='#8BC3DE'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </span>
        </h3>
        <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950 mt-9 xl:mt-12'>
          您是否曾經參加過團體旅遊,花高額團費入住超五星飯店,卻因行程緊湊無法享受設施?
          <br />
          <br />
          清晨早早就出發,奢華住宿成過場。我們相信,旅行的意義在於「深度體驗」而非「浮華表面」。
          <br />
          <br />
          坊間部分行程為行銷噱頭,將超五星飯店(如四季、Ritz-Carlton....)包裝成賣點,但這筆費用是否真能提升旅程質感?
          <br />
          <br />
          與其追求短暫華麗,不如選擇全方位的享受。典藏旅遊為您精打細算,帶您深度旅遊,而非奢華不切實際的超五星飯店。
        </p>
      </div>
      <div className='flex flex-col items-end'>
        <Image
          key='hotel-outside-1'
          src='/tour-content/hotel-outside.jpg'
          alt='hotel-outside'
          width={732}
          height={440}
          className='max-xl:self-start mb-9 max-xl:pr-10 xl:mb-12 rounded-2xl object-cover'
        />
        <Image
          key='hotel-inside-1'
          src='/tour-content/hotel-inside.jpg'
          alt='hotel-inside'
          width={isMobile ? 732 : 490}
          height={isMobile ? 440 : 294}
          className='mb-10 max-xl:pl-10 xl:mb-[52px] rounded-2xl object-cover'
        />
      </div>
    </div>
  )
}

export default TextImages
