// app/promotion/page.tsx
import React from 'react';
import Link from 'next/link';

const PromotionPage = () => {
  const promotions = [
    {
      id: 1,
      title: 'Summer Escape Sale',
      discount: '40% OFF',
      code: 'SUMMER40',
      description: 'Book your summer getaway and save big on selected destinations.',
      expiry: 'Valid until: August 31, 2024',
      color: 'from-yellow-400 to-orange-500',
      icon: 'fas fa-sun',
    },
    {
      id: 2,
      title: 'Early Bird Special',
      discount: '30% OFF',
      code: 'EARLY30',
      description: 'Book 90 days in advance and enjoy exclusive savings on all flights.',
      expiry: 'Valid for all destinations',
      color: 'from-green-400 to-emerald-600',
      icon: 'fas fa-clock',
    },
    {
      id: 3,
      title: 'Family Package',
      discount: '50% OFF',
      code: 'FAMILY50',
      description: 'Special discount for family bookings of 4 or more passengers.',
      expiry: 'Valid until: December 31, 2024',
      color: 'from-blue-400 to-blue-600',
      icon: 'fas fa-users',
    },
    {
      id: 4,
      title: 'Last Minute Deals',
      discount: 'Up to 60% OFF',
      code: 'LAST60',
      description: 'Amazing discounts on last-minute bookings to various destinations.',
      expiry: 'Limited time offer',
      color: 'from-red-400 to-pink-600',
      icon: 'fas fa-bolt',
    },
    {
      id: 5,
      title: 'Loyalty Rewards',
      discount: '25% OFF',
      code: 'LOYAL25',
      description: 'Exclusive discount for our loyal customers and repeat bookings.',
      expiry: 'For members only',
      color: 'from-purple-400 to-purple-600',
      icon: 'fas fa-crown',
    },
    {
      id: 6,
      title: 'Weekend Getaway',
      discount: '35% OFF',
      code: 'WEEKEND35',
      description: 'Perfect short trips for weekend escapes to nearby destinations.',
      expiry: 'Valid every weekend',
      color: 'from-indigo-400 to-indigo-600',
      icon: 'fas fa-umbrella-beach',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Exclusive Promotions</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            Unlock amazing deals and discounts for your next adventure. Limited time offers!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <Link
              href="/bookings"
              className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <i className="fas fa-fire mr-2"></i>
              Hot Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`bg-gradient-to-br ${promo.color} text-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-sm uppercase tracking-wider opacity-80 mb-2">{promo.expiry}</div>
                    <h3 className="text-2xl font-bold">{promo.title}</h3>
                  </div>
                  <div className="text-4xl">
                    <i className={promo.icon}></i>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold mb-2">{promo.discount}</div>
                  <p className="text-xl opacity-90">{promo.description}</p>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm uppercase tracking-wider mb-2">Use Promo Code</div>
                    <div className="text-2xl font-bold tracking-wider bg-white/20 p-3 rounded-lg">
                      {promo.code}
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-white text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors">
                  Apply & Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Redeem Offers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow these simple steps to apply promotions to your booking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Offer</h3>
              <p className="text-gray-600">Select the promotion that suits your travel plans</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Copy Promo Code</h3>
              <p className="text-gray-600">Copy the promotion code provided</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Apply at Checkout</h3>
              <p className="text-gray-600">Enter the code during the booking process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enjoy Savings</h3>
              <p className="text-gray-600">Complete your booking with discounted price</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Promotions are valid for new bookings only unless otherwise specified</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Discounts cannot be combined with other offers</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Some promotions may have blackout dates or restrictions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>All prices are in USD and include applicable taxes</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Promotions are subject to availability and may be withdrawn at any time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;