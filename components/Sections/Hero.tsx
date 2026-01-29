'use client';

import React, { useState } from 'react';
import { BookingModal } from '../Common';

const SearchableAirportSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  id,
  className
}: {
  value: string;
  onChange: (val: string) => void;
  options: {code: string, cityName: string}[];
  placeholder: string;
  id?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Find name for code
  const getAirportLabel = (code: string) => {
    const opt = options.find(o => o.code === code);
    return opt ? `${opt.cityName} (${opt.code})` : '';
  };

  // Sync searchTerm with value when not focused/open
  React.useEffect(() => {
    if (!isOpen) {
      setSearchTerm(getAirportLabel(value));
    }
  }, [value, isOpen, options]);

  const filteredOptions = options.filter(opt => 
    opt.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          id={id}
          className={`${className} pr-10`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (!e.target.value) onChange('');
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
            }, 200);
          }}
          autoComplete="off"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <ul className="absolute z-[1000] w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto py-2 left-0">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt.code}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors flex justify-between items-center group"
                onMouseDown={() => {
                  onChange(opt.code);
                  setSearchTerm(`${opt.cityName} (${opt.code})`);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{opt.cityName}</span>
                  <span className="text-xs text-gray-500 uppercase">{opt.code}</span>
                </div>
                <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center">
              <div className="text-gray-400 text-sm mb-1">No matches found</div>
              <div className="text-xs text-gray-300">Try searching for the city or code</div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const Hero = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchType, setSearchType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [showTravelers, setShowTravelers] = useState(false);
  const travelersRef = React.useRef<HTMLDivElement>(null);

  const [searchCriteria, setSearchCriteria] = useState({
    from: '',
    to: '',
    departureDate: '',  
    returnDate: '',
    passengers: '1',
    travelers: {
      adults: 1,
      students: 0,
      seniors: 0,
      youths: 0,
      children: 0,
      toddlers: 0,
      infants: 0
    },
    cabinClass: 'economy',
  });
  
  const travelerTypes = [
    { id: 'adults', label: 'Adults', subtext: '18-64' },
    { id: 'students', label: 'Students', subtext: 'over 18' },
    { id: 'seniors', label: 'Seniors', subtext: 'over 65' },
    { id: 'youths', label: 'Youths', subtext: '12-17' },
    { id: 'children', label: 'Children', subtext: '2-11' },
    { id: 'toddlers', label: 'Toddlers in own seat', subtext: 'under 2' },
    { id: 'infants', label: 'Infants on lap', subtext: 'under 2' },
  ];
  
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

  // Handle click outside travelers dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateTravelers = (type: string, operation: 'add' | 'remove') => {
    setSearchCriteria(prev => {
      // @ts-ignore
      const current = prev.travelers[type];
      const newValue = operation === 'add' ? current + 1 : Math.max(0, current - 1);
      
      // Keep at least 1 adult
      if (type === 'adults' && newValue < 1) return prev;

      const newTravelers = { ...prev.travelers, [type]: newValue };
      // @ts-ignore
      const total = Object.values(newTravelers).reduce((a: number, b: number) => a + b, 0);
      
      return {
        ...prev,
        travelers: newTravelers,
        passengers: total.toString()
      };
    });
  };

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
        
        // TODO: Update maxPassengers based on available seats from API
        // Example: if API returns available seats data
        // if (data.data.availableSeats) {
        //   setMaxPassengers(data.data.availableSeats);
        // }
        
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
                  <SearchableAirportSelect 
                    value={searchCriteria.from}
                    options={airports.filter(airport => {
                      if (!searchCriteria.to) return true;
                      return supportedPairs.some(p => 
                        p.DestinationLocation?.AirportCode === searchCriteria.to && 
                        p.OriginLocation?.AirportCode === airport.code
                      );
                    })}
                    onChange={(newFrom) => {
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
                    placeholder="Select Origin"
                  />
                </div>

                <div className="input-group" style={{ flex: '1 1 200px' }}>
                  <label>To</label>
                  <SearchableAirportSelect 
                    value={searchCriteria.to}
                    options={airports.filter(airport => {
                      if (!searchCriteria.from) return true;
                      return supportedPairs.some(p => 
                        p.OriginLocation?.AirportCode === searchCriteria.from && 
                        p.DestinationLocation?.AirportCode === airport.code
                      );
                    })}
                    onChange={(newTo) => {
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
                    placeholder="Select Destination"
                  />
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

                <div className="input-group relative" ref={travelersRef} style={{ flex: '1 1 200px' }}>
                  <label>Travelers</label>
                  <div 
                    className="bottom-field flex items-center justify-between cursor-pointer"
                    onClick={() => setShowTravelers(!showTravelers)}
                    style={{ userSelect: 'none' }}
                  >
                    <div className="flex flex-col justify-center">
                      <span className="font-medium text-gray-800">
                        {searchCriteria.passengers} Traveler{parseInt(searchCriteria.passengers) !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  
                  {showTravelers && (
                    <div className="absolute top-full left-0 w-full min-w-[320px] bg-white rounded-xl shadow-xl mt-2 p-2 z-50 border border-gray-100 max-h-[400px] overflow-y-auto">
                      {travelerTypes.map((type) => (
                        <div key={type.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{type.label}</span>
                            <span className="text-xs text-gray-500">{type.subtext}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateTravelers(type.id, 'remove')}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                                // @ts-ignore
                                searchCriteria.travelers[type.id] === (type.id === 'adults' ? 1 : 0)
                                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                  : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500'
                              }`}
                              // @ts-ignore
                              disabled={searchCriteria.travelers[type.id] === (type.id === 'adults' ? 1 : 0)}
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-medium text-gray-700">
                              {/* @ts-ignore */}
                              {searchCriteria.travelers[type.id]}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateTravelers(type.id, 'add')}
                              className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                          <SearchableAirportSelect 
                            value={trip.from}
                            options={airports}
                            onChange={(val) => updateTrip(index, 'from', val)}
                            placeholder="Select Origin"
                            className="bottom-field"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>To</label>
                        <div className="input-wrapper">
                          <SearchableAirportSelect 
                            value={trip.to}
                            options={airports}
                            onChange={(val) => updateTrip(index, 'to', val)}
                            placeholder="Select Destination"
                            className="bottom-field"
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
            passengers: `${parseInt(searchCriteria.passengers) + 1}`
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