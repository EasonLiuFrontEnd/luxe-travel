export type TTimeSlot = {
  id: string
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
  href: string
}

export type TFlight = {
  day: string
  direction: '去程' | '回程'
  airline: string
  flightNumber: string
  departure: {
    time: string
    airport: string
    code: string
    dayOffset?: number
  }
  arrival: {
    time: string
    airport: string
    code: string
    dayOffset?: number
  }
  duration: string
}

export type TPriceValue = number | 0 | null

export type TTourPricing = {
  deposit: TPriceValue
  adult: TPriceValue
  childWithBed: TPriceValue
  childExtraBed: TPriceValue
  childNoBed: TPriceValue
  infant: TPriceValue
}

export type TItinerary = {
  day: string
  destination: string
  route: Array<{
    start: string
    end: string
    time: string
    distance: string
  }>
  routeDescription: string
  attractions: Array<{
    title: string
    picture: string
    intro: string
    note: string
  }>
  activity: Array<{
    title: string
    place: Array<{
      'zh-TW': string
      en: string
      picture: string
      intro: string
    }>
  }>
  diet: {
    breakfast: string
    lunch: string
    dinner: string
  }
  hotel: string
}

export const mockTimeSlots: TTimeSlot[] = [
  { id: '1', date: '9/9(日)', status: '已成團', href: '#' },
  { id: '2', date: '9/16(日)', status: '熱銷中', href: '#' },
  { id: '3', date: '9/23(日)', status: '已滿團', href: '#' },
  { id: '4', date: '9/30(日)', status: '已成團', href: '#' },
  { id: '5', date: '10/7(日)', status: '熱銷中', href: '#' },
  { id: '6', date: '10/14(日)', status: '已滿團', href: '#' },
  { id: '7', date: '10/21(日)', status: '已成團', href: '#' },
  { id: '8', date: '10/28(日)', status: '熱銷中', href: '#' },
  { id: '9', date: '11/4(日)', status: '已滿團', href: '#' },
  { id: '10', date: '11/11(日)', status: '已成團', href: '#' },
  { id: '11', date: '11/18(日)', status: '熱銷中', href: '#' },
  { id: '12', date: '11/25(日)', status: '已滿團', href: '#' },
]

export const flightData: TFlight[] = [
  {
    day: '01',
    direction: '去程',
    airline: '長榮航空',
    flightNumber: 'CX-531',
    departure: {
      time: '19:55',
      airport: '台北市 桃園國際機場(TPE)',
      code: 'TPE',
    },
    arrival: {
      time: '21:55',
      airport: '香港 香港國際機場(HK)',
      code: 'HK',
    },
    duration: '02小時00分鐘',
  },
  {
    day: '02',
    direction: '去程',
    airline: '長榮航空',
    flightNumber: 'CX-531',
    departure: {
      time: '00:20',
      airport: '香港 香港國際機場(HK)',
      code: 'HK',
    },
    arrival: {
      time: '08:50',
      airport: '巴賽隆納 巴賽隆納機場(BCN)',
      code: 'BCN',
    },
    duration: '14小時40分鐘',
  },
  {
    day: '15',
    direction: '回程',
    airline: '長榮航空',
    flightNumber: 'CX-531',
    departure: {
      time: '13:00',
      airport: '巴賽隆納 巴賽隆納機場(BCN)',
      code: 'BCN',
    },
    arrival: {
      time: '07:05',
      airport: '香港 香港國際機場(HK)',
      code: 'HK',
      dayOffset: 1,
    },
    duration: '12小時05分鐘',
  },
  {
    day: '16',
    direction: '回程',
    airline: '長榮航空',
    flightNumber: 'CX-531',
    departure: {
      time: '08:35',
      airport: '香港 香港國際機場(HK)',
      code: 'HK',
    },
    arrival: {
      time: '10:40',
      airport: '台北市 桃園國際機場(TPE)',
      code: 'TPE',
    },
    duration: '01小時55分鐘',
  },
]

