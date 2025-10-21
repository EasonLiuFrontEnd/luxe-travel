'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='top-center'
      toastOptions={{
        style: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
