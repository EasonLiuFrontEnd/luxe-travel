'use client'

import { useState } from 'react'
import {
  TravelInquiryForm,
  TTravelInquiryFormData,
  ALL_COUNTRIES,
} from '@/components/pages/inquiry'
import { submitInquiry, type TInquiryRequest } from '@/api/inquiry'

const TravelInquiryPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: TTravelInquiryFormData) => {
    setIsLoading(true)

    try {
      const { basicInfo, budget, independentTravel, groupTravel } = data
      const isGroupTravel =
        basicInfo.travelType === 'deluxe-group' ||
        basicInfo.travelType === 'theme' ||
        basicInfo.travelType === 'mitsui-cruise'

      const contactMethod: string[] = []
      if (basicInfo.contactMethod === '都可以') {
        contactMethod.push('手機', 'LINE')
      } else {
        contactMethod.push(basicInfo.contactMethod)
      }

      const source =
        basicInfo.contactSource === '其他' && basicInfo.otherSource
          ? basicInfo.otherSource
          : basicInfo.contactSource

      const regions = budget.countries.map((countryValue) => {
        const country = ALL_COUNTRIES.find((c) => c.value === countryValue)
        return country?.label || countryValue
      })

      const payload: TInquiryRequest = {
        contactName: basicInfo.contactName,
        gender: basicInfo.gender,
        phone: basicInfo.phoneNumber,
        lineId: basicInfo.lineId || undefined,
        contactMethod,
        contactTime: basicInfo.contactTime,
        source,
      }

      if (isGroupTravel) {
        payload.tourProgram = groupTravel.tourProgram
        payload.adults = groupTravel.adultCount
        payload.children = groupTravel.childCount
        payload.departDate = groupTravel.departureDate
        payload.note = data.requirementsDescription || undefined
      } else {
        payload.budget = budget.budget
        payload.regions = regions
        payload.adults = independentTravel.adultCount
        payload.children = independentTravel.childCount
        payload.days = independentTravel.travelDays
        payload.departDate = independentTravel.departureDate
        payload.wishlist = independentTravel.wishlist || undefined
        payload.note = independentTravel.specialRequirements || undefined
      }
      await submitInquiry(payload)
      alert('諮詢表單提交成功！我們會在 24 小時內與您聯繫。')
    } catch (error) {
      console.error('提交表單時發生錯誤:', error)
      alert('提交失敗，請稍後再試或直接聯絡我們的客服。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='min-h-screen pt-10 bg-[var(--Secondary-100,#F7F4EC)]'>
      <TravelInquiryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </main>
  )
}

export default TravelInquiryPage