export const mockTourData: TTourPricing = {
  deposit: 40000,
  adult: 119000,
  childWithBed: 0,
  childExtraBed: 0,
  childNoBed: null,
  infant: 0,
}

export const isValidPrice = (price: TPriceValue): boolean => {
  return price !== null && price > 0
}

export const formatNumber = (price: TPriceValue): string => {
  if (price === null || price === 0) return ''
  return price.toLocaleString()
}

export const itineraryData: TItinerary[] = [
  {
    day: 'Day01',
    destination: '桃園/香港/馬德里',
    route: [],
    routeDescription:
      '今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里,今晚將宿於機上,祝您一夜好眠!',
    attractions: [
      {
        title: '馬德里機場',
        picture: '/tour-content/attraction-a.jpg',
        intro:
          '義大利，位於南歐的地中海心臟，是一個融合藝術、歷史與美食的迷人國度。從古羅馬的壯麗遺跡到托斯卡納的葡萄園，再到威尼斯蜿蜒的水道，義大利以其獨特的文化魅力與自然風光吸引無數旅人前往。這裡是文藝復興的發源地，也是世界聞名的美食天堂，一口義大利麵與一杯濃郁濃縮咖啡，便能感受屬於義大利的熱情與靈魂。',
        note: '',
      },
    ],
    activity: [],
    diet: {
      breakfast: '敬請自理',
      lunch: '敬請自理',
      dinner: '機上',
    },
    hotel: '夜宿機上',
  },
  {
    day: 'Day04',
    destination: '哥多華 – 格拉納達',
    route: [
      {
        start: '哥都華',
        end: '格拉納達',
        time: '2hrs',
        distance: '127KM',
      },
      {
        start: '格拉納達',
        end: '曼達拉',
        time: '2hrs',
        distance: '127KM',
      },
      {
        start: '曼達拉',
        end: '格拉納達',
        time: '2hrs',
        distance: '127KM',
      },
      {
        start: '格拉納達',
        end: '哥都華',
        time: '2hrs',
        distance: '127KM',
      },
    ],
    routeDescription:
      '今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里,今晚將宿於機上,祝您一夜好眠!今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里,今晚將宿於機上,祝您一夜好眠!今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里。',
    attractions: [
      {
        title: '哥多華清真寺',
        picture: '/tour-content/attraction-b.jpg',
        intro:
          '昔日回教首都的哥多華,歷經滄海桑田,古羅馬橋依然橫跨河流,屹立兩千年。這座精神堡壘——美麗的清真寺,見證了摩爾文化的繁榮與發展。其莊嚴外觀,內部高低起伏,瑪瑙、琥珀、大理石和花崗岩交織,每一處都彷彿讓人更接近阿拉的神聖與永恆。',
        note: '※如哥多華清真寺因宗教節日及彌撒不開放,則改安排參觀哥多華阿卡薩城堡,敬請知悉。',
      },
      {
        title: '阿爾罕布拉宮',
        picture: '/tour-content/attraction-c.jpg',
        intro:
          '阿爾罕布拉宮坐落於翠綠山巒之巔,是摩爾人「黃金時代」的偉大遺產。這座精雕細琢的宮殿中,矗立著卡洛斯五世的文藝復興風格宮殿,彷彿一踏入其中,便置身於即將消逝的東方廢墟之中,無聲地宣告著昔日的權力與征服。',
        note: '※如阿罕布拉宮休館或預訂滿,則改安排參觀格拉納達皇室禮拜堂,敬請知悉。',
      },
    ],
    activity: [],
    diet: {
      breakfast: '旅館內',
      lunch: '西班牙傳統料理',
      dinner: '格拉納達風味餐',
    },
    hotel:
      'Hotel NH Collection Granada Victoria 或 Meliá Granada 或 Eurostars Gran Vía 或 同級(4★)飯店',
  },
  {
    day: 'Day06',
    destination: '里斯本 – 辛特拉 – 洛卡岬 – 里斯本【命運之歌~法朵】',
    route: [
      {
        start: '隆達',
        end: '賽維亞',
        time: '2hrs',
        distance: '127KM',
      },
    ],
    routeDescription:
      '今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里。',
    attractions: [
      {
        title: '賽維亞',
        picture: '/tour-content/attraction-d.jpg',
        intro:
          '塞維亞擁有基督教、猶太教與伊斯蘭三大文化的交織與融合,彷彿一場如熱情佛朗明歌舞般的視覺盛宴。這座城市如同舞動的女人,婀娜多姿、風情萬種,展現出難以抗拒的魅力。作為安達魯西亞的守護天使,塞維亞以其多彩多姿、兼容並蓄的獨特魅力脫穎而出;而鮮明的西班牙廣場則細訴著她歷經歲月洗禮,依然綻放的美麗風采。',
        note: '',
      },
      {
        title: '賽維亞大教堂',
        picture: '/tour-content/attraction-e.jpg',
        intro:
          '塞維亞擁有基督教、猶太教與伊斯蘭三大文化的交織與融合,彷彿一場如熱情佛朗明歌舞般的視覺盛宴。這座城市如同舞動的女人,婀娜多姿、風情萬種,展現出難以抗拒的魅力。作為安達魯西亞的守護天使,塞維亞以其多彩多姿、兼容並蓄的獨特魅力脫穎而出;而鮮明的西班牙廣場則細訴著她歷經歲月洗禮,依然綻放的美麗風采。',
        note: '※如塞維亞大教堂因宗教節日及彌撒不開放,則改安排參觀塞維亞阿卡薩城堡,敬請知悉。',
      },
    ],
    activity: [
      {
        title: '入內參觀',
        place: [
          {
            'zh-TW': '塞維亞西班牙廣場',
            en: 'Alhambra',
            picture: '/tour-content/place-a.jpg',
            intro:
              '義大利，位於南歐的地中海心臟，是一個融合藝術、歷史與美食的迷人國度。從古羅馬的壯麗遺跡到托斯卡納的葡萄園，再到威尼斯蜿蜒的水道，義大利以其獨特的文化魅力與自然風光吸引無數旅人前往。這裡是文藝復興的發源地，也是世界聞名的美食天堂，一口義大利麵與一杯濃郁濃縮咖啡，便能感受屬於義大利的熱情與靈魂。',
          },
          {
            'zh-TW': '都市雨傘',
            en: 'Alhambra',
            picture: '',
            intro: '',
          },
          {
            'zh-TW': '聖本篤火車站',
            en: '',
            picture: '',
            intro: '',
          },
          {
            'zh-TW': '',
            en: 'Café Majestic',
            picture: '',
            intro: '',
          },
        ],
      },
      {
        title: '下車參觀',
        place: [
          {
            'zh-TW': '塞維亞西班牙廣場',
            en: 'Alhambra',
            picture: '/tour-content/place-b.jpg',
            intro:
              '義大利，位於南歐的地中海心臟，是一個融合藝術、歷史與美食的迷人國度。從古羅馬的壯麗遺跡到托斯卡納的葡萄園，再到威尼斯蜿蜒的水道，義大利以其獨特的文化魅力與自然風光吸引無數旅人前往。這裡是文藝復興的發源地，也是世界聞名的美食天堂，一口義大利麵與一杯濃郁濃縮咖啡，便能感受屬於義大利的熱情與靈魂。',
          },
          {
            'zh-TW': '都市雨傘',
            en: 'Alhambra',
            picture: '',
            intro: '',
          },
          {
            'zh-TW': '聖本篤火車站',
            en: '',
            picture: '',
            intro: '',
          },
          {
            'zh-TW': '',
            en: 'Café Majestic',
            picture: '',
            intro: '',
          },
        ],
      },
    ],
    diet: {
      breakfast: '旅館內',
      lunch: '安達魯西亞風味料理',
      dinner: '自由活動,敬請自理',
    },
    hotel:
      'Ocean Drive Sevilla 或 Hotel Casa de Indias by Intur 或 同級(4★)飯店',
  },
]
