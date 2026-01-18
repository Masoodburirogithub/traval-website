// app/bookings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  pnr: string;
  flight: {
    airline: {
      name: string;
    };
    flightNumber: string;
    route: {
      from: string;
      to: string;
    };
    departureTime: string;
  };
  passengers: Array<{
    firstName: string;
    lastName: string;
    seat?: string;
  }>;
  totalAmount: number;
  bookingDate: string;
  travelDate: string;
  status: string;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">Manage your flight bookings and view details</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-plane text-4xl text-blue-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No bookings yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your journey by booking your first flight with Gurkhas Travel
            </p>
            <Link
              href="/"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Book a Flight
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                          {booking.status}
                        </span>
                        <span className="text-sm text-gray-500">Booking ID: {booking.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.flight.airline.name} {booking.flight.flightNumber}
                      </h3>
                      <p className="text-gray-600">
                        {booking.flight.route.from} → {booking.flight.route.to}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-3xl font-bold text-blue-600">${booking.totalAmount}</div>
                      <p className="text-sm text-gray-500 mt-1">Total Amount</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Departure Time</div>
                      <div className="font-semibold">{booking.flight.departureTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Travel Date</div>
                      <div className="font-semibold">{booking.travelDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Booking Date</div>
                      <div className="font-semibold">{booking.bookingDate}</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Passengers</h4>
                    <div className="space-y-3">
                      {booking.passengers.map((passenger, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-user text-gray-600"></i>
                            </div>
                            <div>
                              <div className="font-semibold">{passenger.firstName} {passenger.lastName}</div>
                              <div className="text-sm text-gray-500">Passenger {index + 1}</div>
                            </div>
                          </div>
                          {passenger.seat && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                              Seat: {passenger.seat}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 mt-8">
                    <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                      View Details
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;