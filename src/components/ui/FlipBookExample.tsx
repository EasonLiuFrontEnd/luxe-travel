'use client'

import React, { useRef } from 'react'

import { Button } from '@/components/ui/Button'
import { Page } from '@/components/ui/Page'
import { PageFlip } from '@/components/ui/PageFlip'

import type { TPageFlipRef, TBaseComponent } from '@/types'

export type TFlipBookExampleProps = TBaseComponent

export const FlipBookExample = ({
  className,
  ...props
}: TFlipBookExampleProps) => {
  const flipBookRef = useRef<TPageFlipRef>(null)

  const handlePrevPage = () => {
    flipBookRef.current?.flipPrev()
  }

  const handleNextPage = () => {
    flipBookRef.current?.flipNext()
  }

  const handleGoToPage = (pageNum: number) => {
    flipBookRef.current?.turnToPage(pageNum)
  }

  const handleFlip = (data: number) => {
    console.log('Current page:', data)
  }

  return (
    <div className={className} {...props}>
      <div className='mb-4 flex gap-2'>
        <Button onClick={handlePrevPage} variant='outline' size='sm'>
          Previous
        </Button>
        <Button onClick={handleNextPage} variant='outline' size='sm'>
          Next
        </Button>
        <Button onClick={() => handleGoToPage(0)} variant='outline' size='sm'>
          Page 1
        </Button>
        <Button onClick={() => handleGoToPage(2)} variant='outline' size='sm'>
          Page 3
        </Button>
      </div>

      <PageFlip
        ref={flipBookRef}
        width={300}
        height={600}
        size='fixed'
        showCover={true}
        usePortrait={true}
        onFlip={handleFlip}
        className='mx-auto'
      >
        <Page
          pageNumber='Cover'
          background='bg-gradient-to-br from-blue-500 to-purple-600'
        >
          <div className='flex h-full items-center justify-center text-center text-white'>
            <div>
              <h1 className='text-3xl font-bold'>Luxe Travel</h1>
              <p className='mt-4 text-lg'>Premium Travel Experiences</p>
            </div>
          </div>
        </Page>

        <Page
          pageNumber='1'
          background='bg-gradient-to-br from-green-100 to-blue-100'
        >
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Welcome to Luxury
            </h2>
            <p className='text-gray-600'>
              Discover the world&apos;s most exclusive destinations with our
              premium travel services. From private jets to luxury resorts, we
              create unforgettable experiences.
            </p>
            <div className='mt-8 h-32 rounded-lg bg-white/50 p-4'>
              <h3 className='font-semibold'>Featured Destinations</h3>
              <ul className='mt-2 list-disc list-inside text-sm text-gray-600'>
                <li>Swiss Alps - Private Chalets</li>
                <li>Maldives - Overwater Villas</li>
                <li>Tuscany - Wine Country Tours</li>
              </ul>
            </div>
          </div>
        </Page>

        <Page
          pageNumber='2'
          background='bg-gradient-to-br from-yellow-100 to-orange-100'
        >
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>Our Services</h2>
            <div className='grid gap-4'>
              <div className='rounded-lg bg-white/50 p-4'>
                <h3 className='font-semibold text-orange-800'>Private Tours</h3>
                <p className='text-sm text-gray-600'>
                  Customized itineraries with personal guides
                </p>
              </div>
              <div className='rounded-lg bg-white/50 p-4'>
                <h3 className='font-semibold text-orange-800'>
                  Luxury Accommodation
                </h3>
                <p className='text-sm text-gray-600'>
                  5-star hotels and exclusive resorts
                </p>
              </div>
              <div className='rounded-lg bg-white/50 p-4'>
                <h3 className='font-semibold text-orange-800'>
                  Concierge Service
                </h3>
                <p className='text-sm text-gray-600'>
                  24/7 support for all your needs
                </p>
              </div>
            </div>
          </div>
        </Page>

        <Page
          pageNumber='3'
          background='bg-gradient-to-br from-pink-100 to-purple-100'
        >
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>Client Reviews</h2>
            <div className='space-y-4'>
              <blockquote className='rounded-lg bg-white/50 p-4'>
                <p className='text-sm italic text-gray-600'>
                  &quot;An absolutely magical experience. Every detail was
                  perfectly planned and executed.&quot;
                </p>
                <footer className='mt-2 text-xs text-gray-500'>
                  - Sarah Johnson, Switzerland Trip
                </footer>
              </blockquote>
              <blockquote className='rounded-lg bg-white/50 p-4'>
                <p className='text-sm italic text-gray-600'>
                  &quot;The luxury and attention to detail exceeded all
                  expectations. Highly recommended!&quot;
                </p>
                <footer className='mt-2 text-xs text-gray-500'>
                  - Michael Chen, Maldives Vacation
                </footer>
              </blockquote>
            </div>
          </div>
        </Page>

        <Page
          pageNumber='Back Cover'
          background='bg-gradient-to-br from-gray-700 to-gray-900'
        >
          <div className='flex h-full items-center justify-center text-center text-white'>
            <div>
              <h2 className='text-2xl font-bold'>Contact Us</h2>
              <div className='mt-4 space-y-2 text-sm'>
                <p>📧 info@luxe-travel.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>🌐 www.luxe-travel.com</p>
              </div>
            </div>
          </div>
        </Page>
      </PageFlip>
    </div>
  )
}
