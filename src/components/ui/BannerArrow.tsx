import React from 'react'
import ArrowSvg from '../../assets/bannerArrow.svg'
import Image from 'next/image'

const BannerArrow = () => {
  return <Image src={ArrowSvg} alt='Banner Arrow' width={24} height={24} />
}

export default BannerArrow
