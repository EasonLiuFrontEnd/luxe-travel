'use client'

const imgCastle =
  'http://localhost:3845/assets/ecd7637bcb8685aa6ccdf1624b8a0ba5afbac89c.png'

export type THeroSectionProps = {
  className?: string
}

export const HeroSection = ({ className = '' }: THeroSectionProps) => {
  return (
    <div
      className={`content-stretch flex flex-col gap-2.5 items-start justify-start relative size-full ${className}`}
    >
      <div className='h-[529px] overflow-clip rounded-[16px] shrink-0 sticky top-0 w-full'>
        <div
          className='absolute bg-[0%_34.38%] bg-no-repeat bg-size-[100%_172.33%] h-[529px] left-0 top-[0.33px] w-full'
          style={{ backgroundImage: `url('${imgCastle}')` }}
        />
      </div>

      <div className='absolute bg-[#f7f4ec] box-border content-stretch flex gap-4 items-center justify-center left-0 px-6 py-3 rounded-br-[16px] top-[-0.67px]'>
        <div className="font-['Noto_Serif_TC:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#926d3c] text-[64px] text-nowrap">
          <p className='leading-[1.2] whitespace-pre'>立即諮詢</p>
        </div>
      </div>

      <div className='absolute bg-[#f7f4ec] bottom-[-0.33px] box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 right-0 rounded-tl-[16px]'>
        <div className="font-['Noto_Serif_TC:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#383841] text-[24px] text-nowrap text-right">
          <p className='leading-[1.2] whitespace-pre'>
            為您客製化旅程，典藏精彩回憶
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
