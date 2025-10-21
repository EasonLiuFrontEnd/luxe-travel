import TextImages from './TextImages'
import HighlightCarousel from './HighlightCarousel'
import ImagesText from './ImagesText'
import ImageGrid from './ImageGrid'
import HighlightMarquee from './HighlightMarquee'
import type { THighlight } from '@/api/tour-content'

type THighlightProps = {
  highlights: THighlight[]
  productId: string
}

const layoutComponents: Record<number, React.ComponentType<{ highlight: THighlight }>> = {
  1: TextImages,
  2: HighlightCarousel,
  3: ImagesText,
  4: ImageGrid,
  5: HighlightMarquee,
}

const Highlight = ({ highlights, productId }: THighlightProps) => {
  return (
    <div
      id='highlight'
      className='flex flex-col border-t border-figma-secondary-500'
    >
      <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 my-10 xl:mt-13 xl:mb-12 gradient-title-border'>
        焦點特色
      </h2>
      {highlights && highlights.length > 0 ? (
        highlights
          .filter((highlight) => highlight.productId === productId)
          .sort((a, b) => a.order - b.order)
          .map((highlight) => {
            const Component = layoutComponents[highlight.layout]
            if (!Component) return null
            return (
              <Component
                key={highlight.id}
                highlight={highlight}
              />
            )
          })
      ) : null}
    </div>
  )
}

export default Highlight
