'use client';

import React, { useState } from 'react';
import { BookingModal } from '../Common';
// import { BookingModal } from '../Common/BookingModal';
// import BookingModal from '../Common/BookingModal';

const Hero = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchType, setSearchType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [searchCriteria, setSearchCriteria] = useState({
    from: '',
    to: '',
    departureDate: '',  
    returnDate: '',
    passengers: '1',
    cabinClass: 'economy',
  });

  // Set default dates
  React.useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    setSearchCriteria(prev => ({
      ...prev,
      departureDate: tomorrow.toISOString().split('T')[0],
      returnDate: nextWeek.toISOString().split('T')[0],
    }));
  }, []);

  const handleSearch = () => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      // Show login modal instead
      // This would be handled by parent component
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <>
      <div className="main-section">
        <div className="main-container">
          <header className="hero">
            <div className="hero-content">
              <h1>Enjoy your Dream <br /> Vacation</h1>
              <p>We always make our customer happy by providing as <br /> many choices as possible.</p>
            </div>
            
            <div className="search-card">
              <h2>Where would you like to go?</h2>
              
              <div className="tabs">
                <span 
                  className={`tab ${searchType === 'return' ? 'active' : ''}`}
                  onClick={() => setSearchType('return')}
                  data-type="return"
                >
                  Return
                </span>
                <span 
                  className={`tab ${searchType === 'one-way' ? 'active' : ''}`}
                  onClick={() => setSearchType('one-way')}
                  data-type="one-way"
                >
                  One Way
                </span>
                <span 
                  className={`tab ${searchType === 'multi-city' ? 'active' : ''}`}
                  onClick={() => setSearchType('multi-city')}
                  data-type="multi-city"
                >
                  Multi-City
                </span>
              </div>

              {/* Return/One Way Form */}
              <form className="search-form" style={{ display: searchType !== 'multi-city' ? 'flex' : 'none' }}>
                <div className="input-group">
                  <label>From</label>
                  <input 
                    type="text" 
                    value={searchCriteria.from}
                    onChange={(e) => setSearchCriteria({...searchCriteria, from: e.target.value})}
                    id="fromCity"
                  />
                </div>

                <div className="input-group">
                  <label>To</label>
                  <input 
                    type="text" 
                    placeholder="To" 
                    value={searchCriteria.to}
                    onChange={(e) => setSearchCriteria({...searchCriteria, to: e.target.value})}
                    id="toCity"
                  />
                </div>

                <div className="input-group">
                  <label>{searchType === 'return' ? 'Return' : 'Date'}</label>
                  <div className="date-input">
                    <input 
                      type="date" 
                      value={searchCriteria.returnDate}
                      onChange={(e) => setSearchCriteria({...searchCriteria, returnDate: e.target.value})}
                      id="returnDate"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Departure</label>
                  <div className="date-input">
                    <input 
                      type="date" 
                      value={searchCriteria.departureDate}
                      onChange={(e) => setSearchCriteria({...searchCriteria, departureDate: e.target.value})}
                      id="departureDate"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Passengers</label>
                  <select 
                    className="bottom-field" 
                    value={searchCriteria.passengers}
                    onChange={(e) => setSearchCriteria({...searchCriteria, passengers: e.target.value})}
                    id="passengers"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Class</label>
                  <select 
                    className="bottom-field" 
                    value={searchCriteria.cabinClass}
                    onChange={(e) => setSearchCriteria({...searchCriteria, cabinClass: e.target.value})}
                    id="cabinClass"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business Class</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
                
                <button 
                  className="btn-search" 
                  type="button" 
                  onClick={handleSearch}
                >
                  Search Flights
                </button>
              </form>
            </div>
          </header>
        </div>
      </div>

    {showBookingModal && (
  <BookingModal
    searchCriteria={searchCriteria}
    onClose={() => setShowBookingModal(false)}
  />
)}
    </>
  );
};

export default Hero;