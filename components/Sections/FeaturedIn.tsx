// components/Sections/FeaturedIn.tsx
import React from 'react';

const FeaturedIn = () => {
  const brands = [
    { name: 'Forbes', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Forbes_logo.svg' },
    { name: 'CNBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/CNBC_logo.svg' },
    { name: 'USA Today', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/USA_Today_2012_logo.svg' },
    { name: 'WSJ', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg' },
    { name: 'NYT', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
      <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6">We are featured in</h2>

      <div className="flex items-center justify-center gap-4 mb-12 md:mb-20">
        <div className="h-0.5 w-12 md:w-24 bg-blue-600"></div>
        <div className="text-blue-600">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <div className="h-0.5 w-12 md:w-24 bg-blue-600"></div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20 opacity-80 grayscale hover:grayscale-0 transition-all">
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.logo}
            alt={brand.name}
            className={`h-${index === 1 || index === 4 ? '8' : '6'} md:h-${index === 1 || index === 4 ? '10' : '8'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedIn;