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
