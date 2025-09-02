import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: never[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (inThrottle) return
    func(...args)
    inThrottle = true
    setTimeout(() => (inThrottle = false), limit)
  }
}

export const formatPath = (path: string) =>
  path.startsWith('/') ? path : `/${path}`

export const isExternalLink = (href: string) =>
  /^https?:\/\//.test(href) || href.includes('mailto:') || href.includes('tel:')

export const generatePageTitle = (pageName?: string) => {
  const baseTitle = 'Luxe Travel - 典藏旅遊'
  return pageName ? `${pageName} | ${baseTitle}` : baseTitle
}

export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}
