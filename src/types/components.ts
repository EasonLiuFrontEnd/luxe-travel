import { TBaseComponent } from './index'

export type THeader = TBaseComponent & {
  isHomePage: boolean
  logoScale?: number
  isNavbarVisible?: boolean
  isConsultButtonVisible?: boolean
  headerBehavior?: 'fixed' | 'sticky' | 'static'
  hasTransparentHeader?: boolean
}

export type TLogo = TBaseComponent & {
  scale?: number
}

export type TNavigation = TBaseComponent & {
  isVisible?: boolean
  isMenuOpen?: boolean
  onMenuToggle?: () => void
}

export type TBanner = TBaseComponent & {
  logoProgress?: number
}

export type TButton = TBaseComponent & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
}
