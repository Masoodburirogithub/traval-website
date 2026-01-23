// components/Sections/Packages.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
// import img1 from '../../public/Frame1597887005.jpg'
const Packages = () => {
  const router = useRouter();

  const packages = [
    {
      id: 1,
      title: 'Chiang Mai',
      country: 'Thailand',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex tortor.',
      duration: '1 Week',
      image: '../../public/Frame1597887005.jpg',
    },
    // Add more packages as needed
  ];

  const handlePackageSearch = () => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      // This would trigger login modal in a real implementation
      console.log('User not logged in');
      return;
    }
    // Navigate to booking page or show booking modal
    router.push('/bookings');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Best Packages for 2026</h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-1 w-16 md:w-24 bg-blue-600 rounded-full"></div>
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="h-1 w-16 md:w-24 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group">
            <div className="h-48 md:h-64 overflow-hidden relative">
              <Image 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 flex justify-between items-center shadow-lg">
                <div className="flex items-center text-orange-600 font-bold text-xs md:text-sm">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  {pkg.duration}
                </div>
                <div className="flex space-x-2 text-orange-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">{pkg.title}</h3>
              <div className="flex items-center text-orange-500 text-sm font-semibold mb-4">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {pkg.country}
              </div>
              <p className="text-slate-500 mb-6 md:mb-8 text-sm md:text-base">{pkg.description}</p>
              <button
                className="w-full py-3 md:py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors text-sm md:text-base"
                onClick={handlePackageSearch}
              >
                Search Flights
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;