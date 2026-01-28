'use client';

import React, { useState } from 'react';
import { BookingModal } from '../Common';

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
  
  // For Multi-City
  const [multiCityTrips, setMultiCityTrips] = useState([
    { from: '', to: '', date: '' },
    { from: '', to: '', date: '' }
  ]);
  const [multiCityPassengers, setMultiCityPassengers] = useState('1');
  const [multiCityClass, setMultiCityClass] = useState('economy');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [airports, setAirports] = useState<{code: string, cityName: string}[]>([]);
  const [supportedPairs, setSupportedPairs] = useState<any[]>([]);

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

    const fetchAirports = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/api/sabre/supported-origins-destinations`);
        const json = await response.json();
        console.log('Airport API response:', json);
        
        // Handle both { data: { OriginDestinationLocations: [] } } and { OriginDestinationLocations: [] }
        const locations = json.data?.OriginDestinationLocations || json.OriginDestinationLocations;
        
        if (locations && Array.isArray(locations)) {
          console.log(`Found ${locations.length} origin-destination pairs`);
          const airportMap = new Map();
          
          locations.forEach((item: any) => {
            if (item.OriginLocation && item.OriginLocation.AirportCode) {
              airportMap.set(
                item.OriginLocation.AirportCode, 
                item.OriginLocation.CityName || item.OriginLocation.AirportName || item.OriginLocation.AirportCode
              );
            }
            if (item.DestinationLocation && item.DestinationLocation.AirportCode) {
              airportMap.set(
                item.DestinationLocation.AirportCode, 
                item.DestinationLocation.CityName || item.DestinationLocation.AirportName || item.DestinationLocation.AirportCode
              );
            }
          });
          
          const uniqueAirports = Array.from(airportMap.entries())
            .map(([code, cityName]) => ({ code, cityName }))
            .sort((a, b) => (a.cityName || '').localeCompare(b.cityName || ''));
            
          console.log(`Mapped to ${uniqueAirports.length} unique airports:`, uniqueAirports);
          setAirports(uniqueAirports);
          setSupportedPairs(locations);
        } else {
          console.warn('Unexpected airport data structure:', json);
        }
      } catch (err) {
        console.error('Error fetching airports:', err);
      }
    };
    
    fetchAirports();
  }, []);

  const handleSearch = async () => {
    if (!searchCriteria.from || !searchCriteria.to || !searchCriteria.departureDate) {
      showNotification('Please fill in From, To and Departure Date', 'warning');
      return;
    }

    if (searchType === 'return' && searchCriteria.returnDate && searchCriteria.returnDate <= searchCriteria.departureDate) {
      showNotification('Return date must be after departure date', 'warning');
      return;
    }

    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const url = `${baseUrl}/api/sabre/search?origin=${searchCriteria.from}&destination=${searchCriteria.to}&date=${searchCriteria.departureDate}&returndate=${searchType === 'return' ? searchCriteria.returnDate : ''}&passengercount=${searchCriteria.passengers}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.message || 'No flights found for this route');
        showNotification(data.message || 'No flights found', 'error');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching for flights');
      showNotification('An error occurred while searching for flights', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMultiCitySearch = () => {
    // For now, multi-city just does a notification as before or we could implement it
    showNotification('Multi-city search functionality coming soon!', 'info');
  };

  const addTrip = () => {
    setMultiCityTrips([...multiCityTrips, { from: '', to: '', date: '' }]);
  };

  const removeTrip = (index: number) => {
    if (multiCityTrips.length > 2) {
      setMultiCityTrips(multiCityTrips.filter((_, i) => i !== index));
    } else {
      showNotification('Minimum 2 trips are required', 'warning');
    }
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
      <div className="main-section pb-64 md:pb-20 ">
        <div className="main-container">
          <header className="hero">
            <div className="hero-content">
              <h1>Enjoy your Dream <br /> Vacation</h1>
              <p>We always make our customer happy by providing as <br /> many choices as possible.</p>
            </div>
            
            <div className="search-card shadow-md">
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
                className="search-form " 
                style={{ 
                  display: searchType !== 'multi-city' ? 'flex' : 'none',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginBottom: '25px',
                  maxWidth: '1100px',
                  margin: '0 auto'
                }}
              >
                <div className="input-group" style={{ flex: '1 1 200px' }}>
                  <label>From</label>
                  <select 
                    value={searchCriteria.from}
                    onChange={(e) => {
                      const newFrom = e.target.value;
                      const validDestinations = supportedPairs
                        .filter(p => p.OriginLocation?.AirportCode === newFrom)
                        .map(p => p.DestinationLocation?.AirportCode);
                      
                      let newTo = searchCriteria.to;
                      if (newFrom && validDestinations.length === 1) {
                        newTo = validDestinations[0];
                      } else if (newTo && !validDestinations.includes(newTo)) {
                        newTo = '';
                      }
                      
                      setSearchCriteria({...searchCriteria, from: newFrom, to: newTo});
                    }}
                    id="fromCity"
                    className="bottom-field"
                  >
                    <option value="">Select Origin</option>
                    {airports
                      .filter(airport => {
                        if (!searchCriteria.to) return true;
                        return supportedPairs.some(p => 
                          p.DestinationLocation?.AirportCode === searchCriteria.to && 
                          p.OriginLocation?.AirportCode === airport.code
                        );
                      })
                      .map((airport) => (
                        <option key={`from-${airport.code}`} value={airport.code}>
                          {airport.cityName} ({airport.code})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-group" style={{ flex: '1 1 200px' }}>
                  <label>To</label>
                  <select 
                    value={searchCriteria.to}
                    onChange={(e) => {
                      const newTo = e.target.value;
                      const validOrigins = supportedPairs
                        .filter(p => p.DestinationLocation?.AirportCode === newTo)
                        .map(p => p.OriginLocation?.AirportCode);
                      
                      let newFrom = searchCriteria.from;
                      if (newTo && validOrigins.length === 1) {
                        newFrom = validOrigins[0];
                      } else if (newFrom && !validOrigins.includes(newFrom)) {
                        newFrom = '';
                      }
                      
                      setSearchCriteria({...searchCriteria, to: newTo, from: newFrom});
                    }}
                    id="toCity"
                    className="bottom-field"
                  >
                    <option value="">Select Destination</option>
                    {airports
                      .filter(airport => {
                        if (!searchCriteria.from) return true;
                        return supportedPairs.some(p => 
                          p.OriginLocation?.AirportCode === searchCriteria.from && 
                          p.DestinationLocation?.AirportCode === airport.code
                        );
                      })
                      .map((airport) => (
                        <option key={`to-${airport.code}`} value={airport.code}>
                          {airport.cityName} ({airport.code})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-group" style={{ flex: '1 1 200px' }}>
                  <label>Departure</label>
                  <div className="date-input">
                    <input 
                      type="date" 
                      value={searchCriteria.departureDate}
                      onChange={(e) => {
                        const newDeparture = e.target.value;
                        let newReturn = searchCriteria.returnDate;
                        if (searchCriteria.returnDate && searchCriteria.returnDate <= newDeparture) {
                          const nextDay = new Date(newDeparture);
                          nextDay.setDate(nextDay.getDate() + 1);
                          newReturn = nextDay.toISOString().split('T')[0];
                        }
                        setSearchCriteria({
                          ...searchCriteria, 
                          departureDate: newDeparture,
                          returnDate: newReturn
                        });
                      }}
                      id="departureDate"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="input-group" style={{ 
                  flex: '1 1 200px',
                  display: searchType === 'return' ? 'block' : 'none' 
                }}>
                  <label>Return</label>
                  <div className="date-input">
                    <input 
                      type="date" 
                      value={searchCriteria.returnDate}
                      onChange={(e) => setSearchCriteria({...searchCriteria, returnDate: e.target.value})}
                      id="returnDate"
                      min={searchCriteria.departureDate}
                    />
                  </div>
                </div>

   <div className="input-group">
  <label>Passengers</label>
  <div className="passenger-counter" style={{ 
    display: 'flex', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    alignItems: 'center', 
    gap: 'clamp(8px, 2vw, 12px)', // Responsive gap
    padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 18px)', // Responsive padding
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }}>
    <button 
      type="button"
      onClick={() => setSearchCriteria({
        ...searchCriteria, 
        passengers: parseInt(searchCriteria.passengers) > 1 ? `${parseInt(searchCriteria.passengers) - 1}` : '1'
      })}
      style={{
        width: 'clamp(28px, 6vw, 30px)', // Responsive width
        height: 'clamp(28px, 6vw, 30px)', // Responsive height
        borderRadius: '50%',
        border: '1px solid #d1d5db',
        backgroundColor: '#f9fafb',
        fontSize: 'clamp(14px, 3vw, 16px)', // Responsive font
        fontWeight: '600',
        color: '#374151',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
    >
      -
    </button>
    
    <span style={{
      minWidth: '24px',
      textAlign: 'center',
      fontSize: 'clamp(15px, 3.5vw, 17px)', // Responsive font
      fontWeight: '500',
      color: '#111827',
      flexGrow: 1
    }}>
      {searchCriteria.passengers}
    </span>
    
    <button 
      type="button"
      onClick={() => setSearchCriteria({
        ...searchCriteria, 
        passengers: parseInt(searchCriteria.passengers) < 4 ? `${parseInt(searchCriteria.passengers) + 1}` : '4'
      })}
      style={{
        width: 'clamp(28px, 6vw, 30px)', // Responsive width
        height: 'clamp(28px, 6vw, 30px)', // Responsive height
        borderRadius: '50%',
        border: '1px solid #d1d5db',
        backgroundColor: '#f9fafb',
        fontSize: 'clamp(14px, 3vw, 16px)', // Responsive font
        fontWeight: '600',
        color: '#374151',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
    >
      +
    </button>
  </div>
</div>

                <div className="input-group" style={{ flex: '1 1 200px' }}>
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
                  className={`btn-search ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} 
                  type="button" 
                  onClick={handleSearch}
                  disabled={loading}
                  style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">🌀</span>
                      Searching...
                    </>
                  ) : (
                    'Search Flights'
                  )}
                </button>
              </form>

              {/* Multi-City Form */}
              <div 
                className="multi-city-form" 
                style={{ 
                  display: searchType === 'multi-city' ? 'flex' : 'none',
                  maxWidth: '1100px',
                  margin: '0 auto'
                }}
              >
                <div className="flight-rows-container" id="flightRows">
                  {multiCityTrips.map((trip, index) => (
                    <div key={index} className="flight-row" style={{ position: 'relative' }}>
                      <div className="input-group">
                        <label>From</label>
                        <div className="input-wrapper">
                          <select 
                            value={trip.from}
                            onChange={(e) => updateTrip(index, 'from', e.target.value)}
                            placeholder="Enter city"
                          />
                          
                        </div>
                      </div>
                      <div className="input-group">
                        <label>To</label>
                        <div className="input-wrapper">
                          <select 
                            value={trip.to}
                            onChange={(e) => updateTrip(index, 'to', e.target.value)}
                            className="bottom-field"
                          >
                            <option value="">Select Destination</option>
                            {airports.map((airport) => (
                              <option key={`multi-to-${index}-${airport.code}`} value={airport.code}>
                                {airport.cityName} ({airport.code})
                              </option>
                            ))}
                          </select>
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
                      {multiCityTrips.length > 2 && (
                        <button 
                          className="remove-trip-btn"
                          onClick={() => removeTrip(index)}
                          title="Remove trip"
                          type="button"
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                        >
                          ✕
                        </button>
                      )}
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

                {/* <hr className="divider" /> */}

  <div className="bottom-bar">
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
    <div className="input-group flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
      <div className="flex items-center justify-between p-1 sm:p-2 bg-white border border-gray-200 rounded-lg shadow-sm w-full">
        <button 
          type="button"
          onClick={() => setSearchCriteria({
            ...searchCriteria, 
            passengers: parseInt(searchCriteria.passengers) > 1 ? `${parseInt(searchCriteria.passengers) - 1}` : '1'
          })}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 transition-colors duration-200"
        >
          -
        </button>
        
        <span className="text-base sm:text-lg font-medium text-gray-900 px-4">
          {searchCriteria.passengers}
        </span>
        
        <button 
          type="button"
          onClick={() => setSearchCriteria({
            ...searchCriteria, 
            passengers: parseInt(searchCriteria.passengers) < 4 ? `${parseInt(searchCriteria.passengers) + 1}` : '4'
          })}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
    
    <div className="input-group flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
      <select 
        className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
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

  <div className="flex flex-col sm:flex-row  items-center justify-between mt-4 w-full">
    <div className="flex items-center space-x-2">
      <input 
        type="checkbox" 
        id="direct" 
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="direct" className="text-sm sm:text-base text-gray-700">
        Direct Flight Only
      </label>
    </div>  
    
    <button 
      className=" btn-search px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg"
      type="button" 
      onClick={handleMultiCitySearch}
    >
      Search Multi-City Flights
    </button>
  </div>
</div>
                
                
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Flight Results Section */}
      {(loading || results || error) && (
        <div id="search-results" className="search-results-section py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="loading-spinner mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-700">Finding the best flights for you...</h3>
              </div>
            )}

            {error && !loading && (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-semibold text-gray-800">{error}</h3>
                <p className="text-gray-500 mt-2">Try different cities or dates.</p>
              </div>
            )}

            {results && !loading && (
              <div className="results-container">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Flights from {results.OriginLocation} to {results.DestinationLocation}
                  </h2>
                  <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                    {results.PricedItineraries?.length || 0} flights found
                  </span>
                </div>

                <div className="space-y-4">
                  {results.PricedItineraries?.map((itin: any, index: number) => {
                    const pricing = itin.AirItineraryPricingInfo.ItinTotalFare;
                    const segments = itin.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment;
                    const firstLeg = segments[0];
                    const lastLeg = segments[segments.length - 1];
                    const airlineCode = itin.TPA_Extensions.ValidatingCarrier.Code;
                    
                    return (
                      <div key={index} className="flight-card bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col md:flex-row items-center gap-8">
                        {/* Airline Info */}
                        <div className="flex flex-col items-center gap-2 w-full md:w-32">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-blue-600 text-lg">
                            {airlineCode}
                          </div>
                          <span className="text-sm font-medium text-gray-600">Flight {firstLeg.FlightNumber}</span>
                        </div>

                        {/* Departure & Arrival */}
                        <div className="flex-1 flex items-center justify-between w-full">
                          <div className="text-center md:text-left">
                            <div className="text-2xl font-bold text-gray-800">
                              {new Date(firstLeg.DepartureDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm font-medium text-gray-500 uppercase">{firstLeg.DepartureAirport.LocationCode}</div>
                          </div>

                          <div className="flex-1 flex flex-col items-center px-8 relative">
                            <span className="text-xs text-gray-400 mb-1">{Math.floor(itin.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].ElapsedTime / 60)}h {itin.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].ElapsedTime % 60}m</span>
                            <div className="w-full h-[2px] bg-gray-200 relative">
                              <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-gray-300 -translate-y-1/2"></div>
                              <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-blue-500 -translate-y-1/2"></div>
                              {segments.length > 1 && (
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-orange-400 -translate-y-1/2 -translate-x-1/2" title={`${segments.length - 1} stop(s)`}></div>
                              )}
                            </div>
                            <span className="text-xs font-semibold mt-1 text-gray-500">
                              {segments.length === 1 ? 'Non-stop' : `${segments.length - 1} Stop${segments.length > 2 ? 's' : ''}`}
                            </span>
                          </div>

                          <div className="text-center md:text-right">
                            <div className="text-2xl font-bold text-gray-800">
                              {new Date(lastLeg.ArrivalDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm font-medium text-gray-500 uppercase">{lastLeg.ArrivalAirport.LocationCode}</div>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex flex-row md:flex-col items-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 w-full md:w-48 justify-between md:justify-center gap-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Price</div>
                            <div className="text-2xl font-extrabold text-blue-600">
                              {pricing.TotalFare.CurrencyCode} {pricing.TotalFare.Amount.toLocaleString()}
                            </div>
                          </div>
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-colors whitespace-nowrap"
                            onClick={() => {
                              setSearchCriteria({
                                ...searchCriteria,
                                from: firstLeg.DepartureAirport.LocationCode,
                                to: lastLeg.ArrivalAirport.LocationCode,
                                departureDate: firstLeg.DepartureDateTime.split('T')[0]
                              });
                              setShowBookingModal(true);
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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