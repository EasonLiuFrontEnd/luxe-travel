'use client'

import { useState } from 'react'
import { TravelInquiryForm } from '@/components/Inquiry'
import { TravelInquiryFormData } from '@/types/inquiry'

export default function TravelInquiryPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: TravelInquiryFormData) => {
    setIsLoading(true)

    try {
      console.log('提交的旅遊諮詢資料:', data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert('諮詢表單提交成功！我們會在 24 小時內與您聯繫。')
    } catch (error) {
      console.error('提交表單時發生錯誤:', error)
      alert('提交失敗，請稍後再試或直接聯絡我們的客服。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='min-h-screen'>
      <TravelInquiryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </main>
  )
}
