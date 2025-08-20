import { POPULAR_DESTINATIONS } from '@/lib/constants'
import Button from './Button'

const PopularDestinations = () => {
  return (
    <section className='py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
          熱門目的地
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {POPULAR_DESTINATIONS.map((country) => (
            <div
              key={country.name}
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer'
            >
              <div
                className={`h-48 bg-gradient-to-br ${country.color} relative overflow-hidden`}
              >
                <div className='absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300'></div>
                <div className='absolute bottom-4 left-4 text-white'>
                  <h3 className='text-2xl font-bold'>{country.name}</h3>
                </div>
              </div>
              <div className='p-6'>
                <p className='text-gray-600'>{country.desc}</p>
                <Button
                  variant='ghost'
                  size='sm'
                  className='mt-4 text-amber-600 hover:text-amber-700'
                >
                  了解更多 →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDestinations
