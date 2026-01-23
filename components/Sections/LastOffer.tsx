// components/Sections/LastOffer.tsx
import React from 'react';

const LastOffer = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-24">
      <div className="relative overflow-hidden h-[350px] md:h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920"
          alt="Cape Town Stadium Aerial View"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white max-w-3xl">
          <h2 className="text-2xl md:text-5xl font-bold mb-2">Last TravelPro Offer</h2>
          <p className="text-sm md:text-lg font-medium opacity-90 mb-4 md:mb-6 italic">
            Aerial view of Cape Town with Cape Town Stadium
          </p>

          <p className="text-sm md:text-lg leading-relaxed mb-6 md:mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit felis sit amet
            turpis vehicula convallis. Ut ac tellus velit. Nulla mollis sollicitudin lacus id ornare.
            Phasellus laoreet nulla et nulla sagittis, sit amet cursus urna mollis.
          </p>

          <button className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-900/40 transition-all">
            Learn More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LastOffer;