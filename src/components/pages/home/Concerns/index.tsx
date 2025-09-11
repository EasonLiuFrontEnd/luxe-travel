import StickyNotes from "./StickyNotes"

const Concerns = () => {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, transparent 0%, transparent calc(100% - 26px), #e5d9bf calc(100% - 26px), #e5d9bf 100%)'
  }

  const gridBackgroundStyle = {
    backgroundColor: '#F2F2F2',
    backgroundImage: `
        linear-gradient(90deg, #ECE7DB 1px, transparent 1px),
        linear-gradient(#ECE7DB 1px, transparent 1px),
        linear-gradient(180deg, #F2F2F2 0%, #ECE7DB 100%)
    `,
    backgroundSize: '46.8px 46.8px, 46.8px 46.8px, 100% 100%'
  }

  return (
    <div className="flex flex-col justify-center items-center self-stretch gap-y-[120px] pt-[200px]" style={gridBackgroundStyle}>
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