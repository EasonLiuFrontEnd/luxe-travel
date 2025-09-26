export type TBaseComponent = {
  children?: React.ReactNode
  className?: string
}

export type TScrollContext = {
  scrollY: number
  logoProgress: number
}

export type TNavItem = {
  name: string
  href: string
  hasSubmenu?: boolean
}

export type TService = {
  title: string
  desc: string
}

export type TDestination = {
  name: string
  desc: string
  color: string
}

export type TPageRoute =
  | '/'
  | '/about'
  | '/services'
  | '/destinations'
  | '/contact'

export type TTailwindGradient =
  | 'from-blue-400 to-blue-600'
  | 'from-green-400 to-green-600'
  | 'from-purple-400 to-purple-600'
  | 'from-red-400 to-red-600'
  | 'from-pink-400 to-pink-600'
  | 'from-yellow-400 to-yellow-600'

export type TFlipBookSize = 'fixed' | 'stretch'

export type TFlipBookOrientation = 'portrait' | 'landscape'

export type TFlipBookState = 'user_fold' | 'fold_corner' | 'flipping' | 'read'

export type TFlipBookCorner = 'top' | 'bottom'

export type TFlipBookProps = TBaseComponent & {
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
}

