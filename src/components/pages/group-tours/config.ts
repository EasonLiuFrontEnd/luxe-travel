// 團體行程配置數據

export type TRegion = {
  id: string
  name: string
  countries: TCountry[]
}

export type TCountry = {
  id: string
  name: string
  code?: string
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

export type TSelectedFilters = TFilter[]

export type TTourDate = {
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
}

export type TTourData = {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  tags: string[]
  dates: TTourDate[]
  mainImageUrl?: string
}

// DestinationFilter 搜尋選項
export const REGIONS: TRegion[] = [
  {
    id: 'western-europe',
    name: '西歐',
    countries: [
      { id: 'france', name: '法國', code: 'FR' },
      { id: 'uk', name: '英國', code: 'GB' },
      { id: 'germany', name: '德國', code: 'DE' },
      { id: 'netherlands', name: '荷蘭', code: 'NL' },
      { id: 'belgium', name: '比利時', code: 'BE' },
    ],
  },
  {
    id: 'southern-europe',
    name: '南歐',
    countries: [
      { id: 'spain', name: '西班牙', code: 'ES' },
      { id: 'portugal', name: '葡萄牙', code: 'PT' },
      { id: 'italy', name: '義大利', code: 'IT' },
      { id: 'greece', name: '希臘', code: 'GR' },
    ],
  },
  {
    id: 'northern-europe',
    name: '北歐',
    countries: [
      { id: 'norway', name: '挪威', code: 'NO' },
      { id: 'sweden', name: '瑞典', code: 'SE' },
      { id: 'denmark', name: '丹麥', code: 'DK' },
      { id: 'finland', name: '芬蘭', code: 'FI' },
    ],
  },
]

// Banner 幻燈片內容
export const SLIDE_CONTENT: TSlideContent[] = [
  {
    id: 1,
    title: '航向伊比利亞',
    subtitle: '西葡珍寶探尋16天',
    description:
      '走訪伊比利亞半島的璀璨文明，一次收藏西班牙與葡萄牙的藝術、歷史與風土人情。從馬德里到里斯本，沿途探訪世界遺產古城、高第建築、葡萄酒莊與陽光海岸，16 天展開一場經典與浪漫交織的文化之旅。',
  },
  {
    id: 2,
    title: '地中海明珠',
    subtitle: '義希雙國深度12天',
    description:
      '探索地中海最璀璨的兩顆明珠，從羅馬的永恆魅力到雅典的古典風華。漫步威尼斯水都、品味托斯卡尼田園、遊覽聖托里尼夕陽，感受義大利與希臘千年文明的深度韻味。',
  },
  {
    id: 3,
    title: '北歐極光之旅',
    subtitle: '挪威峽灣奇景10天',
    description:
      '追尋北極光的神秘舞動，探索挪威壯麗峽灣的自然奇觀。搭乘郵輪穿越松恩峽灣、體驗薩米文化、享受午夜太陽，在世界盡頭感受大自然最純淨的美麗。',
  },
  {
    id: 4,
    title: '法式浪漫情懷',
    subtitle: '巴黎普羅旺斯9天',
    description:
      '沉浸在法式優雅的浪漫氛圍中，從巴黎的時尚魅力到普羅旺斯的田園風光。漫步塞納河畔、品味勃根地美酒、徜徉薰衣草花海，體驗最純正的法式生活藝術。',
  },
  {
    id: 5,
    title: '英倫古典巡禮',
    subtitle: '倫敦蘇格蘭8天',
    description:
      '踏上英倫三島的古典之旅，感受大不列顛的歷史底蘊。探訪倫敦地標、漫遊牛津劍橋、遊歷蘇格蘭高地，在莎士比亞的故鄉品味英式紳士文化。',
  },
  {
    id: 6,
    title: '德奧音樂之都',
    subtitle: '維也納慕尼黑7天',
    description:
      '聆聽古典音樂的永恆旋律，探索德奧兩國的藝術瑰寶。從維也納金色大廳到薩爾茲堡莫札特故鄉，從新天鵝堡到慕尼黑啤酒節，感受中歐的浪漫與優雅。',
  },
]

// 排序選項
export const SORT_OPTIONS = [
  '價格（低到高）',
  '價格（高到低）',
  '評價（低到高）',
  '評價（高到低）',
  '離市中心遠近',
]

export const convertSortOption = (sortOption: string): { sort: string; order: 'asc' | 'desc' } => {
  switch (sortOption) {
    case '價格（低到高）':
      return { sort: 'priceMin', order: 'asc' }
    case '價格（高到低）':
      return { sort: 'priceMin', order: 'desc' }
    case '評價（低到高）':
      // TODO: 後端缺少評價欄位，暫時用建立時間替代（最舊的優先）
      // 等待後端提供 rating 或 reviewScore 欄位
      return { sort: 'createdAt', order: 'asc' }
    case '評價（高到低）':
      // TODO: 後端缺少評價欄位，暫時用建立時間替代（最新的優先）
      // 等待後端提供 rating 或 reviewScore 欄位
      return { sort: 'createdAt', order: 'desc' }
    case '離市中心遠近':
      // TODO: 後端缺少地理位置欄位，暫時用最高價格替代
      // 等待後端提供 distanceToCenter 欄位
      return { sort: 'priceMax', order: 'asc' }
    default:
      return { sort: 'priceMin', order: 'asc' }
  }
}

// 常數
export const TOTAL_SLIDES = 6

// 工具函數
export const getCountryById = (countryId: string): TCountry | null => {
  for (const region of REGIONS) {
    const country = region.countries.find((c) => c.id === countryId)
    if (country) {
      return country
    }
  }
  return null
}

export const getCountryCodes = (countryIds: string[]): string[] => {
  return countryIds
    .map((countryId) => {
      const country = getCountryById(countryId)
      return country?.code
    })
    .filter(Boolean) as string[]
}

export const convertCountriesToFilters = (
  selectedCountries: string[],
): TFilter[] => {
  return selectedCountries
    .map((countryId) => {
      const country = getCountryById(countryId)
      if (country) {
        return {
          id: countryId,
          label: country.name,
          type: 'country' as const,
        }
      }
      return null
    })
    .filter(Boolean) as TFilter[]
}

export const convertProductToTourData = (product: {
  id: string
  name: string
  namePrefix?: string
  summary?: string
  description?: string
  priceMin: number
  tags?: string[]
  days?: number
  mainImageUrl?: string
  tour?: Array<{
    id: string
    productId: string
    code: string
    departDate: string
    returnDate: string
    adult: string
    childWithBed: string
    childNoBed: string
    childExtraBed: string
    infant: string
    deposit: string
    status: number
    note: string | null
    createdAt: string
    updatedAt: string
  }>
}): TTourData => {
  const convertTourDates = (): TTourDate[] => {
    if (product.tour && product.tour.length > 0) {
      return product.tour.map(tour => {
        const departDate = new Date(tour.departDate)
        const month = departDate.getMonth() + 1
        const day = departDate.getDate()
        const weekdays = ['日', '一', '二', '三', '四', '五', '六']
        const weekday = weekdays[departDate.getDay()]

        const dateString = `${month}/${day}(${weekday})`

        const status = tour.status === 1 ? '已成團' :
                      tour.status === 2 ? '熱銷中' :
                      tour.status === 3 ? '已滿團' : '熱銷中'

        return { date: dateString, status }
      })
    }

    return [
      { date: '9/9(日)', status: '已成團' },
      { date: '9/12(三)', status: '熱銷中' },
      { date: '9/19(二)', status: '已成團' },
      { date: '10/8(四)', status: '已滿團' },
      { date: '10/18(五)', status: '熱銷中' },
    ]
  }

  return {
    id: product.id,
    title: product.name,
    subtitle: product.namePrefix || '',
    description: product.summary || product.description || '',
    price: product.priceMin,
    tags: product.tags || [],
    dates: convertTourDates(),
    mainImageUrl: product.mainImageUrl || '',
  }
}

// GroupTourResults 模擬資料
export const mockTours: TTourData[] = [
  {
    id: '1',
    title: '西葡珍寶探尋16天',
    subtitle: '航向伊比利亞',
    description:
      '走訪伊比利亞半島的璀璨文明，一次收藏西班牙與葡萄牙的藝術、歷史與風土人情。從馬德里到里斯本，沿途探訪世界遺產古城、高第建築、葡萄酒莊與陽光海岸，16 天展開一場經典與浪漫交織的文化之旅。',
    price: 199000,
    imageIndex: 1,
    tags: [
      '蜜月首選',
      '命運之歌法朵',
      '佛朗明哥舞',
      '大航海時代傳說',
      '藝術建築',
    ],
    dates: [
      { date: '9/9(日)', status: '已成團' },
      { date: '9/12(三)', status: '熱銷中' },
      { date: '9/19(二)', status: '已成團' },
      { date: '10/8(四)', status: '已滿團' },
      { date: '10/18(五)', status: '熱銷中' },
      { date: '10/21(一)', status: '熱銷中' },
      { date: '10/28(日)', status: '已成團' },
      { date: '10/30(日)', status: '已成團' },
    ],
  },
  {
    id: '2',
    title: '希臘愛琴海藍白夢境14天',
    subtitle: '愛琴海蜜月之旅',
    description:
      '來趟希臘讓蜜月變成甜蜜童話吧！在聖托里尼的藍白世界裡，您們的愛情將像日落一樣美麗，古色古香的雅典街頭等您們漫遊，地中海美食更是讓人心動的美味。愛情在這裡，就像魔法般迷人！',
    price: 159000,
    imageIndex: 2,
    tags: ['蜜月首選', '愛琴海夕陽', '古希臘文明', '聖托里尼', '米克諾斯'],
    dates: [
      { date: '9/15(五)', status: '熱銷中' },
      { date: '9/22(五)', status: '已成團' },
      { date: '10/6(五)', status: '已成團' },
      { date: '10/13(五)', status: '熱銷中' },
      { date: '10/20(五)', status: '已滿團' },
      { date: '10/27(五)', status: '已成團' },
      { date: '11/3(五)', status: '熱銷中' },
      { date: '11/10(五)', status: '已成團' },
    ],
  },
  {
    id: '3',
    title: '義大利藝術文化深度15天',
    subtitle: '文藝復興之旅',
    description:
      '從羅馬的古典魅力到佛羅倫斯的文藝復興藝術，再到威尼斯的浪漫水都。深度體驗義大利的藝術寶藏、美食文化與歷史遺跡，15天完整探索亞平寧半島的無窮魅力。',
    price: 189000,
    imageIndex: 3,
    tags: ['文藝復興', '藝術之旅', '美食體驗', '歷史古蹟', '浪漫水都'],
    dates: [
      { date: '9/20(三)', status: '熱銷中' },
      { date: '9/27(三)', status: '已成團' },
      { date: '10/4(三)', status: '熱銷中' },
      { date: '10/11(三)', status: '已成團' },
      { date: '10/18(三)', status: '已滿團' },
      { date: '10/25(三)', status: '熱銷中' },
      { date: '11/1(三)', status: '已成團' },
      { date: '11/8(三)', status: '熱銷中' },
    ],
  },
  {
    id: '4',
    title: '法國浪漫香檳之路12天',
    subtitle: '法蘭西優雅體驗',
    description:
      '巴黎的時尚魅力、普羅旺斯的薰衣草田、波爾多的頂級酒莊，還有香檳區的氣泡美酒。12天深度體驗法國的浪漫、優雅與精緻生活藝術。',
    price: 229000,
    imageIndex: 4,
    tags: ['浪漫巴黎', '薰衣草田', '頂級酒莊', '香檳品鑑', '時尚購物'],
    dates: [
      { date: '9/25(一)', status: '已成團' },
      { date: '10/2(一)', status: '熱銷中' },
      { date: '10/9(一)', status: '已成團' },
      { date: '10/16(一)', status: '熱銷中' },
      { date: '10/23(一)', status: '已滿團' },
      { date: '10/30(一)', status: '已成團' },
      { date: '11/6(一)', status: '熱銷中' },
      { date: '11/13(一)', status: '已成團' },
    ],
  },
]
