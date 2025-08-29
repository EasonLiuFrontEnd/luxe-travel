import Link from 'next/link'
import type { TLogo } from '@/types/components'

const logoImage = "/logo.svg"

const Logo = ({ scale = 0.34 }: TLogo) => {

  return (
    <Link href='/'>
      <div
        className='absolute top-[12px] left-[48px] logo-container scale-[var(--logo-scale)] translate-y-[var(--translate-y)]'
        style={{
          '--logo-scale': scale,
          '--translate-y': `31px`,
        } as React.CSSProperties}
      >
        <img
          src={logoImage}
          alt="典藏旅遊 LUXE TRAVEL"
          className="block w-[527px] h-[140px] max-[374px]:w-[181px] max-[374px]:h-[48px]"
          data-node-id="422:1672"
        />
      </div>
    </Link>
  )
}

export default Logo
