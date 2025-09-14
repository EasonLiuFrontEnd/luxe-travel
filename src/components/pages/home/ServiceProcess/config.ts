export type TServiceStep = {
  number: string
  title: string
  englishTitle: string
  description?: string
  backgroundClass?: string
}

export const serviceSteps: TServiceStep[] = [
  {
    number: '01',
    title: '瞭解需求',
    englishTitle: 'Needs Discovery',
    description: '點擊需求單填寫並提交或透過LINE@詢問，旅遊規劃師將與您聯繫，詳細了解您的需求與偏好。',
    backgroundClass: 'goldGradientBackground',
  },
  {
    number: '02',
    title: '規劃 ＆ 報價',
    englishTitle: 'Planning & Quotation',
  },
  {
    number: '03',
    title: '典藏旅遊安排',
    englishTitle: 'Arrangement',
  },
  {
    number: '04',
    title: '行前說明',
    englishTitle: 'Pre-Departure Briefing',
  },
]

export const getStepStyles = (number: string) => {
  switch (number) {
    case '01':
      return 'text-white min-h-[480px] lg:min-w-[228px] xl:min-w-[400px] xl:max-w-[601px] xl:aspect-[601/527]'
    case '02':
      return 'bg-white text-[#333333] min-h-[573px] xl:max-w-[268px] xl:aspect-[268/588] lg:rotate-[-5deg] lg:mb-[10.5px] lg:ml-[20px] lg:mr-[24px]'
    case '03':
      return 'bg-white text-[#333333] min-h-[411px] xl:max-w-[288px] xl:aspect-[288/485]'
    case '04':
      return 'bg-white text-[#333333] min-h-[617px] xl:max-w-[208px] xl:aspect-[208/641]'
    default:
      return 'bg-white text-[#333333]'
  }
}

