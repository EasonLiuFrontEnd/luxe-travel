import { mockTourData, formatNumber } from './config'

const Registration = () => {
  const depositDisplay = mockTourData.deposit === null
    ? '無此報價'
    : mockTourData.deposit === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.deposit)}/每人`

  const adultPriceDisplay = mockTourData.adult === null
    ? '無此報價'
    : mockTourData.adult === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.adult)}`

  const mainPriceDisplay = mockTourData.adult === null
    ? '無此報價'
    : mockTourData.adult === 0 ? '敬請電洽' : `＄${formatNumber(mockTourData.adult)}`

  const childWithBedDisplay = mockTourData.childWithBed === null
    ? '無此報價'
    : mockTourData.childWithBed === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.childWithBed)}`

  const childExtraBedDisplay = mockTourData.childExtraBed === null
    ? '無此報價'
    : mockTourData.childExtraBed === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.childExtraBed)}`

  const childNoBedDisplay = mockTourData.childNoBed === null
    ? '無此報價'
    : mockTourData.childNoBed === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.childNoBed)}`

  const infantDisplay = mockTourData.infant === null
    ? '無此報價'
    : mockTourData.infant === 0 ? '敬請電洽' : `$${formatNumber(mockTourData.infant)}`

  const depositClass = mockTourData.deposit === null
    ? 'text-figma-primary-300'
    : mockTourData.deposit === 0 ? 'text-figma-secondary-950' : 'text-figma-primary-950'

  const adultPriceClass = mockTourData.adult === null
    ? 'text-figma-primary-300'
    : mockTourData.adult === 0 ? 'text-figma-secondary-950' : 'text-figma-primary-950'

  const mainPriceClass = mockTourData.adult === null
    ? 'text-figma-primary-300'
    : mockTourData.adult === 0 ? 'text-figma-secondary-950' : 'text-figma-secondary-500'

  const childWithBedClass = mockTourData.childWithBed === null
    ? 'ml-2 text-figma-primary-300'
    : mockTourData.childWithBed === 0 ? 'ml-2 text-figma-secondary-950' : 'ml-2 text-figma-primary-950'

  const childExtraBedClass = mockTourData.childExtraBed === null
    ? 'ml-2 text-figma-primary-300'
    : mockTourData.childExtraBed === 0 ? 'ml-2 text-figma-secondary-950' : 'ml-2 text-figma-primary-950'

  const childNoBedClass = mockTourData.childNoBed === null
    ? 'ml-2 text-figma-primary-300'
    : mockTourData.childNoBed === 0 ? 'ml-2 text-figma-secondary-950' : 'ml-2 text-figma-primary-950'

  const infantClass = mockTourData.infant === null
    ? 'text-figma-primary-300'
    : mockTourData.infant === 0 ? 'text-figma-secondary-950' : 'text-figma-primary-950'

  return (
    <div className='box-content w-[790px] h-[590px] flex flex-col gap-y-[30px] p-7 rounded-2xl bg-figma-neutral-0 font-genseki-h6-regular text-figma-primary-950'>
      <div className='flex gap-x-7'>
        <div className="min-w-[328px] mr-[50px]">
          <div className='flex justify-between'>
            <p className='font-genseki-body-m-medium'>出發日期</p>
            <button className='font-genseki-body-s-regular text-figma-secondary-950 underline cursor-pointer'>更改出發日</button>
          </div>
          <div>
            <span className='font-noto-serif-title-medium tracking-[1.6px] mr-3'>2025/07/08 - 2025/07/20</span>
            <span>共<span className='font-noto-serif-title-medium'>12</span>天</span>
          </div>
        </div>
        <div className='min-w-[328px]'>
          <p className='font-genseki-body-m-medium'>訂金</p>
          <p className={`font-noto-serif-title-medium tracking-[1.6px] ${depositClass}`}>{depositDisplay}</p>
        </div>
      </div>
      <div>
        <p className='font-genseki-body-m-medium mb-3'>團費說明</p>
        <div className='grid grid-cols-[184px_1fr] gap-x-7 gap-y-2.5'>
          <span>大人（年滿12歲）</span>
          <span>每位
            <span className={`font-noto-serif-title-medium tracking-[1.6px] mx-2 ${adultPriceClass}`}>
              {adultPriceDisplay}
            </span>
            {mockTourData.adult !== null && mockTourData.adult > 0 && '起'}
          </span>
          <span>小孩（2-未滿12歲）</span>
          <div className='flex gap-x-[30px]'>
            <p>佔床<span className={childWithBedClass}>{childWithBedDisplay}</span></p>
            <p>加床<span className={childExtraBedClass}>{childExtraBedDisplay}</span></p>
            <p>不佔床<span className={childNoBedClass}>{childNoBedDisplay}</span></p>
          </div>
          <span>嬰兒（未滿2歲）</span>
          <span className={infantClass}>{infantDisplay}</span>
        </div>
      </div>
      <div className='pb-[30px] border-b border-figma-secondary-500'>
        <div className='flex items-center gap-x-[10px] mb-3'>
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' className='m-1'>
            <path d='M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z' fill='#926D3C' />
            <path d='M9 9H11V15H9V9ZM9 5H11V7H9V5Z' fill='#926D3C' />
          </svg>
          <p className='font-genseki-body-m-medium'>備註</p>
        </div>
        <div className='font-genseki-body-m-regular text-figma-primary-400'>
          <p>年齡說明：年齡「團體回國日」計算。</p>
          <p>費用不包括：機場來回接送、護照工本費、床頭與行李等禮貌性質小費、私人費用等。</p>
          <p>團費報價以雙人房（2人一室）為主，歡迎您結伴參加。若單數報名，須酌收全程單人房差額，或由本公司協助安排同社團友共用一室，若能順利調整，則免收單人房差額。</p>
          <p>單人房為一人房（Single for Single use），非雙人房供一人使用（Double for Single use），單人房空間通常較雙人房。</p>
          <p>三人房通常為雙人房加一床，只接受一大二小或二大一小合住，加床大多為摺疊床、沙發床或行軍彈簧床，加上三人份的行李，勢必影響住宿品質，故建議避免住宿三人房。</p>
        </div>
      </div>
      <div className='flex justify-between'>
        <h3 className={`font-noto-serif-h3-bold ${mainPriceClass}`}>
          {mainPriceDisplay}
          {mockTourData.adult !== null && mockTourData.adult > 0 && <span className='font-genseki-h6-regular ml-2'>起</span>}
        </h3>
        <button className='box-content w-[336px] min-w-[128px] font-genseki-h6-regular text-figma-primary-0 py-[9px] px-7 rounded-[60px] bg-figma-function-available-normal hover:bg-figma-function-available-light cursor-pointer'>我要報名</button>
      </div>
    </div>
  )
}

export default Registration