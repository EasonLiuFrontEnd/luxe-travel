export type TBaseComponent = {
  children?: React.ReactNode
  className?: string
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

export type TScrollContext = {
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
