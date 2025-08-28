import Link from 'next/link'
import type { TLogo } from '@/types/components'

const logoImage = "/logo.svg"

const Logo = ({ scale = 0.34, isNavbarLogo = false }: TLogo) => {
  return (
    <Link href='/'>
      <div
        className='flex items-center logo-container scale-[var(--logo-scale)]'
        style={{
          '--logo-scale': scale,
          transformOrigin: isNavbarLogo ? undefined : '0% 0%'
        } as React.CSSProperties}
      >
        <img 
          src={logoImage}
          alt="典藏旅遊 LUXE TRAVEL"
          className="block w-[527px] h-[140px] aspect-[463/123]"
          data-node-id="422:1672"
        />
      </div>
    </Link>
  )
}

export default Logo
