import Image from 'next/image'
import { mockTourData, formatNumber } from '../../config'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const Registration = ({ className }: { className?: string }) => {
  const { isMobile } = useMediaQuery()
  const depositDisplay =
    mockTourData.deposit === null
      ? '無此報價'
      : mockTourData.deposit === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.deposit)}/每人`

  const adultPriceDisplay =
    mockTourData.adult === null
      ? '無此報價'
      : mockTourData.adult === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.adult)}`

  const mainPriceDisplay =
    mockTourData.adult === null
      ? '無此報價'
      : mockTourData.adult === 0
        ? '敬請電洽'
        : `＄${formatNumber(mockTourData.adult)}`

  const childWithBedDisplay =
    mockTourData.childWithBed === null
      ? '無此報價'
      : mockTourData.childWithBed === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.childWithBed)}`

  const childExtraBedDisplay =
    mockTourData.childExtraBed === null
      ? '無此報價'
      : mockTourData.childExtraBed === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.childExtraBed)}`

  const childNoBedDisplay =
    mockTourData.childNoBed === null
      ? '無此報價'
      : mockTourData.childNoBed === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.childNoBed)}`

  const infantDisplay =
    mockTourData.infant === null
      ? '無此報價'
      : mockTourData.infant === 0
        ? '敬請電洽'
        : `$${formatNumber(mockTourData.infant)}`

  const depositClass =
    mockTourData.deposit === null
      ? 'text-figma-primary-300'
      : mockTourData.deposit === 0
        ? 'text-figma-secondary-950'
        : 'text-figma-primary-950'

  const adultPriceClass =
    mockTourData.adult === null
      ? 'text-figma-primary-300'
      : mockTourData.adult === 0
        ? 'text-figma-secondary-950'
        : 'text-figma-primary-950'

  const mainPriceClass =
    mockTourData.adult === null
      ? 'text-figma-primary-300'
      : mockTourData.adult === 0
        ? 'text-figma-secondary-950'
        : 'text-figma-secondary-500'

  const childWithBedClass =
    mockTourData.childWithBed === null
      ? 'ml-2 text-figma-primary-300'
      : mockTourData.childWithBed === 0
        ? 'ml-2 text-figma-secondary-950'
        : 'ml-2 text-figma-primary-950'

  const childExtraBedClass =
    mockTourData.childExtraBed === null
      ? 'ml-2 text-figma-primary-300'
      : mockTourData.childExtraBed === 0
        ? 'ml-2 text-figma-secondary-950'
        : 'ml-2 text-figma-primary-950'

  const childNoBedClass =
    mockTourData.childNoBed === null
      ? 'ml-2 text-figma-primary-300'
      : mockTourData.childNoBed === 0
        ? 'ml-2 text-figma-secondary-950'
        : 'ml-2 text-figma-primary-950'

  const infantClass =
    mockTourData.infant === null
      ? 'text-figma-primary-300'
      : mockTourData.infant === 0
        ? 'text-figma-secondary-950'
        : 'text-figma-primary-950'

  return (
    <div
      className={cn(
        'xl:box-content xl:w-[45.9vw] xl:h-[590px] xl:sticky xl:top-12 flex flex-col gap-y-[30px] p-5 xl:p-7 xl:mt-[49px] xl:mr-7 mb-5 xl:mb-7 rounded-2xl bg-figma-neutral-0 font-family-genseki text-[16px] xl:text-[20px] leading-[1.2] xl:leading-[1.5] text-figma-primary-950',
        className,
      )}
    >
      {!isMobile && (
        <button
          className={cn(
            'absolute top-0 right-0 pl-3 pb-3 rounded-bl-2xl bg-figma-neutral-50 cursor-pointer',
            styles['concave-border'],
          )}
        >
          <Image
            src='/tour-content/link.svg'
            alt='link'
            width={40}
            height={40}
          />
        </button>
      )}
      <div className='flex max-xl:flex-col max-xl:gap-y-7 xl:gap-x-7'>
        <div className='xl:min-w-[328px] mr-[50px]'>
          <div className='flex justify-between'>
            <p className='font-genseki-body-m-medium max-xl:mr-[10px]'>
              出發日期
            </p>
            <button className='font-genseki-body-s-regular text-figma-secondary-950 underline cursor-pointer'>
              更改出發日
            </button>
          </div>
          <div>
            <span className='font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2] tracking-[1.6px] mr-3'>
              2025/07/08 - 2025/07/20
            </span>
            <span>
              共
              <span className='font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2]'>
                12
              </span>
              天
            </span>
          </div>
        </div>
        <div className='min-w-[328px]'>
          <p className='font-genseki-body-m-medium'>訂金</p>
          <p
            className={cn(
              'font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2] tracking-[1.6px]',
              depositClass,
            )}
          >
            {depositDisplay}
          </p>
        </div>
      </div>
      <div>
        <p className='font-genseki-body-m-medium mb-3'>團費說明</p>
        <div className='grid grid-cols-[auto_1fr] xl:grid-cols-[184px_1fr] gap-x-5 xl:gap-x-7 gap-y-2.5 items-center'>
          <span>大人（年滿12歲）</span>
          <span>
            每位
            <span
              className={cn(
                'font-family-noto-serif text-[16px] xl:text-[20px] font-medium leading-[1.5] xl:leading-[1.2] tracking-[1.6px] mx-2',
                adultPriceClass,
              )}
            >
              {adultPriceDisplay}
            </span>
            {mockTourData.adult !== null && mockTourData.adult > 0 && '起'}
          </span>
          <span className='max-xl:col-span-2'>小孩（2-未滿12歲）</span>
          <div className='max-xl:col-span-2 flex flex-wrap gap-x-5 max-xl:gap-y-3 xl:gap-x-[30px]'>
            <p>
              佔床
              <span className={childWithBedClass}>{childWithBedDisplay}</span>
            </p>
            <p>
              加床
              <span className={childExtraBedClass}>{childExtraBedDisplay}</span>
            </p>
            <p>
              不佔床<span className={childNoBedClass}>{childNoBedDisplay}</span>
            </p>
          </div>
          <span>嬰兒（未滿2歲）</span>
          <span className={infantClass}>{infantDisplay}</span>
        </div>
      </div>
      <div className='xl:pb-[30px] xl:border-b xl:border-figma-secondary-500'>
        <div className='flex items-center gap-x-[10px] mb-3'>
          <Image
            src='/tour-content/notice.svg'
            alt='link'
            width={24}
            height={24}
          />
          <p className='font-genseki-body-m-medium'>備註</p>
        </div>
        <div className='font-genseki-body-m-regular text-figma-primary-400'>
          <p>年齡說明：年齡「團體回國日」計算。</p>
          <p>
            費用不包括：機場來回接送、護照工本費、床頭與行李等禮貌性質小費、私人費用等。
          </p>
          <p>
            團費報價以雙人房（2人一室）為主，歡迎您結伴參加。若單數報名，須酌收全程單人房差額，或由本公司協助安排同社團友共用一室，若能順利調整，則免收單人房差額。
          </p>
          <p>
            單人房為一人房（Single for Single use），非雙人房供一人使用（Double
            for Single use），單人房空間通常較雙人房。
          </p>
          <p>
            三人房通常為雙人房加一床，只接受一大二小或二大一小合住，加床大多為摺疊床、沙發床或行軍彈簧床，加上三人份的行李，勢必影響住宿品質，故建議避免住宿三人房。
          </p>
        </div>
      </div>
      {!isMobile && (
        <div className='flex justify-between'>
          <h3 className={cn('font-noto-serif-h3-bold', mainPriceClass)}>
            {mainPriceDisplay}
            {mockTourData.adult !== null && mockTourData.adult > 0 && (
              <span className='font-genseki-h6-regular ml-2'>起</span>
            )}
          </h3>
          <button className='box-content w-[336px] min-w-[128px] font-genseki-h6-regular text-figma-primary-0 py-[9px] px-7 rounded-[60px] bg-figma-function-available-normal hover:bg-figma-function-available-light cursor-pointer'>
            我要報名
          </button>
        </div>
      )}
    </div>
  )
}

export default Registration
