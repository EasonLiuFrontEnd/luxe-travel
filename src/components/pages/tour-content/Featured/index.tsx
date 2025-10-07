import Image from "next/image"
import FeaturedCarousel from './FeaturedCarousel'

const Featured = () => {
  return (
    <div className="flex flex-col border-t border-figma-secondary-500">
      <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 mt-13 mb-12 gradient-title-border'>
        焦點特色
      </h2>
      <div className="flex mx-[240px]">
        <div className="w-[587px] mt-[75px] mr-[121px]">
          <h3 className="relative text-center font-noto-serif-h3-bold text-figma-secondary-500">
            別再陷入<br />超五星飯店迷思
            <svg xmlns="http://www.w3.org/2000/svg" width="274" height="29" viewBox="0 0 274 29" fill="none" className="absolute bottom-0 left-9">
              <path d="M156.5 1.92773C114.679 14.0286 125.796 5.6797 74.3078 16.4969M74.3078 16.4969C37.1516 24.3031 9.37927 26.4679 2.80777 23.4277C-8 18.4277 31.8078 -0.933907 74.3078 16.4969ZM74.3078 16.4969C116.141 24.8533 214.408 36.5523 272.808 16.4969" stroke="#8BC3DE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </h3>
          <p className="font-genseki-h6-regular text-figma-primary-950 mt-12">
            您是否曾經參加過團體旅遊,花高額團費入住超五星飯店,卻因行程緊湊無法享受設施?<br /><br />
            清晨早早就出發,奢華住宿成過場。我們相信,旅行的意義在於「深度體驗」而非「浮華表面」。<br /><br />
            坊間部分行程為行銷噱頭,將超五星飯店(如四季、Ritz-Carlton....)包裝成賣點,但這筆費用是否真能提升旅程質感?<br /><br />
            與其追求短暫華麗,不如選擇全方位的享受。典藏旅遊為您精打細算,帶您深度旅遊,而非奢華不切實際的超五星飯店。
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Image
            src='/tour-content/hotel-outside.jpg'
            alt='hotel-outside'
            width={732}
            height={440}
            className="w-[732px] h-[440px] rounded-2xl object-cover mb-12"
          />
          <Image
            src='/tour-content/hotel-inside.jpg'
            alt='hotel-inside'
            width={490}
            height={294}
            className="w-[490px] h-[294px] rounded-2xl object-cover mb-[52px]"
          />
        </div>
      </div>
      <div
        className="relative pt-[150px] px-[240px] pb-[172px]"
        style={{ background: 'linear-gradient(180deg, #F5F5F5 0%, rgba(189, 160, 94, 0.25) 40%, rgba(189, 160, 94, 0.25) 80%, #F5F5F5 100%)' }}
      >
        <FeaturedCarousel
          images={[
            '/tour-content/hotel-lobby.jpg'
          ]}
          className="w-[1440px] h-[530px] rounded-2xl overflow-hidden z-10"
        />
      </div>
      <div className="mx-[240px] mb-[150px]">
        <h3 className="font-noto-serif-h3-bold mb-11">
          <p className="text-figma-secondary-500">典藏旅遊</p>
          <p className="text-figma-primary-950">為您精選高性價比的飯店</p>
        </h3>
        <p className="font-genseki-h6-regular text-figma-primary-950">
          我們不譁眾取寵,而是把您的每一分費用花在真正的需要上。<br /><br />
          一趟美好的旅遊,除了精緻的行程外,優質的住宿同樣重要,<br />
          我們為您精選具高性價比的飯店,除優質四星飯店外,我們更安排了六晚五星級飯店,<br />
          一晚哥多華、一晚格拉納達、二晚里斯本、二晚巴塞隆納,讓您在一天飽覽歐洲美景後,<br />
          能在舒適的飯店享受一夜好眠,迎接下一天的精彩。
        </p>
      </div>
      <div className="flex mx-[240px]">
        <div className="flex flex-col">
          <Image
            src='/tour-content/hotel-outside.jpg'
            alt='hotel-outside'
            width={732}
            height={440}
            className="w-[732px] h-[440px] rounded-2xl object-cover mb-12"
          />
          <Image
            src='/tour-content/hotel-inside.jpg'
            alt='hotel-inside'
            width={490}
            height={294}
            className="w-[490px] h-[294px] rounded-2xl object-cover mb-[52px]"
          />
        </div>
        <div className="w-[587px] mt-[75px] ml-[121px]">
          <h3 className="relative text-center font-noto-serif-h3-bold text-figma-secondary-500">
            別再陷入<br />超五星飯店迷思
            <svg xmlns="http://www.w3.org/2000/svg" width="274" height="29" viewBox="0 0 274 29" fill="none" className="absolute bottom-0 left-9">
              <path d="M156.5 1.92773C114.679 14.0286 125.796 5.6797 74.3078 16.4969M74.3078 16.4969C37.1516 24.3031 9.37927 26.4679 2.80777 23.4277C-8 18.4277 31.8078 -0.933907 74.3078 16.4969ZM74.3078 16.4969C116.141 24.8533 214.408 36.5523 272.808 16.4969" stroke="#8BC3DE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </h3>
          <p className="font-genseki-h6-regular text-figma-primary-950 mt-12">
            您是否曾經參加過團體旅遊,花高額團費入住超五星飯店,卻因行程緊湊無法享受設施?<br /><br />
            清晨早早就出發,奢華住宿成過場。我們相信,旅行的意義在於「深度體驗」而非「浮華表面」。<br /><br />
            坊間部分行程為行銷噱頭,將超五星飯店(如四季、Ritz-Carlton....)包裝成賣點,但這筆費用是否真能提升旅程質感?<br /><br />
            與其追求短暫華麗,不如選擇全方位的享受。典藏旅遊為您精打細算,帶您深度旅遊,而非奢華不切實際的超五星飯店。
          </p>
        </div>
      </div>
      <div
        className="relative pt-[150px] px-[240px] pb-[172px]"
        style={{ background: 'linear-gradient(180deg, #F5F5F5 0%, rgba(189, 160, 94, 0.25) 40%, rgba(189, 160, 94, 0.25) 80%, #F5F5F5 100%)' }}
      >
        <FeaturedCarousel
          images={[
            '/tour-content/hotel-lobby.jpg'
          ]}
          className="w-[1440px] h-[530px] rounded-2xl overflow-hidden z-10"
        />
      </div>
      <div className="mx-[240px] mb-[150px]">
        <h3 className="font-noto-serif-h3-bold mb-11">
          <p className="text-figma-secondary-500">典藏旅遊</p>
          <p className="text-figma-primary-950">為您精選高性價比的飯店</p>
        </h3>
        <p className="font-genseki-h6-regular text-figma-primary-950">
          我們不譁眾取寵,而是把您的每一分費用花在真正的需要上。<br /><br />
          一趟美好的旅遊,除了精緻的行程外,優質的住宿同樣重要,<br />
          我們為您精選具高性價比的飯店,除優質四星飯店外,我們更安排了六晚五星級飯店,<br />
          一晚哥多華、一晚格拉納達、二晚里斯本、二晚巴塞隆納,讓您在一天飽覽歐洲美景後,<br />
          能在舒適的飯店享受一夜好眠,迎接下一天的精彩。
        </p>
      </div>
      {/* <div className="flex item justify-between mt-[112px]">
        <Image
          src='/tour-content/scene-a.jpg'
          alt='scene-a'
          width={428}
          height={664}
          className="rounded-2xl object-cover mt-[190px]"
        />
        <Image
          src='/tour-content/scene-b.jpg'
          alt='scene-b'
          width={428}
          height={664}
          className="rounded-2xl object-cover mb-[190px]"
        />
        <Image
          src='/tour-content/scene-c.jpg'
          alt='scene-c'
          width={428}
          height={664}
          className="rounded-2xl object-cover mt-[190px]"
        />
        <Image
          src='/tour-content/scene-d.jpg'
          alt='scene-d'
          width={428}
          height={664}
          className="rounded-2xl object-cover mb-[190px]"
        />
      </div> */}
      <div className="flex items-start">
        <Image
          src='/tour-content/food-a.jpg'
          alt='food-a'
          width={586}
          height={586}
          className="rounded-2xl object-cover mt-[120px] ml-[301px]"
        />
        <Image
          src='/tour-content/tradition.jpg'
          alt='tradition'
          width={610}
          height={610}
          className="rounded-2xl object-cover mt-[281px] ml-[135px]"
        />
      </div>
      <div className="flex">
        <div className="relative mt-[64px] ml-[459px] mb-[170px]">
          <Image
            src='/tour-content/plus-aggregate-small.svg'
            alt='plus-aggregat-small'
            width={234}
            height={234}
            className="absolute top-[-64px] left-[-113px] rounded-2xl object-cover z-0"
          />
          <Image
            src='/tour-content/food-b.jpg'
            alt='food-b'
            width={428}
            height={428}
            className="relative rounded-2xl object-cover"
          />
        </div>
        <div className="w-[609px] mt-[193px] ml-[135px]">
          <h3 className="font-noto-serif-h3-bold text-figma-secondary-500 mb-[45px]">道地西葡統美食、百年餐廳、佛朗明哥舞晚宴---為您呈現多感官的美味盛宴!</h3>
          <p className="font-genseki-h6-regular text-figma-primary-950">
            馬德里百年酒窖餐廳、塞哥維亞香烤乳豬、佛朗明哥舞晚宴、Tapas、法朵 Fado 晚宴、葡萄牙海鮮<br /><br />
            燉飯、波多百年餐廳.....豐富的菜色、精彩的表演,為您呈現多感官的美味盛宴。
          </p>
        </div>
      </div>
    </div>
  )
}
export default Featured