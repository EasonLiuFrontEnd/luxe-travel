export type TTourData = {
  id: string
  image: string
  tagText: string
  title: string
  description: string
  price: string
  hoverTitle?: string
  hoverDescription?: string
}

export const freeTourData: TTourData[] = [
  {
    id: '1',
    image: '/home/itinerary/it-italy/free-1.jpg',
    tagText: '獨旅首選',
    title: '小資5日輕鬆遊',
    description: '義大利',
    price: '＄100,100'
  },
  {
    id: '2',
    image: '/home/itinerary/it-italy/free-2.jpg',
    tagText: '銀髮族最愛',
    title: '孝親輕鬆休閒10日遊',
    description: '義大利 / 西班牙 / 法國',
    price: '＄142,900'
  },
  {
    id: '3',
    image: '/home/itinerary/it-italy/free-3.jpg',
    tagText: '古蹟巡禮',
    title: '親子五人暑假快樂遊',
    description: '義大利 / 西班牙 / 法國',
    price: '＄167,900'
  }
]

export const groupTourData: TTourData[] = [
  {
    id: '1',
    image: '/home/itinerary/it-italy/group-1.png',
    tagText: '蜜月首選',
    title: '航向伊比利亞',
    description: '西葡珍寶探尋16天',
    price: '＄199,900',
    hoverTitle: '新婚夫妻15日蜜月遊',
    hoverDescription: '義大利 / 西班牙 / 法國'
  },
  {
    id: '2',
    image: '/home/itinerary/it-italy/group-2.png',
    tagText: '地中海巡禮',
    title: '藍色愛琴海',
    description: '伊比利亞半島14日深度之旅',
    price: '＄179,900'
  },
  {
    id: '3',
    image: '/home/itinerary/it-italy/group-3.jpg',
    tagText: '尊爵體驗',
    title: '蔚藍與玫瑰的優雅',
    description: '逐光義法海岸12天',
    price: '＄269,900'
  }
]