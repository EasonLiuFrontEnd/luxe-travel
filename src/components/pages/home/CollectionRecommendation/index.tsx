'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import InteractiveMap from './InteractiveMap'
import RecommendationList from './RecommendationList'
import styles from './styles.module.css'
import { useMap } from '@/api/home/useMap'

type TCollectionRecommendationProps = {
  collectionRef?: React.RefObject<HTMLDivElement>
  className?: string
}

const CollectionRecommendation = ({
  className,
  collectionRef,
}: TCollectionRecommendationProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const { query: mapQuery, mock: mapMock } = useMap()

  const availableCountries = useMemo(() => {
    const data =
      mapQuery.error && process.env.NODE_ENV !== 'production'
        ? mapMock.rows
        : mapQuery.data || []

    const codes = new Set<string>()
    if (data) {
      data.forEach((article) => {
        article.countries?.forEach((country) => {
          codes.add(country.code)
        })
      })
    }
    return codes
  }, [mapQuery.data, mapQuery.error, mapMock.rows])

  const selectedArticle = useMemo(() => {
    const data =
      mapQuery.error && process.env.NODE_ENV !== 'production'
        ? mapMock.rows
        : mapQuery.data || []

    if (!data || !selectedRegion) return null

    return data.find((item) =>
      item.countries?.some((country) => country.code === selectedRegion),
    )
  }, [selectedRegion, mapQuery.data, mapQuery.error, mapMock.rows])

  useEffect(() => {
    if (selectedRegion) return

    const data =
      mapQuery.error && process.env.NODE_ENV !== 'production'
        ? mapMock.rows
        : mapQuery.data || []

    if (data && data.length > 0) {
      const firstArticle = data[0]
      const firstCountry = firstArticle.countries?.[0]
      if (firstCountry) {
        setSelectedRegion(firstCountry.code)
      }
    }
  }, [mapQuery.data, mapQuery.error, mapMock.rows, selectedRegion])

  return (
    <section
      className={`pb-[60px] lg:py-[120px] px-[clamp(12px,2.5vw,48px)] bg-[var(--color-figma-secondary-100)] relative xl:sticky xl:top-[-30vh] xl:left-0 ${className || ''}`}
    >
      <div className='mx-auto relative'>
        <div className='w-full bg-figma-neutral-50 relative rounded-2xl overflow-hidden'>
          {selectedArticle?.imageUrl && (
            <Image
              key={`recommendation-background-${selectedRegion}`}
              alt={selectedArticle.subtitle || '背景裝飾'}
              className='object-cover'
              src={selectedArticle.imageUrl}
              fill
            />
          )}

          <div className='absolute inset-0 bg-black/20 rounded-2xl'></div>

          <div
            ref={collectionRef}
            className='relative z-10 xl:h-[calc(100vh-184px)]'
          >
            <h2
              className={`text-center font-family-noto-serif text-[32px] leading-[1.5] font-bold text-[#383841] bg-[var(--color-figma-secondary-100)] px-4 py-3 rounded-bl-2xl rounded-br-2xl mx-auto w-fit
                           xl:text-[64px] xl:leading-[1.2] lg:px-7 lg:py-4 ${styles.titleContainer}`}
            >
              典藏推薦
            </h2>

            <div className='mt-[40px] flex justify-center xl:h-[calc(100%-180px)]'>
              <div className='w-[361px] h-[435px] lg:aspect-[402/485] lg:w-auto lg:h-full relative'>
                <InteractiveMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={setSelectedRegion}
                  availableCountries={availableCountries}
                />
              </div>
            </div>

            <div className='h-[69px]'></div>
          </div>
        </div>
      </div>

      <RecommendationList />
    </section>
  )
}

export default CollectionRecommendation
