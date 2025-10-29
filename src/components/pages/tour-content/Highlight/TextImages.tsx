import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { THighlight } from '@/api/tour-content'

type TTextImagesProps = {
  highlight: THighlight
}

const TextImages = ({ highlight }: TTextImagesProps) => {
  const { isMobile } = useMediaQuery()
  const contentLines = highlight.content.split('\n')

  return (
    <div className='xl:min-h-[977px] flex max-xl:flex-col xl:justify-between max-xl:gap-y-9 pb-10 xl:py-10 mx-4 xl:mx-10 2xl:mx-[240px]'>
      <div className='xl:w-[587px] mx-3 xl:mt-[76px]'>
        <h3 className='text-center font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500'>
          {highlight.title}
          <br />
          <span className='relative'>
            {highlight.subtitle}
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
          {contentLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < contentLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      {highlight.imageUrls && highlight.imageUrls.length > 0 && (
        <div className='flex flex-col items-end gap-y-9 xl:gap-y-12'>
          {highlight.imageUrls.map((imageUrl, index) => {
            if (index === 0) {
              return (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt={`${highlight.title}-1`}
                  width={732}
                  height={440}
                  className='max-xl:self-start max-xl:pr-10 rounded-2xl object-cover'
                />
              )
            } else if (index === 1) {
              return (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt={`${highlight.title}-2`}
                  width={isMobile ? 732 : 490}
                  height={isMobile ? 440 : 294}
                  className='max-xl:pl-10 rounded-2xl object-cover'
                />
              )
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}

export default TextImages
