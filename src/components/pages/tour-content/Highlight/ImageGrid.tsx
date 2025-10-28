import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { THighlight } from '@/api/tour-content'

type TImageGridProps = {
  highlight: THighlight
}

const ImageGrid = ({ highlight }: TImageGridProps) => {
  const { isMobile } = useMediaQuery()
  const contentLines = highlight.content.split('\n')

  return (
    <div className='bg-figma-secondary-100'>
      <div className='flex justify-between'>
        {highlight.imageUrls?.[0] && (
          <Image
            src={highlight.imageUrls[0]}
            alt={`${highlight.title}-1`}
            width={586}
            height={586}
            className='w-[clamp(142px,33vw,586px)] h-[clamp(142px,33vw,586px)] rounded-2xl object-cover mt-10 ml-[27px] sm:ml-12 lg:ml-13 xl:mt-12 2xl:ml-[301px]'
          />
        )}
        {highlight.imageUrls?.[1] && (
          <Image
            src={highlight.imageUrls[1]}
            alt={`${highlight.title}-2`}
            width={610}
            height={610}
            className='w-[clamp(148px,35vw,610px)] h-[clamp(148px,35vw,610px)] rounded-2xl object-cover mt-[140px] mr-7 ml-[34px] sm:mr-10 md:mr-12 lg:ml-10 xl:mt-[280px] 2xl:mr-[288px] 2xl:ml-[135px]'
          />
        )}
      </div>
      <div className='flex max-xl:flex-col'>
        <div className='relative mt-5 ml-[61px] mb-[40px] sm:ml-12 md:ml-13 xl:mt-[64px] xl:mb-[170px] 2xl:ml-[459px]'>
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

          {highlight.imageUrls?.[2] && (
            <Image
              src={highlight.imageUrls[2]}
              alt={`${highlight.title}-3`}
              width={428}
              height={428}
              className='w-[clamp(108px,30vw,428px)] h-[clamp(108px,30vw,428px)] relative rounded-2xl object-cover'
            />
          )}
        </div>
        <div className='xl:w-[609px] max-xl:mx-[20px] max-xl:mb-10 xl:mt-[193px] sm:ml-10 md:ml-[135px]'>
          <h3 className='font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500 mb-[40px] xl:mb-[45px]'>
            {highlight.title}
            { highlight.subtitle && (
              <>
                <br />{highlight.subtitle}
              </>
            )}
          </h3>
          <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
            {contentLines.map((line, index) => (
              <span key={index}>
                {line}
                {index < contentLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageGrid
