// components/Sections/AboutSection.tsx
'use client';

import React from 'react';

const AboutSection = () => {
  return (
    <section className="img-about mx-auto px-8 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1000 600">
          <path className="flight-path" d="M50,550 Q100,450 150,580 T300,550 Q450,450 550,150" />
          <path className="flight-path" d="M550,150 Q600,100 650,50" strokeWidth="2" />
          <g transform="translate(570, 120) rotate(-45)">
            <path fill="#cbd5e1" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </g>
          <circle cx="50" cy="550" r="4" fill="#cbd5e1" />
        </svg>
      </div>

      <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px]">
        <div className="absolute top-0 left-0 w-48 md:w-64 h-60 md:h-80 z-10 overflow-hidden rounded-custom shadow-xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80"
            alt="Mountain"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-12 md:top-20 left-32 md:left-48 w-48 md:w-64 h-48 md:h-64 z-30 overflow-hidden rounded-custom shadow-2xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"
            alt="Paris"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-12 md:left-20 w-56 md:w-72 h-56 md:h-72 z-20 overflow-hidden rounded-custom shadow-lg border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80"
            alt="Temple"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 z-10 mt-8 md:mt-0">
        <h4 className="text-orange-600 font-bold text-lg mb-2">Get About Us</h4>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          We Create Journeys Worth Taking For The Traveler
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 md:px-10 py-3 md:py-4 rounded-lg shadow-lg shadow-blue-200 transition duration-300">
          Discover More
        </button>
      </div>
    </section>
  );
};

export default AboutSection;