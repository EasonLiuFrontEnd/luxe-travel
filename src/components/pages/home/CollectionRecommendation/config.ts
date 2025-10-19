export type TRecommendationItem = {
  id: string
  title: string
  country: string
  imageSrc: string
  imageAlt: string
}

export type TRegion = {
  id: string
  name: string
  description: string
  image: string
}

export const recommendationData: TRecommendationItem[] = [
  {
    id: '1',
    title: '孝親輕鬆休閒10日遊',
    country: '愛爾蘭',
    imageSrc: '/home/recommend/area-1.jpg',
    imageAlt: '推薦地點-1',
  },
  {
    id: '2',
    title: '親子五人暑假快樂遊',
    country: '奧地利',
    imageSrc: '/home/recommend/area-2.jpg',
    imageAlt: '推薦地點-2',
  },
  {
    id: '3',
    title: '小資5日輕鬆遊',
    country: '比利時',
    imageSrc: '/home/recommend/area-3.jpg',
    imageAlt: '推薦地點-3',
  },
  {
    id: '4',
    title: '新婚夫妻15日蜜月遊',
    country: '英國',
    imageSrc: '/home/recommend/area-4.jpg',
    imageAlt: '推薦地點-4',
  },
  {
    id: '5',
    title: '閨蜜6日渡假遊',
    country: '西班牙',
    imageSrc: '/home/recommend/area-5.jpg',
    imageAlt: '推薦地點-5',
  },
]

export const regionData: Record<string, TRegion> = {
  IT: {
    id: 'IT',
    name: '義大利',
    description: '新婚夫妻15日蜜月遊',
    image: '/home/recommend/bg.jpg',
  },
  GB: {
    id: 'GB',
    name: '英國',
    description: '小資5日輕鬆遊',
    image: '/home/recommend/bg.jpg',
  },
  IE: {
    id: 'IE',
    name: '愛爾蘭',
    description: '孝親輕鬆休閒10日遊',
    image: '/home/recommend/bg.jpg',
  },
  BE: {
    id: 'BE',
    name: '比利時',
    description: '閨蜜6日渡假遊',
    image: '/home/recommend/bg.jpg',
  },
  SE: {
    id: 'SE',
    name: '瑞典',
    description: '親子五人暑假快樂遊',
    image: '/home/recommend/bg.jpg',
  },
}
