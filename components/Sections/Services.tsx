// components/Sections/Services.tsx
import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Western Europe',
      image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800',
    },
    {
      title: 'South Africa',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800',
    },
    {
      title: 'Scandinavia',
      image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800',
    },
    {
      title: 'South America',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800',
    },
    {
      title: 'Southeast Asia',
      image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=800',
    },
    {
      title: 'Australia',
      image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800',
    },
  ];

  return (
    <section className="relative py-12 md:py-24 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-6xl font-black text-white mb-6">Our Services</h2>
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-16">
          <div className="h-0.5 w-12 md:w-24 bg-white/30"></div>
          <div className="text-white">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="h-0.5 w-12 md:w-24 bg-white/30"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative h-56 md:h-72 rounded-2xl overflow-hidden cursor-pointer">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 service-card-overlay flex items-end justify-center pb-6 md:pb-8">
                <span className="text-white text-xl md:text-2xl font-bold">{service.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;