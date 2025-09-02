import { generatePageTitle } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: generatePageTitle('關於我們'),
  description:
    '了解典藏旅遊的專業團隊，我們致力於為每位旅客打造獨一無二的旅遊體驗。',
}

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <div className='pt-20'>
        <div className='max-w-6xl mx-auto px-4 py-16'>
          <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
            關於典藏旅遊
          </h1>

          <div className='prose prose-lg max-w-none'>
            <p className='text-xl text-gray-600 text-center mb-12'>
              我們是專業的旅遊服務團隊，致力於為每位旅客打造獨一無二的旅遊體驗。
            </p>

            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                  我們的使命
                </h2>
                <p className='text-gray-600 mb-4'>
                  典藏旅遊成立於多年前，我們相信每一次旅行都應該是獨特而難忘的體驗。
                  我們的專業團隊致力於為客戶提供最優質的旅遊服務。
                </p>
                <p className='text-gray-600'>
                  從行程規劃到實地執行，我們都以最高的標準要求自己，
                  確保每位旅客都能獲得超出期待的旅遊體驗。
                </p>
              </div>

              <div className='bg-figma-neutral-50 p-8 rounded-lg'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>
                  服務特色
                </h3>
                <ul className='space-y-3 text-gray-600'>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-amber-500 rounded-full mr-3'></span>
                    專業的旅遊規劃團隊
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-amber-500 rounded-full mr-3'></span>
                    24小時客戶服務支援
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-amber-500 rounded-full mr-3'></span>
                    靈活的行程客製化服務
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-amber-500 rounded-full mr-3'></span>
                    透明的價格政策
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
