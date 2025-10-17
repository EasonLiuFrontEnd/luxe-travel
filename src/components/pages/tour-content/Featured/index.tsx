import TextImages from './TextImages'
import HotelCarousel from './HotelCarousel'
import ImagesText from './ImagesText'
import ImageGrid from './ImageGrid'
import AttractionCarousel from './AttractionCarousel'

const Featured = () => {
  return (
    <div
      id='featured'
      className='flex flex-col border-t border-figma-secondary-500'
    >
      <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 mt-13 mb-12 gradient-title-border'>
        焦點特色
      </h2>
      <TextImages />
      <HotelCarousel />
      <ImagesText />
      <HotelCarousel />
      <AttractionCarousel />
      <ImageGrid />
    </div>
  )
}

export default Featured
