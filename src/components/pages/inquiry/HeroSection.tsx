'use client'

export type THeroSectionProps = {
  className?: string
}

export const HeroSection = ({ className = '' }: THeroSectionProps) => {
  return (
    <section className={`relative overflow-hidden h-80 ${className}`}>
      <div className='absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url(https://images.unsplash.com/photo-1565552645632-d725f8bfc19f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)]' />

      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 h-full'>
        <div className='absolute top-8 left-8 text-white text-[28px] font-bold font-noto-serif [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]'>
          立即諮詢
        </div>

        <div className='absolute bottom-8 right-8 text-white text-sm font-normal font-genseki-gothic [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]'>
          為您客製化最美・典藏觀光集團
        </div>
      </div>
    </section>
  )
}

export default HeroSection
