'use client'

import { useRef } from 'react'
import { toast } from 'sonner'
import Banner from '@/components/pages/home/Banner'
import {
  BookShelfSection,
  RecommendationSection,
} from '@/components/pages/home/ClassicItinerary'
import ServiceProcess from '@/components/pages/home/ServiceProcess'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Advantage from '@/components/pages/home/Advantage'
import Feedback from '@/components/pages/home/Feedback'
import Concerns from './Concerns'
import TravelInquiryForm, {
  TTravelInquiryFormData,
  ALL_COUNTRIES,
} from '../inquiry'
import {
  submitInquiry,
  submitTravelInquiry,
  getTravelTypeLabel,
  type TInquiryRequest,
  type TTravelInquiryRequest,
} from '@/api/inquiry'

const HomePageClient = () => {
  const collectionRef = useRef<HTMLDivElement>(null!)

  const handleFormSubmit = async (data: TTravelInquiryFormData) => {
    const { basicInfo, budget, independentTravel, groupTravel } = data
    const isGroupTravel =
      basicInfo.travelType === 'deluxe-group' ||
      basicInfo.travelType === 'theme' ||
      basicInfo.travelType === 'mitsui-cruise'

    try {
      const contactMethod: string[] = []
      if (basicInfo.contactMethod) {
        if (basicInfo.contactMethod === '都可以') {
          contactMethod.push('手機', 'LINE')
        } else {
          contactMethod.push(basicInfo.contactMethod)
        }
      }

      const source =
        basicInfo.contactSource === '其他' && basicInfo.otherSource
          ? basicInfo.otherSource
          : basicInfo.contactSource || ''

      if (isGroupTravel) {
        const payload: TTravelInquiryRequest = {
          contactName: basicInfo.contactName,
          gender: basicInfo.gender || undefined,
          phone: basicInfo.phoneNumber,
          lineId: basicInfo.lineId || undefined,
          travelType: getTravelTypeLabel(basicInfo.travelType),
          contactMethod: contactMethod.length > 0 ? contactMethod : undefined,
          contactTime: basicInfo.contactTime || undefined,
          source: source || undefined,
          note: data.requirementsDescription || undefined,
          adults: groupTravel.adultCount,
          children: groupTravel.childCount,
          itinerary: groupTravel.itinerary || undefined,
          departDate: groupTravel.departureDate || undefined,
        }
        await submitTravelInquiry(payload)
      } else {
        const regions = budget.countries
          ? budget.countries.map((countryValue) => {
              const country = ALL_COUNTRIES.find(
                (c) => c.value === countryValue,
              )
              return country?.label || countryValue
            })
          : undefined

        const payload: TInquiryRequest = {
          contactName: basicInfo.contactName,
          gender: basicInfo.gender || undefined,
          phone: basicInfo.phoneNumber,
          lineId: basicInfo.lineId || undefined,
          contactMethod: contactMethod.length > 0 ? contactMethod : undefined,
          contactTime: basicInfo.contactTime || undefined,
          source: source || undefined,
          budget: budget.budget || undefined,
          regions,
          adults: independentTravel.adultCount,
          children: independentTravel.childCount,
          days: independentTravel.travelDays,
          departDate: independentTravel.departureDate || undefined,
          wishlist: independentTravel.wishlist || undefined,
          note: independentTravel.specialRequirements || undefined,
        }
        await submitInquiry(payload)
      }

      toast('提交成功', {
        style: {
          fontFamily: 'var(--font-genseki-gothic)',
          fontWeight: 400,
          fontSize: '16px',
          letterSpacing: '0px',
          padding: '4px 8px',
          width: 'fit-content',
          color: 'var(--color-figma-function-available-normal)',
          backgroundColor: '#00D47533',
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
        },
      })
    } catch {
      if (process.env.NODE_ENV !== 'production') {
        toast('提交成功（開發模式：使用 mock 資料）', {
          style: {
            fontFamily: 'var(--font-genseki-gothic)',
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '0px',
            padding: '4px 8px',
            width: 'fit-content',
            color: 'var(--color-figma-function-available-normal)',
            backgroundColor: '#00D47533',
            borderRadius: 0,
            boxShadow: 'none',
            border: 'none',
          },
        })
      } else {
        toast('提交失敗', {
          style: {
            fontFamily: 'var(--font-genseki-gothic)',
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '0px',
            padding: '4px 8px',
            width: 'fit-content',
            color: 'var(--color-figma-function-alert)',
            backgroundColor: '#D6111A33',
            borderRadius: 0,
            boxShadow: 'none',
            border: 'none',
          },
        })
      }
    }
  }
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative bg-figma-neutral-50 isolate xl:isolate-auto'>
        <BookShelfSection />
        <RecommendationSection />
        <Concerns />
      </div>
      <Advantage collectionRef={collectionRef} />
      <CollectionRecommendation collectionRef={collectionRef} />
      <Feedback />
      <ServiceProcess />
      <TravelInquiryForm
        onSubmit={handleFormSubmit}
        className='relative pt-10 pb-[80px] px-4 xl:py-10 xl:px-9'
        heroTopPosition='top-[9px] xl:top-[-24px]'
      />
    </div>
  )
}

export default HomePageClient
