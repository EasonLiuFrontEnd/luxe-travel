import { APP_CONFIG } from './config'

export type TPageType =
  | 'home'
  | 'about'
  | 'destinations'
  | 'contact'
  | 'group-tours'
  | 'tour-content'
  | 'free-tours'
  | 'rcar-tours'
  | 'default'

export type TPageConfig = {
  type: TPageType
  hasScrollAnimation: boolean
  hasTransparentHeader: boolean
  showConsultButton: boolean
  headerBehavior: 'fixed' | 'sticky' | 'static'
  footerStyle: 'default' | 'minimal'
  scrollToTopBg: string
}

export const PAGE_CONFIGS: Record<string, TPageConfig> = {
  '/': {
    type: 'home',
    hasScrollAnimation: true,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'fixed',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-secondary-100',
  },
  '/about': {
    type: 'about',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: false,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-secondary-100',
  },
  '/destinations': {
    type: 'destinations',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-secondary-100',
  },
  '/contact': {
    type: 'contact',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: false,
    headerBehavior: 'sticky',
    footerStyle: 'minimal',
    scrollToTopBg: 'bg-figma-secondary-100',
  },
  '/group-tours': {
    type: 'group-tours',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-neutral-50',
  },
  '/tour-content': {
    type: 'tour-content',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-secondary-100',
  },
  '/free-tours': {
    type: 'free-tours',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-neutral-50',
  },
  '/rcar-tours': {
    type: 'rcar-tours',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
    scrollToTopBg: 'bg-figma-neutral-50',
  },
}

export const DEFAULT_PAGE_CONFIG: TPageConfig = {
  type: 'default',
  hasScrollAnimation: false,
  hasTransparentHeader: false,
  showConsultButton: false,
  headerBehavior: 'sticky',
  footerStyle: 'default',
  scrollToTopBg: 'bg-figma-secondary-100',
}

export const getPageConfig = (pathname: string): TPageConfig => {
  if (PAGE_CONFIGS[pathname]) {
    return PAGE_CONFIGS[pathname]
  }

  if (pathname.startsWith('/tour-content/')) {
    return PAGE_CONFIGS['/tour-content']
  }

  return DEFAULT_PAGE_CONFIG
}

type TLogoAnimation = {
  logoProgress: number
  logoScale: number
  isNavbarVisible: boolean
  isConsultButtonVisible: boolean
}

export const calculateLogoAnimation = (
  scrollY: number,
  pageConfig: TPageConfig,
): TLogoAnimation => {
  if (!pageConfig.hasScrollAnimation) {
    return {
      logoProgress: 1,
      logoScale: APP_CONFIG.LOGO.MIN_SCALE,
      isNavbarVisible: true,
      isConsultButtonVisible: false,
    }
  }

  const logoProgress = Math.min(
    scrollY / APP_CONFIG.SCROLL.LOGO_TRANSITION_END,
    1,
  )
  const logoScale =
    APP_CONFIG.LOGO.MAX_SCALE - logoProgress * APP_CONFIG.LOGO.SCALE_FACTOR
  const isNavbarVisible = logoProgress >= 1
  const isConsultButtonVisible =
    pageConfig.showConsultButton && scrollY > APP_CONFIG.SCROLL.BANNER_HEIGHT

  return {
    logoProgress,
    logoScale,
    isNavbarVisible,
    isConsultButtonVisible,
  }
}
