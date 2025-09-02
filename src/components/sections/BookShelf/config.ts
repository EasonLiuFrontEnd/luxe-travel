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

export const bookShelfData: TBook[] = [
  {
    id: 'croatia',
    number: '01',
    destination: '克羅埃西亞',
    english: 'Republic of Croatia',
    pattern: '/book-shell/patterns/hr-croatia.svg',
    size: {
      mobileClassName: 'w-[112px] h-[394px]',
      web: { width: '152px', height: '458px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'czech',
    number: '02',
    destination: '捷克',
    english: 'Czech Republic',
    pattern: '/book-shell/patterns/cz-czech.svg',
    size: {
      mobileClassName: 'w-[64px] h-[334px]',
      web: { width: '80px', height: '398px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'portugal',
    number: '03',
    destination: '葡萄牙',
    english: 'Portugal',
    pattern: '/book-shell/patterns/pt-portugal.svg',
    size: {
      mobileClassName: 'w-[80px] h-[360px]',
      web: { width: '104px', height: '424px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'switzerland',
    number: '04',
    destination: '瑞士',
    english: 'Switzerland',
    pattern: '/book-shell/patterns/ch-switzerland.svg',
    size: {
      mobileClassName: 'w-[86.87px] h-[269.72px]',
      web: { width: '108.37px', height: '334.72px' },
    },
    rotation: '-rotate-5',
    patternTopOffset: '110px',
    margin: { left: '15px', right: '15px' },
  },
  {
    id: 'ireland',
    number: '05',
    destination: '愛爾蘭',
    english: 'Ireland',
    pattern: '/book-shell/patterns/ie-ireland.svg',
    size: {
      mobileClassName: 'w-[80px] h-[326px]',
      web: { width: '104px', height: '390px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'germany',
    number: '06',
    destination: '德國',
    english: 'Germany',
    pattern: '/book-shell/patterns/de-germany.svg',
    size: {
      mobileClassName: 'w-[64px] h-[394px]',
      web: { width: '80px', height: '458px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'hungary',
    number: '07',
    destination: '匈牙利',
    english: 'Hungary',
    pattern: '/book-shell/patterns/hu-hungary.svg',
    size: {
      mobileClassName: 'w-[108.27px] h-[333.58px]',
      web: { width: '137.6px', height: '397.58px' },
    },
    rotation: 'rotate-5',
    patternTopOffset: '110px',
    margin: { left: '18px', right: '13px' },
  },
  {
    id: 'spain',
    number: '08',
    destination: '西班牙',
    english: 'Spain',
    pattern: '/book-shell/patterns/es-spain.svg',
    size: {
      mobileClassName: 'w-[80px] h-[261px]',
      web: { width: '104px', height: '325px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'greece',
    number: '09',
    destination: '希臘',
    english: 'Greece',
    pattern: '/book-shell/patterns/gr-greece.svg',
    size: {
      mobileClassName: 'w-[64px] h-[378px]',
      web: { width: '80px', height: '442px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'belgium',
    number: '10',
    destination: '比利時',
    english: 'Belgium',
    pattern: '/book-shell/patterns/be-belgium.svg',
    size: {
      mobileClassName: 'w-[80px] h-[344px]',
      web: { width: '104px', height: '408px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'italy',
    number: '11',
    destination: '義大利',
    english: 'Italy',
    pattern: '/book-shell/patterns/it-italy.svg',
    size: {
      mobileClassName: 'w-[107.05px] h-[319.63px]',
      web: { width: '136.38px', height: '383.63px' },
    },
    rotation: '-rotate-5',
    patternTopOffset: '110px',
    margin: { left: '18px', right: '8px' },
  },
  {
    id: 'austria',
    number: '12',
    destination: '奧地利',
    english: 'Austria',
    pattern: '/book-shell/patterns/at-austria.svg',
    size: {
      mobileClassName: 'w-[89.09px] h-[264.43px]',
      web: { width: '115.28px', height: '328.43px' },
    },
    rotation: 'rotate-2',
    patternTopOffset: '110px',
    margin: { left: '15px', right: '6px' },
  },
  {
    id: 'uk',
    number: '13',
    destination: '英國',
    english: 'United Kingdom',
    pattern: '/book-shell/patterns/gb-uk.svg',
    size: {
      mobileClassName: 'w-[64px] h-[394px]',
      web: { width: '80px', height: '458px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'france',
    number: '14',
    destination: '法國',
    english: 'France',
    pattern: '/book-shell/patterns/fr-france.svg',
    size: {
      mobileClassName: 'w-[75.98px] h-[346.54px]',
      web: { width: '94.19px', height: '410.54px' },
    },
    rotation: '-rotate-2',
    patternTopOffset: '110px',
    margin: { left: '8px', right: '8px' },
  },
  {
    id: 'baltic',
    number: '15',
    destination: '波羅地海三小國',
    english: 'Baltic States',
    pattern: '/book-shell/patterns/baltic-states.svg',
    size: {
      mobileClassName: 'w-[144px] h-[304px]',
      web: { width: '200px', height: '368px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'netherlands',
    number: '16',
    destination: '荷蘭',
    english: 'Netherlands',
    pattern: '/book-shell/patterns/nl-netherlands.svg',
    size: {
      mobileClassName: 'w-[64px] h-[354px]',
      web: { width: '80px', height: '418px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
  {
    id: 'nordic',
    number: '17',
    destination: '北歐',
    english: 'Scandi',
    pattern: '/book-shell/patterns/nordic-countries.svg',
    size: {
      mobileClassName: 'w-[86.95px] h-[270.72px]',
      web: { width: '108.37px', height: '334.72px' },
    },
    rotation: '-rotate-5',
    patternTopOffset: '110px',
    margin: { left: '15px', right: '15px' },
  },
  {
    id: 'luxembourg',
    number: '18',
    destination: '盧森堡',
    english: 'Luxembourg',
    pattern: '/book-shell/patterns/lu-luxembourg.svg',
    size: {
      mobileClassName: 'w-[80px] h-[378px]',
      web: { width: '104px', height: '442px' },
    },
    rotation: 'rotate-0',
    patternTopOffset: '110px',
    margin: { left: '0px', right: '0px' },
  },
]
