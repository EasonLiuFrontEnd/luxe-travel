export type TServiceStep = {
  number: string
  title: string
  englishTitle: string
  description?: string
}

export const serviceSteps: TServiceStep[] = [
  {
    number: '01',
    title: '瞭解需求',
    englishTitle: 'Needs Discovery',
    description:
      '點擊需求單填寫並提交或透過LINE@詢問，旅遊規劃師將與您聯繫，詳細了解您的需求與偏好。',
  },
  {
    number: '02',
    title: '規劃 ＆ 報價',
    englishTitle: 'Planning & Quotation',
    description:
      '根據您的需求規劃專屬行程，提供報價，確認後請提供您的護照資訊及支付訂金。',
  },
  {
    number: '03',
    title: '典藏旅遊安排',
    englishTitle: 'Arrangement',
    description:
      '典藏專業團隊開始安排預定行程票券及細節，您只需放鬆等待，迎接美好旅程！',
  },
  {
    number: '04',
    title: '行前說明',
    englishTitle: 'Pre-Departure Briefing',
    description:
      '出發前兩週安排行前說明，提供獨家精美旅遊手冊。完整行程資料及票券，讓您隨時安心出發！',
  },
]
// scale-x-[0.98] scale-y-[1.03]
export const getStepStyles = (number: string) => {
  switch (number) {
    case '01':
      return 'min-h-[480px] xl:max-w-[208px] xl:aspect-[208/570]'
    case '02':
      return 'min-h-[573px] xl:max-w-[268px] xl:aspect-[268/609] xl:rotate-[-5deg] xl:hover:rotate-0 xl:mb-[10.5px] xl:hover:mb-0 xl:ml-[20px] xl:hover:ml-0 xl:mr-[24px] xl:hover:mr-0'
    case '03':
      return 'min-h-[411px] xl:max-w-[288px] xl:aspect-[288/485]'
    case '04':
      return 'min-h-[617px] xl:max-w-[208px] xl:aspect-[208/641]'
    default:
      return ''
  }
}
