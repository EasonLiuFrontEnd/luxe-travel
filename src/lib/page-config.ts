import { APP_CONFIG } from './config'

export type TPageType =
  | 'home'
  | 'about'
  | 'services'
  | 'destinations'
  | 'contact'
  | 'default'

export type TPageConfig = {
  type: TPageType
  hasScrollAnimation: boolean
  hasTransparentHeader: boolean
  showConsultButton: boolean
  headerBehavior: 'fixed' | 'sticky' | 'static'
  footerStyle: 'default' | 'minimal'
}

export const PAGE_CONFIGS: Record<string, TPageConfig> = {
  '/': {
    type: 'home',
    hasScrollAnimation: true,
    hasTransparentHeader: true,
    showConsultButton: true,
    headerBehavior: 'fixed',
    footerStyle: 'default',
  },
  '/about': {
    type: 'about',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: false,
    headerBehavior: 'sticky',
    footerStyle: 'default',
  },
  '/services': {
    type: 'services',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
  },
  '/destinations': {
    type: 'destinations',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: true,
    headerBehavior: 'sticky',
    footerStyle: 'default',
  },
  '/contact': {
    type: 'contact',
    hasScrollAnimation: false,
    hasTransparentHeader: false,
    showConsultButton: false,
    headerBehavior: 'sticky',
    footerStyle: 'minimal',
  },
}

export const DEFAULT_PAGE_CONFIG: TPageConfig = {
  type: 'default',
  hasScrollAnimation: false,
  hasTransparentHeader: false,
  showConsultButton: false,
  headerBehavior: 'sticky',
  footerStyle: 'default',
}

export const getPageConfig = (pathname: string): TPageConfig => {
  return PAGE_CONFIGS[pathname] || DEFAULT_PAGE_CONFIG
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
