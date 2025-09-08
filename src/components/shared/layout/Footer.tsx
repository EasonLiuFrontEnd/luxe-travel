import Image from 'next/image'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <footer className='relative bg-figma-primary-950 text-white pt-[60px] pb-[200px] px-[60px] space-y-10'>
      <button
        onClick={scrollToTop}
        className={`
          absolute top-0 right-0 
          flex items-center gap-[16px]
          py-[12px] px-[24px]
          font-genseki-footer-medium tracking-[0.5px]
          text-figma-neutral-950  bg-figma-secondary-100
          rounded-bl-[16px] border-0
          cursor-pointer
        `}>
        返回頂部
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path d="M5 12.666L12 5.66602L19 12.666" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19.666V5.66602" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className='flex justify-between pb-[48px] mb-[48px] border-b-[1.5px] border-white'>
        <div className='space-y-3'>
          <p >
            <span className='pr-[16px]'>
              代表人 / 項國棟
            </span>
            <span>
              聯絡人 / 彭宗裕
            </span>
          </p>
          <p>台北市中山區南京東路三段101號12樓</p>
          <p>info@luxetravel.com.tw</p>
          <p>
            Tel / (02)2506-2677
            <span className='px-[16px]'>|</span>
            Fax / (02)2506-2678
          </p>
        </div>
        <div className='flex flex-col justify-between items-center self-stretch'>
          <Image
            src='/home/footer/footer-logo.svg'
            alt='footer-logo'
            width={321}
            height={57}
          />
          <div className='flex justify-center gap-[24px]'>
            <a href="">
              <Image
                src='/home/footer/facebook.svg'
                alt='facebook'
                width={24}
                height={24}
              />
            </a>
            <a href="">
              <Image
                src='/home/footer/instagram.svg'
                alt='instagram'
                width={24}
                height={24}
              />
            </a>
            <a href="">
              <Image
                src='/home/footer/line.svg'
                alt='line'
                width={24}
                height={24}
              />
            </a>
            <a href="">
              <Image
                src='/home/footer/phone.svg'
                alt='phone'
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
        <div className='space-y-3 text-right'>
          <p>典華旅行社股份有限公司｜典藏旅遊</p>
          <p>甲種旅行社｜品保北1795號 | 交觀甲7208號</p>
          <p>凱旋旅行社股份有限公司｜凱旋家族</p>
          <p>綜合旅行社｜交觀綜字第2133號</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-[8px] font-noto-serif-body-m-semibold mb-0'>
        <a href="" className='py-[8px] px-[4px]'>關於典藏</a>
        <a href="" className='py-[8px] px-[4px]'>自由行專區</a>
        <a href="" className='py-[8px] px-[4px]'>包車旅遊</a>
        <a href="" className='py-[8px] px-[4px]'>團體專區</a>
        <a href="" className='py-[8px] px-[4px]'>三井郵輪</a>
      </div>
      <Image
        src='/shared/icons/company-name.svg'
        alt='company-name'
        className='absolute left-[50%] bottom-0 -translate-x-[50%]'
        width={1344}
        height={117.3}
      />
    </footer>
  )
}

export default Footer
