import TitleIcon from '../Highlight/icons/TitleIcon'

type TPriceIncludesProps = {
  description: string
}

const PriceIncludes = ({ description }: TPriceIncludesProps) => {
  return (
    <>
      <div className='flex items-center mb-3'>
        <TitleIcon
          topColor='#926D3C'
          bottomColor='#926D3C'
          scale={0.9}
          className='mr-2'
        />
        <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
          售價包含
        </p>
      </div>
      <div
        className='flex flex-col gap-y-2.5 font-family-genseki text-[18px] xl:text-[20px] text-figma-primary-950 leading-[1.5] py-5 px-4 xl:p-7 rounded-2xl bg-figma-neutral-0'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </>
  )
}

export default PriceIncludes
