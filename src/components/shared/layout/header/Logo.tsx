import Link from 'next/link'
import type { TBaseComponent } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export type TLogo = TBaseComponent & {
  scale?: number
}

const logoImage = '/shared/icons/logo.svg'

const Logo = ({
  scale = 0.34,
  isMobile = false,
}: TLogo & { isMobile?: boolean }) => {
  const translateY = 12 + (scale - 0.34) * 71 / 0.66
  if (isMobile) {
    return (
      <Link href='/'>
        <div className='flex items-center'>
          <Image
            src={logoImage}
            alt='典藏旅遊 LUXE TRAVEL'
            className='block'
            width={181}
            height={48}
          />
        </div>
      </Link>
    )
  }

  return (
    <Link href='/'>
      <div
        className='absolute top-0 left-[48px] will-change-transform transition-all duration-1200 ease-in-out logo-container scale-[var(--logo-scale)] translate-y-[var(--translate-y)]'
        style={
          {
            '--logo-scale': scale,
            '--translate-y': `${translateY}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={logoImage}
          alt='典藏旅遊 LUXE TRAVEL'
          width={527}
          height={140}
        />
      </div>
    </Link>
  )
}

export default Logo
