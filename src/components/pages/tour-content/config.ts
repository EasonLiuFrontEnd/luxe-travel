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
  itineraryItems: Array<{
    title: string
    picture: string
    intro: string
    note: string
  }>
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
    day: "01",
    direction: "去程",
    airline: "長榮航空",
    flightNumber: "CX-531",
    departure: {
      time: "19:55",
      airport: "台北市 桃園國際機場(TPE)",
      code: "TPE"
    },
    arrival: {
      time: "21:55",
      airport: "香港 香港國際機場(HK)",
      code: "HK"
    },
    duration: "02小時00分鐘"
  },
  {
    day: "02",
    direction: "去程",
    airline: "長榮航空",
    flightNumber: "CX-531",
    departure: {
      time: "00:20",
      airport: "香港 香港國際機場(HK)",
      code: "HK"
    },
    arrival: {
      time: "08:50",
      airport: "巴賽隆納 巴賽隆納機場(BCN)",
      code: "BCN"
    },
    duration: "14小時40分鐘"
  },
  {
    day: "15",
    direction: "回程",
    airline: "長榮航空",
    flightNumber: "CX-531",
    departure: {
      time: "13:00",
      airport: "巴賽隆納 巴賽隆納機場(BCN)",
      code: "BCN"
    },
    arrival: {
      time: "07:05",
      airport: "香港 香港國際機場(HK)",
      code: "HK",
      dayOffset: 1
    },
    duration: "12小時05分鐘"
  },
  {
    day: "16",
    direction: "回程",
    airline: "長榮航空",
    flightNumber: "CX-531",
    departure: {
      time: "08:35",
      airport: "香港 香港國際機場(HK)",
      code: "HK"
    },
    arrival: {
      time: "10:40",
      airport: "台北市 桃園國際機場(TPE)",
      code: "TPE"
    },
    duration: "01小時55分鐘"
  }
]

export const mockTourData: TTourPricing = {
  deposit: 40000,
  adult: 119000,
  childWithBed: 0,
  childExtraBed: 0,
  childNoBed: null,
  infant: 0
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
      }
    ],
    routeDescription: '今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里,今晚將宿於機上,祝您一夜好眠!今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里,今晚將宿於機上,祝您一夜好眠!今日準備好行李及輕鬆愉快的心情,前往桃園機場集合,專人替您辦理完登機手續後,搭乘豪華客機,航向西班牙馬德里。',
    itineraryItems: [
      {
        title: '哥多華清真寺',
        picture: '/tour-content/attraction-b.jpg',
        intro: '昔日回教首都的哥多華,歷經滄海桑田,古羅馬橋依然橫跨河流,屹立兩千年。這座精神堡壘——美麗的清真寺,見證了摩爾文化的繁榮與發展。其莊嚴外觀,內部高低起伏,瑪瑙、琥珀、大理石和花崗岩交織,每一處都彷彿讓人更接近阿拉的神聖與永恆。',
        note: '※如哥多華清真寺因宗教節日及彌撒不開放,則改安排參觀哥多華阿卡薩城堡,敬請知悉。'
      },
      {
        title: '阿爾罕布拉宮',
        picture: '/tour-content/attraction-c.jpg',
        intro: '阿爾罕布拉宮坐落於翠綠山巒之巔,是摩爾人「黃金時代」的偉大遺產。這座精雕細琢的宮殿中,矗立著卡洛斯五世的文藝復興風格宮殿,彷彿一踏入其中,便置身於即將消逝的東方廢墟之中,無聲地宣告著昔日的權力與征服。',
        note: '※如阿罕布拉宮休館或預訂滿,則改安排參觀格拉納達皇室禮拜堂,敬請知悉。'
      }
    ]
  },
]