// app/packages/page.tsx
import React from 'react';
import Packages from '@/components/Sections/Packages';
import Link from 'next/link';

const PackagesPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Travel Packages</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Discover amazing destinations with our carefully curated travel packages. 
            From tropical getaways to cultural adventures, we have something for every traveler.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <Link
              href="/bookings"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              <i className="fas fa-plane mr-2"></i>
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <Packages />
    </div>
  );
};

export default PackagesPage;