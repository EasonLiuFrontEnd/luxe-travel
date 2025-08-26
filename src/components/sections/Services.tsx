import { SERVICES } from '@/lib/constants'

const Services = () => {
  return (
    <section className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>我們的服務</h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            典藏旅遊致力於為每位旅客打造專屬的旅遊體驗，從團體旅遊到個人訂製，我們都能滿足您的需求
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'
            >
              <h3 className='text-xl font-bold text-gray-800 mb-3'>
                {service.title}
              </h3>
              <p className='text-gray-600'>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
