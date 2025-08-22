'use client'

export interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  backgroundImage?: string
}

export function HeroSection({
  className = '',
  title = '立即諮詢',
  subtitle = '為您客製化最適合的豪華旅遊行程',
  backgroundImage = 'https://images.unsplash.com/photo-1530841344095-13b94de90e6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
}: HeroSectionProps) {
  return (
    <section
      className={`relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden ${className}`}
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40' />

        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60' />
      </div>

      <div className='relative z-10 h-full flex items-center justify-center'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg'>
            {title}
          </h1>

          <p className='text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md'>
            {subtitle}
          </p>

          <div className='mt-6 text-sm md:text-base text-white/80 max-w-xl mx-auto'>
            <p className='drop-shadow-sm'>
              我們是專業的旅遊諮詢團隊，請填寫表單告訴我們您的需求，
              <br className='hidden md:block' />
              讓我們為您規劃一趟完美的旅程。
            </p>
          </div>

          <div className='mt-8 flex justify-center space-x-2'>
            <div className='w-2 h-2 bg-white/60 rounded-full animate-pulse'></div>
            <div
              className='w-2 h-2 bg-white/80 rounded-full animate-pulse'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className='w-2 h-2 bg-white/60 rounded-full animate-pulse'
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='animate-bounce'>
          <svg
            className='w-6 h-6 text-white/70 hover:text-white transition-colors cursor-pointer'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            />
          </svg>
        </div>
      </div>

      <div className='absolute top-6 right-6 z-10 hidden md:block'>
        <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2'>
          <div className='flex items-center space-x-2 text-white text-sm'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <span>品質保證</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
