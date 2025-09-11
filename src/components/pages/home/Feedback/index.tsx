import FeedbackCard from './FeedbackCard'

const Feedback = () => {
  return (
    <div className='relative flex flex-col items-center gap-y-[120px] h-[1024px] py-[120px] px-[48px] bg-neutral-50'>
      <h2 className='h-[89px] font-noto-serif-h2-bold text-figma-primary-950 box-border border-b-[26px] border-figma-secondary-300 py-[6px] px-[12px]'>
        真實旅客回饋
      </h2>
      <FeedbackCard />
    </div>
  )
}

export default Feedback
