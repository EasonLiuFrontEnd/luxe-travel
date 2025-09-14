import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TIntroduction,
  TIntroductionResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchIntroductionsData = async (countryId?: string): Promise<TIntroduction[]> => {
  const endpoint = countryId 
    ? `/admin/country-introductions?countryId=${countryId}`
    : '/admin/country-introductions'
  const response = await apiClient.get<TIntroductionResponse>(endpoint)
  return response?.data?.rows || []
}

export const introductionsApiMock: TIntroductionResponse = {
  status: true,
  message: '成功取得國家介紹列表',
  rows: [
    {
      id: '68b05373564da72a7ab17536',
      countryId: '68b05373564da72a7ab17536',
      countryName: '克羅埃西亞',
      imageUrl: '/home/itinerary/hr-croatia/introduction.jpg',
      description: '克羅埃西亞位於東南歐巴爾幹半島，擁有令人讚嘆的亞得里亞海海岸線。這個美麗的國家以其碧藍的海水、古老的城牆和豐富的文化遺產而聞名。杜布羅夫尼克被譽為「亞得里亞海的珍珠」，而普利特維采湖群國家公園則以其壯觀的瀑布和湖泊吸引著世界各地的遊客。',
      order: 1,
      createdAt: '2025-08-28T13:02:43.217Z',
      updatedAt: '2025-08-28T13:02:43.217Z',
    },
    {
      id: '68b05382564da72a7ab17537',
      countryId: '68b05382564da72a7ab17537',
      countryName: '捷克',
      imageUrl: '/home/itinerary/cz-czech/introduction.jpg',
      description: '捷克共和國位於中歐心臟地帶，以其童話般的城堡、中世紀建築和豐富的歷史而著稱。首都布拉格被稱為「百塔之城」，擁有令人驚嘆的哥特式和巴洛克式建築。這個國家也以其優質的啤酒文化和溫泉小鎮而聞名，為遊客提供了完美的文化與休閒體驗。',
      order: 2,
      createdAt: '2025-08-28T13:02:58.975Z',
      updatedAt: '2025-08-28T13:02:58.975Z',
    },
    {
      id: '68b05391564da72a7ab17538',
      countryId: '68b05391564da72a7ab17538',
      countryName: '葡萄牙',
      imageUrl: '/home/itinerary/pt-portugal/introduction.jpg',
      description: '葡萄牙位於歐洲西南端，擁有豐富的海洋歷史和獨特的文化魅力。從里斯本的古典建築到波爾圖的酒窖，再到阿爾加維的金色海灘，葡萄牙以其溫暖的氣候、美味的海鮮和友善的人民吸引著世界各地的遊客。',
      order: 3,
      createdAt: '2025-08-28T13:03:13.127Z',
      updatedAt: '2025-08-28T13:03:13.127Z',
    },
    {
      id: '68b0539e564da72a7ab17539',
      countryId: '68b0539e564da72a7ab17539',
      countryName: '瑞士',
      imageUrl: '/home/itinerary/ch-switzerland/introduction.jpg',
      description: '瑞士位於中歐阿爾卑斯山脈的心臟地帶，以其壯麗的山峰、清澈的湖泊和精確的鐘錶而聞名於世。這個國家提供了完美的自然與文化體驗，從因特拉肯的戶外活動到蘇黎世的國際氛圍，瑞士是追求品質生活的理想目的地。',
      order: 4,
      createdAt: '2025-08-28T13:03:26.187Z',
      updatedAt: '2025-08-28T13:03:26.187Z',
    },
    {
      id: '68b053ad564da72a7ab1753a',
      countryId: '68b053ad564da72a7ab1753a',
      countryName: '愛爾蘭',
      imageUrl: '/home/itinerary/ie-ireland/introduction.jpg',
      description: '愛爾蘭，這個被稱為「翡翠島」的國家，以其翠綠的田野、古老的城堡和熱情的民族文化著稱。從都柏林的文學傳統到克里夫斯海岸的壯麗景色，愛爾蘭提供了豐富的歷史體驗和自然美景。',
      order: 5,
      createdAt: '2025-08-28T13:03:41.930Z',
      updatedAt: '2025-08-28T13:03:41.930Z',
    },
    {
      id: '68b053ba564da72a7ab1753b',
      countryId: '68b053ba564da72a7ab1753b',
      countryName: '德國',
      imageUrl: '/home/itinerary/de-germany/introduction.jpg',
      description: '德國位於中歐的心臟地帶，融合了豐富的歷史、現代的城市和美麗的自然景觀。從柏林的歷史遺跡到巴伐利亞的童話城堡，德國以其深厚的文化底蘊、優質的啤酒和精密的工藝技術吸引著世界各地的遊客。',
      order: 6,
      createdAt: '2025-08-28T13:03:54.312Z',
      updatedAt: '2025-08-28T13:03:54.312Z',
    },
    {
      id: '68b053c6564da72a7ab1753c',
      countryId: '68b053c6564da72a7ab1753c',
      countryName: '匈牙利',
      imageUrl: '/home/itinerary/hu-hungary/introduction.jpg',
      description: '匈牙利位於中歐，以其獨特的文化、溫泉浴場和美麗的建築而聞名。首都布達佩斯被多瑙河分為布達和佩斯兩部分，擁有令人驚嘆的國會大廈和古老的城堡。匈牙利也以其美味的匈牙利燉牛肉和甜點而著稱。',
      order: 7,
      createdAt: '2025-08-28T13:04:06.694Z',
      updatedAt: '2025-08-28T13:04:06.694Z',
    },
    {
      id: '68b053d4564da72a7ab1753d',
      countryId: '68b053d4564da72a7ab1753d',
      countryName: '西班牙',
      imageUrl: '/home/itinerary/es-spain/introduction.jpg',
      description: '西班牙位於伊比利亞半島，是一個充滿激情和活力的國家。從馬德里的藝術博物館到巴塞隆納的高第建築，從安達魯西亞的佛朗明哥舞蹈到巴斯克地區的美食文化，西班牙以其多樣化的地區特色和豐富的文化遺產吸引著遊客。',
      order: 8,
      createdAt: '2025-08-28T13:04:20.726Z',
      updatedAt: '2025-08-28T13:04:20.726Z',
    },
    {
      id: '68b053e0564da72a7ab1753e',
      countryId: '68b053e0564da72a7ab1753e',
      countryName: '希臘',
      imageUrl: '/home/itinerary/gr-greece/introduction.jpg',
      description: '希臘，西方文明的搖籃，位於地中海東部，擁有數千年的悠久歷史和無數的神話傳說。從雅典的古蹟到聖托里尼的白色房屋，希臘以其古典的建築、碧藍的海水和豐富的神話文化吸引著世界各地的遊客。',
      order: 9,
      createdAt: '2025-08-28T13:04:32.030Z',
      updatedAt: '2025-08-28T13:04:32.030Z',
    },
    {
      id: '68b053f0564da72a7ab1753f',
      countryId: '68b053f0564da72a7ab1753f',
      countryName: '比利時',
      imageUrl: '/home/itinerary/be-belgium/introduction.jpg',
      description: '比利時位於西歐，雖然國土面積不大，但擁有豐富的歷史和文化。從布魯塞爾的歐盟總部到布魯日的中世紀建築，比利時以其精美的巧克力、美味的啤酒和獨特的建築風格而聞名於世。',
      order: 10,
      createdAt: '2025-08-28T13:04:48.257Z',
      updatedAt: '2025-08-28T13:04:48.257Z',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 10,
    pageCount: 1,
  },
}

export const useIntroductions = (countryId?: string): TUseHomeQueryResult<TIntroduction[], TIntroductionResponse> => {
  const query = useQuery<TIntroduction[], AxiosError<TApiResponse<TIntroduction[]>>>({
    queryKey: ['introductions', countryId],
    queryFn: () => fetchIntroductionsData(countryId),
  })

  return { query, mock: introductionsApiMock }
}