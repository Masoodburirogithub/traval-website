// app/hotels/page.tsx
import React from 'react';
import Link from 'next/link';

const HotelsPage = () => {
  const hotels = [
    {
      id: 1,
      name: 'Grand Luxury Hotel',
      location: 'Bangkok, Thailand',
      rating: 4.8,
      price: 189,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
    },
    {
      id: 2,
      name: 'Beach Resort & Spa',
      location: 'Phuket, Thailand',
      rating: 4.9,
      price: 245,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800',
      amenities: ['Beachfront', 'All Inclusive', 'Spa', 'Kids Club'],
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Chiang Mai, Thailand',
      rating: 4.7,
      price: 129,
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800',
      amenities: ['Mountain View', 'Free Breakfast', 'Yoga Classes', 'Hiking'],
    },
    {
      id: 4,
      name: 'City Center Hotel',
      location: 'Singapore',
      rating: 4.6,
      price: 210,
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?auto=format&fit=crop&w=800',
      amenities: ['Central Location', 'Gym', 'Rooftop Bar', 'Concierge'],
    },
    {
      id: 5,
      name: 'Boutique Heritage Hotel',
      location: 'Hanoi, Vietnam',
      rating: 4.8,
      price: 165,
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?auto=format&fit=crop&w=800',
      amenities: ['Heritage Building', 'Cultural Activities', 'Garden', 'Library'],
    },
    {
      id: 6,
      name: 'Luxury Villa Resort',
      location: 'Bali, Indonesia',
      rating: 4.9,
      price: 320,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800',
      amenities: ['Private Pool', 'Butler Service', 'Spa', 'Fine Dining'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Luxury Hotels & Resorts</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Find the perfect accommodation for your stay. From luxury resorts to cozy boutique hotels, 
            we partner with the best properties worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
            <Link
              href="/packages"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              <i className="fas fa-suitcase mr-2"></i>
              View Packages
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Destination</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Check-in</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Check-out</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <i className="fas fa-search mr-2"></i>
                Search Hotels
              </button>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-56">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-green-600 font-bold">${hotel.price}</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <i className="fas fa-map-marker-alt text-green-600 mr-2"></i>
                      {hotel.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <i className="fas fa-star mr-1"></i>
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;