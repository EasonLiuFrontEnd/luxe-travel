import StickyNotes from "./StickyNotes"

const Concerns = () => {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, transparent 0%, transparent calc(100% - 26px), #e5d9bf calc(100% - 26px), #e5d9bf 100%)'
  }
  return (
    <div className="flex flex-col justify-center items-center self-stretch gap-y-[120px] pt-[200px]">
      <h2
        className='font-noto-serif-tc font-bold text-[32px] lg:text-[64px] lg:leading-[1.2] text-figma-primary-950 py-[6px] px-[12px]'
        style={gradientStyle}
      >
        歐洲自由行規劃煩惱多？
      </h2>
      <div className="flex">
        <StickyNotes />
      </div>
    </div>
  )
}

export default Concerns