export type TBaseComponent = {
  children?: React.ReactNode
  className?: string
}

export type TScrollContext = {
  scrollY: number
  logoProgress: number
}

type TFlipBookSize = 'fixed' | 'stretch'

export type TFlipBookOrientation = 'portrait' | 'landscape'

export type TFlipBookState = 'user_fold' | 'fold_corner' | 'flipping' | 'read'

export type TFlipBookCorner = 'top' | 'bottom'

export type TFlipBookProps = TBaseComponent & {
  style?: React.CSSProperties
  startPage?: number
  clickEventForward?: boolean
  useMouseEvents?: boolean
  renderOnlyPageLengthChange?: boolean
  width: number
  height: number
  size?: TFlipBookSize
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  drawShadow?: boolean
  flippingTime?: number
  usePortrait?: boolean
  startZIndex?: number
  autoSize?: boolean
  maxShadowOpacity?: number
  showCover?: boolean
  mobileScrollSupport?: boolean
  onFlip?: (data: number) => void
  onChangeOrientation?: (orientation: TFlipBookOrientation) => void
  onChangeState?: (state: TFlipBookState) => void
  swipeDistance?: number
  showPageCorners?: boolean
  disableFlipByClick?: boolean
}

export type TPageFlipRef = {
  getPageCount: () => number
  getCurrentPageIndex: () => number
  turnToPage: (pageNum: number) => void
  turnToNextPage: () => void
  turnToPrevPage: () => void
  flip: (pageNum: number, corner?: TFlipBookCorner) => void
  flipNext: (corner?: TFlipBookCorner) => void
  flipPrev: (corner?: TFlipBookCorner) => void
  loadFromImages: (images: string[]) => void
  loadFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => void
  updateFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => void
  updateFromImages: (images: string[]) => void
  destroy: () => void
}

export type TFlipBookPage = {
  id: string
  pageNumber?: string
  background?: string
  content: React.ReactNode
  pageContentClassName?: string
}
