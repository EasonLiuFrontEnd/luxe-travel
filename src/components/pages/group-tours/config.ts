// 團體行程配置數據

export type TRegion = {
  id: string
  name: string
  countries: TCountry[]
}

export type TCountry = {
  id: string
  name: string
}

export type TSlideContent = {
  id: number
  title: string
  subtitle: string
  description: string
}

export type TFilterType = 'country' | 'price' | 'other'

export type TFilter = {
  id: string
  label: string
  type: TFilterType
}

// 地區和國家數據
export const REGIONS: TRegion[] = [
  {
    id: 'western-europe',
    name: '西歐',
    countries: [
      { id: 'france', name: '法國' },
      { id: 'uk', name: '英國' },
      { id: 'germany', name: '德國' },
      { id: 'netherlands', name: '荷蘭' },
      { id: 'belgium', name: '比利時' }
    ]
  },
  {
    id: 'southern-europe',
    name: '南歐',
    countries: [
      { id: 'spain', name: '西班牙' },
      { id: 'portugal', name: '葡萄牙' },
      { id: 'italy', name: '義大利' },
      { id: 'greece', name: '希臘' }
    ]
  },
  {
    id: 'northern-europe',
    name: '北歐',
    countries: [
      { id: 'norway', name: '挪威' },
      { id: 'sweden', name: '瑞典' },
      { id: 'denmark', name: '丹麥' },
      { id: 'finland', name: '芬蘭' }
    ]
  }
]

// Banner 幻燈片內容
export const SLIDE_CONTENT: TSlideContent[] = [
  {
    id: 1,
    title: '航向伊比利亞',
    subtitle: '西葡珍寶探尋16天',
    description: '走訪伊比利亞半島的璀璨文明，一次收藏西班牙與葡萄牙的藝術、歷史與風土人情。從馬德里到里斯本，沿途探訪世界遺產古城、高第建築、葡萄酒莊與陽光海岸，16 天展開一場經典與浪漫交織的文化之旅。'
  },
  {
    id: 2,
    title: '地中海明珠',
    subtitle: '義希雙國深度12天',
    description: '探索地中海最璀璨的兩顆明珠，從羅馬的永恆魅力到雅典的古典風華。漫步威尼斯水都、品味托斯卡尼田園、遊覽聖托里尼夕陽，感受義大利與希臘千年文明的深度韻味。'
  },
  {
    id: 3,
    title: '北歐極光之旅',
    subtitle: '挪威峽灣奇景10天',
    description: '追尋北極光的神秘舞動，探索挪威壯麗峽灣的自然奇觀。搭乘郵輪穿越松恩峽灣、體驗薩米文化、享受午夜太陽，在世界盡頭感受大自然最純淨的美麗。'
  },
  {
    id: 4,
    title: '法式浪漫情懷',
    subtitle: '巴黎普羅旺斯9天',
    description: '沉浸在法式優雅的浪漫氛圍中，從巴黎的時尚魅力到普羅旺斯的田園風光。漫步塞納河畔、品味勃根地美酒、徜徉薰衣草花海，體驗最純正的法式生活藝術。'
  },
  {
    id: 5,
    title: '英倫古典巡禮',
    subtitle: '倫敦蘇格蘭8天',
    description: '踏上英倫三島的古典之旅，感受大不列顛的歷史底蘊。探訪倫敦地標、漫遊牛津劍橋、遊歷蘇格蘭高地，在莎士比亞的故鄉品味英式紳士文化。'
  },
  {
    id: 6,
    title: '德奧音樂之都',
    subtitle: '維也納慕尼黑7天',
    description: '聆聽古典音樂的永恆旋律，探索德奧兩國的藝術瑰寶。從維也納金色大廳到薩爾茲堡莫札特故鄉，從新天鵝堡到慕尼黑啤酒節，感受中歐的浪漫與優雅。'
  }
]

// 排序選項
export const SORT_OPTIONS = [
  '價格（低到高）',
  '價格（高到低）',
  '評價（低到高）',
  '評價（高到低）',
  '離市中心遠近'
]

// 常數
export const TOTAL_SLIDES = 6

// 工具函數
export const getCountryById = (countryId: string): TCountry | null => {
  for (const region of REGIONS) {
    const country = region.countries.find(c => c.id === countryId)
    if (country) {
      return country
    }
  }
  return null
}

export const convertCountriesToFilters = (selectedCountries: string[]): TFilter[] => {
  return selectedCountries.map(countryId => {
    const country = getCountryById(countryId)
    if (country) {
      return {
        id: countryId,
        label: country.name,
        type: 'country' as const
      }
    }
    return null
  }).filter(Boolean) as TFilter[]
}