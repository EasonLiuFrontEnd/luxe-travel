import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const generatePageTitle = (pageName?: string) => {
  const baseTitle = 'Luxe Travel - 典藏旅遊'
  return pageName ? `${pageName} | ${baseTitle}` : baseTitle
}
