'use client';

import React, { useState } from 'react';
import { BookingModal } from '../Common';

const Hero = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchType, setSearchType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [searchCriteria, setSearchCriteria] = useState({
    from: 'Sydney',
    to: '',
    departureDate: '',  
    returnDate: '',
    passengers: '1',
    cabinClass: 'economy',
  });
  
  // For Multi-City
  const [multiCityTrips, setMultiCityTrips] = useState([
    { from: 'Sydney', to: '', date: '' },
    { from: '', to: '', date: '' }
  ]);
  const [multiCityPassengers, setMultiCityPassengers] = useState('1');
  const [multiCityClass, setMultiCityClass] = useState('economy');

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
    
    // Set default dates for multi-city
    setMultiCityTrips(prev => prev.map((trip, index) => ({
      ...trip,
      date: index === 0 ? tomorrow.toISOString().split('T')[0] : nextWeek.toISOString().split('T')[0]
    })));
  }, []);

  const handleSearch = () => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      // Show notification
      if (typeof window !== 'undefined') {
        showNotification('Please login to book flights', 'warning');
        // You can trigger login modal here
        return;
      }
    }
    setShowBookingModal(true);
  };

  const handleMultiCitySearch = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      if (typeof window !== 'undefined') {
        showNotification('Please login to book flights', 'warning');
        return;
      }
    }
    // Handle multi-city search
    showNotification('Multi-city search functionality coming soon!', 'info');
  };

  const addTrip = () => {
    setMultiCityTrips([...multiCityTrips, { from: '', to: '', date: '' }]);
  };

  const updateTrip = (index: number, field: 'from' | 'to' | 'date', value: string) => {
    const updatedTrips = [...multiCityTrips];
    updatedTrips[index] = {
      ...updatedTrips[index],
      [field]: value
    };
    setMultiCityTrips(updatedTrips);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    
    switch(type) {
      case 'success':
        notification.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        break;
      case 'error':
        notification.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
        break;
      case 'warning':
        notification.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
        break;
      default:
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #60a5fa)';
    }
    
    notification.style.display = 'flex';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
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
              <form 
                className="search-form" 
                style={{ 
                  display: searchType !== 'multi-city' ? 'flex' : 'none',
                  flexWrap: 'wrap',
                  gap: '30px',
                  marginBottom: '25px'
                }}
              >
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
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  Search Flights
                </button>
              </form>

              {/* Multi-City Form */}
              <div 
                className="multi-city-form" 
                style={{ 
                  display: searchType === 'multi-city' ? 'flex' : 'none',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '25px'
                }}
              >
                <div className="flight-rows-container" id="flightRows">
                  {multiCityTrips.map((trip, index) => (
                    <div key={index} className="flight-row">
                      <div className="input-group">
                        <label>From</label>
                        <div className="input-wrapper">
                          <input 
                            type="text" 
                            value={trip.from}
                            onChange={(e) => updateTrip(index, 'from', e.target.value)}
                            placeholder="Enter city"
                          />
                          <span className="swap-icon">⇌</span>
                        </div>
                      </div>
                      <div className="input-group">
                        <label>To</label>
                        <div className="input-wrapper">
                          <input 
                            type="text" 
                            value={trip.to}
                            onChange={(e) => updateTrip(index, 'to', e.target.value)}
                            placeholder="Enter city"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Departure</label>
                        <div className="input-wrapper date-wrapper">
                          <input 
                            type="date" 
                            value={trip.date}
                            onChange={(e) => updateTrip(index, 'date', e.target.value)}
                          />
                          <span className="calendar-icon">📅</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="add-trip-btn" 
                  type="button" 
                  onClick={addTrip}
                >
                  Add Trip
                </button>

                <hr className="divider" />

                <div className="bottom-bar">
                  <div className="bottom-inputs">
                    <div className="input-group">
                      <label>Passenger</label>
                      <select 
                        className="bottom-field" 
                        value={multiCityPassengers}
                        onChange={(e) => setMultiCityPassengers(e.target.value)}
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Classes</label>
                      <select 
                        className="bottom-field" 
                        value={multiCityClass}
                        onChange={(e) => setMultiCityClass(e.target.value)}
                      >
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business Class</option>
                        <option value="first">First Class</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    className="btn-search" 
                    type="button" 
                    onClick={handleMultiCitySearch}
                  >
                    Search Multi-City Flights
                  </button>
                </div>
                
                <div className="checkbox-container">
                  <input type="checkbox" id="direct" />
                  <label htmlFor="direct">Direct Flight Only</label>
                </div>
              </div>
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