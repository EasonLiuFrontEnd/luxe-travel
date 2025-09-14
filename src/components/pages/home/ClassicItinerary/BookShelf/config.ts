export type TBookStyleConfig = {
  size: {
    mobileClassName: string
    web: {
      width: string
      height: string
    }
  }
  rotation: string
  patternTopOffset: string
  margin: {
    left: string
    right: string
  }
}

export type TBook = {
  id: string
  number: string
  destination: string
  english: string
  pattern: string
  size: {
    mobileClassName: string
    web: {
      width: string
      height: string
    }
  }
  rotation: string
  patternTopOffset: string
  margin: {
    left: string
    right: string
  }
}

export const bookShelfStyleConfig: TBookStyleConfig[] = [
  {
    size: {
      mobileClassName: 'w-[112px] h-[394px]',
      web: { width: '152px', height: '458px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[64px] h-[334px]',
      web: { width: '80px', height: '398px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[80px] h-[360px]',
      web: { width: '104px', height: '424px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[86.87px] h-[269.72px]',
      web: { width: '108.37px', height: '334.72px' },
    },
    rotation: '-rotate-5',
    patternTopOffset: '110px',
    margin: { left: '15px', right: '15px' },
  },
  {
    size: {
      mobileClassName: 'w-[80px] h-[326px]',
      web: { width: '104px', height: '390px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[64px] h-[394px]',
      web: { width: '80px', height: '458px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[108.27px] h-[333.58px]',
      web: { width: '137.6px', height: '397.58px' },
    },
    rotation: 'rotate-5',
    patternTopOffset: '110px',
    margin: { left: '18px', right: '13px' },
  },
  {
    size: {
      mobileClassName: 'w-[80px] h-[261px]',
      web: { width: '104px', height: '325px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[64px] h-[378px]',
      web: { width: '80px', height: '442px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    size: {
      mobileClassName: 'w-[80px] h-[344px]',
      web: { width: '104px', height: '408px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
]
