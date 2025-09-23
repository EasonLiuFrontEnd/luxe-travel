'use client'

import GroupTourCard from './GroupTourCard'
import type { TBaseComponent } from '@/types'

type TTourDate = {
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
}

type TTourData = {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  tags: string[]
  dates: TTourDate[]
  imageIndex?: number
}

type TGroupTourResultsProps = TBaseComponent & {
  tours?: TTourData[]
}

const GroupTourResults = ({ tours = [], className }: TGroupTourResultsProps) => {
  const mockTours: TTourData[] = [
    {
      id: '1',
      title: '西葡珍寶探尋16天',
      subtitle: '航向伊比利亞',
      description: '走訪伊比利亞半島的璀璨文明，一次收藏西班牙與葡萄牙的藝術、歷史與風土人情。從馬德里到里斯本，沿途探訪世界遺產古城、高第建築、葡萄酒莊與陽光海岸，16 天展開一場經典與浪漫交織的文化之旅。',
      price: 199000,
      imageIndex: 1,
      tags: ['蜜月首選', '命運之歌法朵', '佛朗明哥舞', '大航海時代傳說', '藝術建築'],
      dates: [
        { date: '9/9(日)', status: '已成團' },
        { date: '9/12(三)', status: '熱銷中' },
        { date: '9/19(二)', status: '已成團' },
        { date: '10/8(四)', status: '已滿團' },
        { date: '10/18(五)', status: '熱銷中' },
        { date: '10/21(一)', status: '熱銷中' },
        { date: '10/28(日)', status: '已成團' },
        { date: '10/30(日)', status: '已成團' }
      ]
    },
    {
      id: '2',
      title: '希臘愛琴海藍白夢境14天',
      subtitle: '愛琴海蜜月之旅',
      description: '來趟希臘讓蜜月變成甜蜜童話吧！在聖托里尼的藍白世界裡，您們的愛情將像日落一樣美麗，古色古香的雅典街頭等您們漫遊，地中海美食更是讓人心動的美味。愛情在這裡，就像魔法般迷人！',
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
        { date: '11/10(五)', status: '已成團' }
      ]
    },
    {
      id: '3',
      title: '義大利藝術文化深度15天',
      subtitle: '文藝復興之旅',
      description: '從羅馬的古典魅力到佛羅倫斯的文藝復興藝術，再到威尼斯的浪漫水都。深度體驗義大利的藝術寶藏、美食文化與歷史遺跡，15天完整探索亞平寧半島的無窮魅力。',
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
        { date: '11/8(三)', status: '熱銷中' }
      ]
    },
    {
      id: '4',
      title: '法國浪漫香檳之路12天',
      subtitle: '法蘭西優雅體驗',
      description: '巴黎的時尚魅力、普羅旺斯的薰衣草田、波爾多的頂級酒莊，還有香檳區的氣泡美酒。12天深度體驗法國的浪漫、優雅與精緻生活藝術。',
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
        { date: '11/13(一)', status: '已成團' }
      ]
    }
  ]

  const toursToDisplay = tours.length > 0 ? tours : mockTours

  const handleDetailsClick = (tourId: string) => {
    console.log('Tour details clicked:', tourId)
  }

  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className || ''}`}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8'>
        {toursToDisplay.map((tour) => (
          <GroupTourCard
            key={tour.id}
            title={tour.title}
            subtitle={tour.subtitle}
            description={tour.description}
            price={tour.price}
            tags={tour.tags}
            dates={tour.dates}
            imageIndex={tour.imageIndex}
            onDetailsClick={() => handleDetailsClick(tour.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupTourResults