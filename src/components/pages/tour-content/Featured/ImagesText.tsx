import Image from 'next/image'

const ImagesText = () => {
  return (
    <div className='flex mx-[240px]'>
      <div className='flex flex-col'>
        <Image
          key='hotel-outside-2'
          src='/tour-content/hotel-outside.jpg'
          alt='hotel-outside'
          width={732}
          height={440}
          className='w-[732px] h-[440px] rounded-2xl object-cover mb-12'
        />
        <Image
          key='hotel-inside-2'
          src='/tour-content/hotel-inside.jpg'
          alt='hotel-inside'
          width={490}
          height={294}
          className='w-[490px] h-[294px] rounded-2xl object-cover mb-[52px]'
        />
      </div>
      <div className='w-[587px] mt-[75px] ml-[121px]'>
        <h3 className='relative text-center font-noto-serif-h3-bold text-figma-secondary-500'>
          別再陷入
          <br />
          超五星飯店迷思
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='274'
            height='29'
            viewBox='0 0 274 29'
            fill='none'
            className='absolute bottom-0 left-9'
          >
            <path
              d='M156.5 1.92773C114.679 14.0286 125.796 5.6797 74.3078 16.4969M74.3078 16.4969C37.1516 24.3031 9.37927 26.4679 2.80777 23.4277C-8 18.4277 31.8078 -0.933907 74.3078 16.4969ZM74.3078 16.4969C116.141 24.8533 214.408 36.5523 272.808 16.4969'
              stroke='#8BC3DE'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </h3>
        <p className='font-genseki-h6-regular text-figma-primary-950 mt-12'>
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
    </div>
  )
}

export default ImagesText
