// app/packages/page.tsx
import React from 'react';
import Packages from '@/components/Sections/Packages';
import Link from 'next/link';

const PackagesPage = () => {
  return (
    <div className="min-h-screen">
     <main className="px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div 
            className=" h-[clamp(300px,65vh,450px)] mx-auto rounded-[clamp(20px,5vw,50px)] overflow-hidden relative bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD___toorJRxO09qtGdnu3PBANyYHpGPUMRQ&s)'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
              <h1 className="text-[clamp(3rem,8vw,5rem)] font-bold leading-tight mb-4">Packages</h1>
              <div className="flex items-center justify-center gap-2 text-[clamp(1rem,2vw,1.25rem)]">
                <span>Home</span>
                <span className="text-2xl">&rsaquo;</span>
                <span className="font-medium">Packages</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Packages />
    </div>
  );
};

export default PackagesPage;