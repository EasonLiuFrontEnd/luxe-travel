export interface IBaseComponent {
  children?: React.ReactNode
  className?: string
}

export interface INavItem {
  name: string
  href: string
  hasSubmenu?: boolean
}

export interface IService {
  title: string
  desc: string
}

export interface IDestination {
  name: string
  desc: string
  color: string
}

export interface IScrollContext {
  scrollY: number
  logoProgress: number
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
