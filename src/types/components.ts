import { IBaseComponent } from './index'

export interface IHeader extends IBaseComponent {
  isHomePage: boolean
  logoScale?: number
  isNavbarVisible?: boolean
  isConsultButtonVisible?: boolean
  headerBehavior?: 'fixed' | 'sticky' | 'static'
  hasTransparentHeader?: boolean
}

export interface ILogo extends IBaseComponent {
  scale?: number
}

export interface INavigation extends IBaseComponent {
  isVisible?: boolean
  isMenuOpen?: boolean
  onMenuToggle?: () => void
}

export interface IBanner extends IBaseComponent {
  logoProgress?: number
}

export interface IButton extends IBaseComponent {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
}
