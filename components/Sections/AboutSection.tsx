// components/Sections/AboutSection.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import mountain from '../../public/Frame1597886600.jpg'
import temple from '../../public/Frame1597886602.jpg'

const AboutSection = () => {
  return (
    <section className="container img-about mx-auto px-8 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none z-0">
        
      </div>

      <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px]">
        <div className="absolute top-0 left-0 w-48 md:w-64 h-60 md:h-80 z-10 overflow-hidden rounded-custom shadow-xl border-4 border-white">
          <Image
             src={mountain}
            alt="Mountain"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-12 md:top-20 left-32 md:left-48 w-48 md:w-64 h-48 md:h-64 z-30 overflow-hidden rounded-custom shadow-2xl border-4 border-white">
          <Image
            src={temple}
            alt="Paris"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-12 md:left-20 w-56 md:w-72 h-56 md:h-72 z-20 overflow-hidden rounded-custom shadow-lg border-4 border-white">
          <Image
            src={mountain}
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