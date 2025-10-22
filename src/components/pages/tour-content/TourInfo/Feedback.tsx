import Image from 'next/image'
import type { TFeedback } from '@/api/tour-content'

type TFeedbackProps = {
  feedback: TFeedback
}

const Feedback = ({ feedback }: TFeedbackProps) => {
  if (!feedback) {
    return null
  }

  const handleLinkClick = () => {
    window.open(feedback.linkUrl, '_blank')
  }

  return (
    <div className='relative flex flex-col gap-y-4 py-5 px-4 xl:p-7 rounded-2xl bg-figma-neutral-0'>
      <Image
        src={feedback.imageUrl}
        alt='avatar'
        width={90}
        height={90}
        className='absolute top-0 left-0 translate-y-[-50%]'
      />
      <div className='flex max-xl:flex-col max-xl:gap-y-3 xl:gap-x-3 justify-between xl:items-center'>
        <h6 className='flex font-genseki-h6-bold ml-[74px]'>
          <p className='max-xl:w-[112px] text-figma-accent-blue-normal mr-3'>
            旅客迴響
          </p>
          <p className='text-figma-primary-950'>{feedback.nickname}</p>
        </h6>
        <p className='font-genseki-body-m-medium'>#{feedback.title}</p>
      </div>
      <p className='font-family-genseki text-[16px] leading-[1.5] text-figma-primary-950'>
        {feedback.content}
      </p>

      <div
        onClick={handleLinkClick}
        className='flex justify-end my-[8px] ml-[18px] mr-[5px] cursor-pointer group'
      >
        <Image
          src='/shared/icons/CTA-default.svg'
          alt='arrow'
          width={25}
          height={9}
          className='group-hover:hidden transition-all duration-200'
        />
        <Image
          src='/shared/icons/CTA-hover.svg'
          alt='arrow hover'
          width={38}
          height={9}
          className='hidden group-hover:block transition-all duration-200'
        />
      </div>
    </div>
  )
}
export default Feedback
