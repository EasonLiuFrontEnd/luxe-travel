export type TFlightDirection = 'OUTBOUND' | 'RETURN'

export type TVisitType = 'INSIDE' | 'OUTSIDE' | 'PHOTO' | 'SELF_PAY' | 'FREE' | 'PASSBY' | 'FEATURED'

export type TTour = {
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
}

export type TFlight = {
  id: string
  productId: string
  direction: TFlightDirection
  day: number
  departAirport: string
  departName: string
  arriveAirport: string
  arriveName: string
  departTime: string
  arriveTime: string
  duration: string
  crossDay: boolean
  airlineCode: string
  airlineName: string
  flightNo: string
  isTransit: boolean
  remark: string
  createdAt: string
  updatedAt: string
}

export type THighlight = {
  id: string
  productId: string
  imageUrls: string[]
  layout: number
  title: string
  subtitle: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TMap = {
  id: string
  productId: string
  imageUrl: string
  note: string
  createdAt: string
  updatedAt: string
}

export type TRoute = {
  id: string
  itineraryId: string
  depart: string
  arrive: string
  duration: string
  distance: string
  createdAt: string
  updatedAt: string
}

export type TAttraction = {
  id: string
  code: string
  nameZh: string
  nameEn: string
  content: string
  region: string
  country: string
  city: string
  tags: string[]
  imageUrl: string | null
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export type TItineraryAttraction = {
  id: string
  itineraryId: string
  attractionId: string
  visitType: TVisitType
  createdAt: string
  updatedAt: string
  attraction: TAttraction
}

export type TItinerary = {
  id: string
  productId: string
  day: number
  title: string
  subtitle: string | null
  content: string
  breakfast: string
  lunch: string
  dinner: string
  hotel: string | null
  note: string | null
  featured: boolean
  createdAt: string
  updatedAt: string
  routes: TRoute[]
  attractions: TItineraryAttraction[]
}

export type TFeedback = {
  id: string
  title: string
  nickname: string
  content: string
  imageUrl: string
  linkUrl: string
  createdAt: string
  updatedAt: string
} | null

export type TTourProduct = {
  id: string
  code: string
  namePrefix: string
  name: string
  mainImageUrl: string
  summary: string
  description: string
  days: number
  nights: number
  departAirport: string
  arriveCountry: string
  arriveCity: string
  arriveAirport: string
  category: 'GROUP' | 'FREE' | 'RCAR'
  priceMin: number
  priceMax: number
  tags: string[]
  countries: string[]
  note: string
  memo: string | null
  deposit: string | null
  status: number
  staff: string | null
  reminder: string
  policy: string
  isFeatured: boolean
  categoryId: string
  subCategoryId: string
  feedbackId: string | null
  createdAt: string
  updatedAt: string
  tour: TTour[]
  flights: TFlight[]
  map: TMap | null
  highlights: THighlight[]
  itineraries: TItinerary[]
  feedback: TFeedback
}

export type TTourProductApiResponse = {
  status: boolean
  data: TTourProduct
}

export type TApiError = {
  message: string
  code?: string
  details?: unknown
}

export type TApiState<T> = {
  data: T | null
  isLoading: boolean
  error: TApiError | null
}

export type TTourFormData = {
  adult: number
  childWithBed: number
  childNoBed: number
  infant: number
  departDate: string
  contactName: string
  contactPhone: string
  contactEmail: string
  note?: string
}
