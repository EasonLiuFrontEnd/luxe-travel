import { TBaseComponent } from './index'

export type THeader = TBaseComponent & {
  isHomePage: boolean
  logoScale?: number
  logoProgress?: number
  isNavbarVisible?: boolean
  isConsultButtonVisible?: boolean
  headerBehavior?: 'fixed' | 'sticky' | 'static'
  hasTransparentHeader?: boolean
}

export type TLogo = TBaseComponent & {
  scale?: number
  isNavbarLogo?: boolean
}

export type TNavigation = TBaseComponent & {
  isMenuOpen?: boolean
  onMenuToggle?: () => void
  logoProgress?: number
}

export type TBanner = TBaseComponent & {
  logoProgress?: number
}

export type TButton = TBaseComponent & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  onClick?: () => void
  disabled?: boolean
}
