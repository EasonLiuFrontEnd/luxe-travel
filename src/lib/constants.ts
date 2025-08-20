export const NAV_ITEMS = [
  { name: '關於典藏', href: '#about' },
  { name: '自由行專區', href: '#individual' },
  { name: '包車旅遊', href: '#charter' },
  { name: '團體專區', href: '#group' },
  { name: '三井郵輪', href: '#cruise' },
] as const

export const DESTINATIONS = [
  { name: '深度旅遊', href: '#deep-travel' },
  { name: '英國', href: '#uk', hasSubmenu: true },
  { name: 'FIT套裝', href: '#fit' },
  { name: '德國啤酒節', href: '#beer-festival' },
  { name: '黑法白市童話', href: '#fairy-tale' },
  { name: '花季', href: '#flower-season' },
] as const

export const SERVICES = [
  { title: '團體旅遊', desc: '精心規劃的團體行程，專業導遊陪同' },
  { title: '自由行', desc: '彈性安排，自在探索世界各地美景' },
  { title: '包車服務', desc: '專屬司機，舒適便利的交通安排' },
  { title: '郵輪旅遊', desc: '豪華郵輪體驗，海上度假新選擇' },
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
