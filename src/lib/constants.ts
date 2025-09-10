export const NAV_ITEMS = [
  { label: '團體專區', href: '#group' },
  { label: '自由行專區', href: '#individual' },
  { label: '包車旅遊', href: '#charter' },
  { label: '三井郵輪', href: '#cruise' },
  { label: '關於典藏', href: '#about' },
] as const

export const POPULAR_DESTINATIONS = [
  {
    name: '英國',
    desc: '體驗英倫風情與皇室文化',
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: '德國',
    desc: '探索童話城堡與啤酒文化',
    color: 'from-green-400 to-green-600',
  },
  {
    name: '法國',
    desc: '享受浪漫巴黎與普羅旺斯',
    color: 'from-purple-400 to-purple-600',
  },
  {
    name: '意大利',
    desc: '感受藝術之都的魅力',
    color: 'from-red-400 to-red-600',
  },
  {
    name: '日本',
    desc: '體驗和風文化與現代科技',
    color: 'from-pink-400 to-pink-600',
  },
  {
    name: '韓國',
    desc: '韓流文化與美食之旅',
    color: 'from-yellow-400 to-yellow-600',
  },
] as const

export const DROPDOWN_MENUS = {
  團體專區: [
    { label: '深度旅遊', href: '#deep-travel' },
    {
      label: '主題旅遊',
      href: '#theme-travel',
      hasSubmenu: true,
      submenuItems: [
        { label: '歐洲古堡之旅', href: '#castle-tour' },
        { label: '櫻花季專案', href: '#sakura-tour' },
        { label: '美食饗宴之旅', href: '#gourmet-tour' },
        { label: '藝術文化巡禮', href: '#culture-tour' },
      ],
    },
  ],
  自由行專區: [
    { label: '城市漫遊', href: '#city-tour' },
    {
      label: '主題旅遊',
      href: '#individual-theme',
      hasSubmenu: true,
      submenuItems: [
        { label: '浪漫蜜月之旅', href: '#honeymoon-tour' },
        { label: '親子家庭遊', href: '#family-tour' },
        { label: '背包客專案', href: '#backpacker-tour' },
      ],
    },
  ],
  包車旅遊: [
    { label: '深度旅遊', href: '#charter-deep' },
    {
      label: '主題旅遊',
      href: '#charter-theme',
      hasSubmenu: true,
      submenuItems: [
        { label: '商務包車', href: '#business-charter' },
        { label: '觀光包車', href: '#sightseeing-charter' },
        { label: '機場接送', href: '#airport-transfer' },
        { label: '婚紗包車', href: '#wedding-charter' },
        { label: '長途包車', href: '#long-distance-charter' },
      ],
    },
  ],
  三井郵輪: [
    { label: '深度旅遊', href: '#cruise-deep' },
    {
      label: '主題旅遊',
      href: '#cruise-theme',
      hasSubmenu: true,
      submenuItems: [
        { label: '地中海郵輪', href: '#mediterranean-cruise' },
        { label: '加勒比海郵輪', href: '#caribbean-cruise' },
      ],
    },
  ],
  關於典藏: [
    { label: '公司介紹', href: '#company-intro' },
    { label: '服務理念', href: '#service-concept' },
    {
      label: '聯絡我們',
      href: '#contact',
      hasSubmenu: true,
      submenuItems: [
        { label: '台北辦公室', href: '#taipei-office' },
        { label: '高雄辦公室', href: '#kaohsiung-office' },
        { label: '線上客服', href: '#online-service' },
      ],
    },
  ],
}
export const SOCIAL_MEDIAS = [
  { src: '/home/footer/facebook.svg', alt: 'facebook', href: '#' },
  { src: '/home/footer/instagram.svg', alt: 'instagram', href: '#' },
  { src: '/home/footer/line.svg', alt: 'line', href: '#' },
  { src: '/home/footer/phone.svg', alt: 'phone', href: '#' },
] as const
