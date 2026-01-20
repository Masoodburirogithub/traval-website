// app/promotion/page.tsx
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Hero, Navbar } from '@/components';

const PromotionPage = () => {
  const packagesData = [
    {
      id: 1,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex tortor,",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      price: "RS: 120,000",
      icons: ['fa-envelope', 'fa-location-dot']
    },
    {
      id: 2,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex tortor,",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      price: "RS: 120,000",
      icons: ['fa-envelope', 'fa-location-dot']
    },
    {
      id: 3,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat ex tortor,",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
      price: "RS: 120,000",
      icons: ['fa-envelope', 'fa-location-dot']
    }
  ];

  const dubaiData = [
    {
      id: 1,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      icons: ['fa-envelope', 'fa-location-dot']
    },
    {
      id: 2,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      icons: ['fa-envelope', 'fa-location-dot']
    },
    {
      id: 3,
      title: "Chiang Mai",
      country: "Thailand",
      duration: "1 Week",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      icons: ['fa-envelope', 'fa-location-dot']
    }
  ];


  return (
    <>
      {/* Link to Font Awesome */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" /> */}

      {/* Navbar */}
    

      {/* Hero Section */}
      <Hero/>

<div className='h-[1px]'></div>

      {/* Experience Section */}
      <section className=" px-4 md:px-10 lg:px-20 py-16 md:py-20 mt-32 md:mt-40 bg-white">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-[50px] font-semibold text-black mb-3">
            Get The Best Travel Experience
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <div className="w-16 md:w-20 h-0.5 bg-blue-600"></div>
            <i className="fas fa-binoculars text-blue-600 text-lg md:text-xl"></i>
            <div className="w-16 md:w-20 h-0.5 bg-blue-600"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Left Features */}
          <div className="flex-1 space-y-16 md:space-y-24">
            <div className="max-w-xs">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-calendar-days text-blue-600 text-lg"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Set Travel Plan</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Distinctively impact client-centered ideas via future-proof paradigms.
              </p>
            </div>
            
            <div className="max-w-xs">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-hotel text-blue-600 text-lg"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Luxary Hotel</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Distinctively impact client-centered ideas via future-proof paradigms.
              </p>
            </div>
          </div>

          {/* Center Illustration */}
          <div className="flex-1.5">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              {/* Placeholder for illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                <i className="fas fa-globe-americas text-blue-300 text-6xl md:text-8xl"></i>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="flex-1 space-y-16 md:space-y-24">
            <div className="max-w-xs">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-compass text-blue-600 text-lg"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Explore Around</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Distinctively impact client-centered ideas via future-proof paradigms.
              </p>
            </div>
            
            <div className="max-w-xs">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-headset text-blue-600 text-lg"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Support 24/7</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Distinctively impact client-centered ideas via future-proof paradigms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Top Vacation Packages
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 md:w-16 h-0.5 bg-blue-600"></div>
            <i className="fas fa-binoculars text-blue-600 text-sm md:text-base"></i>
            <div className="w-12 md:w-16 h-0.5 bg-blue-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {packagesData.map((pkg) => (
            <div key={pkg.id} className="package-card bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-56">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-lg shadow-lg p-3 md:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="far fa-clock text-orange-500"></i>
                    <span className="text-gray-700 font-semibold text-sm">{pkg.duration}</span>
                  </div>
                  <div className="flex gap-3">
                    {pkg.icons.map((icon, index) => (
                      <i key={index} className={`fas ${icon} text-orange-500`}></i>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-10 pb-6 px-4 md:px-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  <i className="fas fa-location-dot text-orange-500 mr-2"></i>
                  {pkg.country}
                </p>
                <hr className="border-gray-100 my-4" />
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                
                <div className="flex justify-between items-center">
                  <button className="btn-detail px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    View Detail
                  </button>
                  <span className="text-orange-500 font-extrabold text-lg">{pkg.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="btn-see-more px-8 md:px-12 py-3 md:py-4 bg-[#f1703a] text-white rounded-lg font-semibold hover:bg-orange-600">
            See More
          </button>
        </div>
      </section>

      {/* Discover Dubai Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-white">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Discover Dubai
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 md:w-20 h-0.5 bg-blue-600"></div>
            <i className="fas fa-binoculars text-blue-600 text-base md:text-lg"></i>
            <div className="w-16 md:w-20 h-0.5 bg-blue-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dubaiData.map((destination) => (
            <div key={destination.id} className="destination-card bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-60">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-lg shadow-lg p-3 md:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="far fa-clock text-orange-500"></i>
                    <span className="text-gray-700 font-semibold text-sm">{destination.duration}</span>
                  </div>
                  <div className="flex gap-3">
                    {destination.icons.map((icon, index) => (
                      <i key={index} className={`fas ${icon} text-orange-500`}></i>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-10 pb-6 px-4 md:px-6 flex justify-between items-end">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{destination.title}</h3>
                  <p className="text-gray-500 text-sm">
                    <i className="fas fa-location-dot text-orange-500 mr-2"></i>
                    {destination.country}
                  </p>
                </div>
                <button className="arrow-btn w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-6xl mx-auto h-80 md:h-[500px] rounded-2xl overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80)'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative h-full flex items-center px-6 md:px-16 lg:px-20">
            <div className="max-w-lg text-white">
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-serif mb-2">Last TravelPro Offer</h2>
              <p className="text-lg md:text-xl opacity-90 mb-6">Aerial view of Cape Town with Cape Town Stadium</p>
              <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit felis sit amet
                turpis vehicula convallis. Ut ac tellus velit. Nulla mollis sollicitudin lacus id ornare.
                Phasellus laoreet nulla et nulla sagittis, sit amet cursus urna mollis.
              </p>
              <a href="#" className="inline-block px-6 md:px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:-translate-y-0.5 transition-all">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </>
  );
};

export default PromotionPage;