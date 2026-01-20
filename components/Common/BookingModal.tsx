// components/Common/BookingModal.tsx - UPDATED VERSION
'use client';

import React, { useState, useEffect } from 'react';

interface Flight {
  id: string;
  airline: {
    code: string;
    name: string;
    color: string;
  };
  flightNumber: string;
  route: {
    from: string;
    to: string;
    fromCity: string;
    toCity: string;
    distance: string;
    duration: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopCity: string | null;
  price: number;
  businessPrice: number;
  firstClassPrice: number;
  seats: number;
  aircraft: string;
  amenities: string[];
  features: string[];
  departureDate: string;
  arrivalDate: string;
  gate: string;
  terminal: string;
}

interface Passenger {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  passport: string;
  seat: string;
  mealPreference: string;
}

interface SearchCriteria {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  cabinClass: string;
}

interface BookingModalProps {
  searchCriteria: SearchCriteria;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ searchCriteria, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [user, setUser] = useState<any>(null);

  // Initialize data
  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Generate sample flights
    generateSampleFlights();
    
    // Initialize passengers
    const passengerCount = parseInt(searchCriteria.passengers);
    const newPassengers: Passenger[] = [];
    for (let i = 0; i < passengerCount; i++) {
      newPassengers.push({
        id: i + 1,
        title: 'Mr',
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        seat: '',
        mealPreference: 'Standard'
      });
    }
    setPassengers(newPassengers);
  }, [searchCriteria]);

  const generateSampleFlights = () => {
    const airlines = [
      { code: 'QF', name: 'Qantas Airways', color: '#e40000' },
      { code: 'VA', name: 'Virgin Australia', color: '#c6007e' },
      { code: 'SQ', name: 'Singapore Airlines', color: '#00447c' },
      { code: 'EK', name: 'Emirates', color: '#d71921' },
      { code: 'AA', name: 'American Airlines', color: '#1e1e5d' }
    ];

    const routes = [
      { from: 'SYD', to: 'LHR', fromCity: 'Sydney', toCity: 'London', distance: '17,000 km', duration: '22h 30m' },
      { from: 'SYD', to: 'LAX', fromCity: 'Sydney', toCity: 'Los Angeles', distance: '12,000 km', duration: '14h 45m' },
      { from: 'SYD', to: 'SIN', fromCity: 'Sydney', toCity: 'Singapore', distance: '6,300 km', duration: '8h 15m' },
      { from: 'SYD', to: 'DXB', fromCity: 'Sydney', toCity: 'Dubai', distance: '12,000 km', duration: '14h 20m' },
      { from: 'MEL', to: 'LHR', fromCity: 'Melbourne', toCity: 'London', distance: '16,900 km', duration: '21h 45m' }
    ];

    const sampleFlights: Flight[] = [];
    for (let i = 0; i < 5; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const route = routes[Math.floor(Math.random() * routes.length)];
      const departureHour = Math.floor(Math.random() * 12) + 6;

      sampleFlights.push({
        id: `FL${1000 + i}`,
        airline: airline,
        flightNumber: `${airline.code}${200 + i}`,
        route: route,
        departureTime: `${departureHour}:${Math.random() > 0.5 ? '30' : '00'}`,
        arrivalTime: `${(departureHour + Math.floor(Math.random() * 8) + 8) % 24}:${Math.random() > 0.5 ? '45' : '15'}`,
        duration: route.duration,
        stops: Math.random() > 0.6 ? 1 : 0,
        stopCity: Math.random() > 0.6 ? ['Singapore', 'Dubai', 'Hong Kong'][Math.floor(Math.random() * 3)] : null,
        price: Math.floor(Math.random() * 600) + 700,
        businessPrice: Math.floor(Math.random() * 1200) + 1400,
        firstClassPrice: Math.floor(Math.random() * 2000) + 2500,
        seats: Math.floor(Math.random() * 20) + 5,
        aircraft: Math.random() > 0.5 ? 'Boeing 787 Dreamliner' : 'Airbus A350',
        amenities: ['WiFi', 'Entertainment', 'Meal', 'USB Charger', 'Blanket', 'Pillow'],
        features: ['On-demand Entertainment', 'USB Ports', 'WiFi Available', 'Complimentary Meal'],
        departureDate: searchCriteria.departureDate || '2025-03-15',
        arrivalDate: '2025-03-16',
        gate: `G${Math.floor(Math.random() * 50) + 1}`,
        terminal: ['T1', 'T2', 'T3'][Math.floor(Math.random() * 3)]
      });
    }
    setFlights(sampleFlights);
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep(2);
  };

  const handlePassengerUpdate = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const handleSeatSelection = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < passengers.length) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handlePayment = () => {
    // Process booking
    const bookingId = `GTRV${Date.now().toString().slice(-6)}`;
    const pnr = generatePNR();
    
    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('gurkhasBookings') || '[]');
    const newBooking = {
      id: bookingId,
      pnr: pnr,
      customerId: user?.id,
      customerName: user?.name,
      customerEmail: user?.email,
      flight: selectedFlight,
      passengers: passengers.map((p, i) => ({
        ...p,
        seat: selectedSeats[i] || ''
      })),
      totalAmount: calculateTotalAmount(),
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: searchCriteria.departureDate,
      status: 'confirmed',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      seatNumbers: selectedSeats,
      flightClass: searchCriteria.cabinClass
    };
    
    bookings.unshift(newBooking);
    localStorage.setItem('gurkhasBookings', JSON.stringify(bookings));
    
    setCurrentStep(5);
  };

  const calculateTotalAmount = () => {
    if (!selectedFlight) return 0;
    
    const passengerCount = passengers.length;
    const basePrice = searchCriteria.cabinClass === 'business' ? selectedFlight.businessPrice :
                     searchCriteria.cabinClass === 'first' ? selectedFlight.firstClassPrice : 
                     selectedFlight.price;
    const baseTotal = basePrice * passengerCount;
    const taxes = 120 * passengerCount;
    return baseTotal + taxes;
  };

  const generatePNR = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
      pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
  };

  const generateSeatMap = () => {
    const rows = 10;
    const seatsPerRow = 6;
    let seatMap = [];
    
    for (let row = 1; row <= rows; row++) {
      seatMap.push(
        <div key={row} className="seat-row">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((seat, index) => {
            const seatId = `${row}${seat}`;
            const isOccupied = Math.random() < 0.3;
            const isSelected = selectedSeats.includes(seatId);
            
            let seatClass = 'seat available';
            if (isSelected) seatClass = 'seat selected';
            else if (isOccupied) seatClass = 'seat occupied';
            
            return (
              <React.Fragment key={seat}>
                <div
                  className={seatClass}
                  data-seat={seatId}
                  onClick={() => !isOccupied && handleSeatSelection(seatId)}
                >
                  {seatId}
                </div>
                {index === 2 && <div style={{ width: '30px' }}></div>}
              </React.Fragment>
            );
          })}
        </div>
      );
    }
    
    return seatMap;
  };

  // Render steps
  const renderStep1 = () => (
    <div className="booking-card">
      <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
        <i className="fas fa-plane"></i> Available Flights
      </h2>
      
      <div style={{ color: '#6b7280', marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
        <strong>Search Criteria:</strong> {searchCriteria.from} to {searchCriteria.to} • 
        {searchCriteria.passengers} passenger{parseInt(searchCriteria.passengers) > 1 ? 's' : ''} • 
        {searchCriteria.cabinClass}
      </div>
      
      {flights.map((flight) => {
        const passengerCount = parseInt(searchCriteria.passengers);
        const price = searchCriteria.cabinClass === 'business' ? flight.businessPrice :
                    searchCriteria.cabinClass === 'first' ? flight.firstClassPrice : flight.price;
        const totalPrice = price * passengerCount;
        
        return (
          <div key={flight.id} className="flight-card">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: `${flight.airline.color}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: flight.airline.color, fontSize: '24px' }}>
                  <i className="fas fa-plane"></i>
                </div>
                <div>
                  <h3 style={{ color: '#1d4ed8', marginBottom: '5px', fontSize: '20px' }}>{flight.airline.name}</h3>
                  <div style={{ color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>{flight.flightNumber}</span>
                    <span>•</span>
                    <span>{flight.aircraft}</span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '15px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>{flight.departureTime}</div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>{flight.route.from}</div>
                </div>
                <div style={{ flex: 2, textAlign: 'center' }}>
                  <div style={{ color: '#6b7280', marginBottom: '10px', fontSize: '14px' }}>{flight.duration}</div>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, #3b82f6, #93c5fd)' }}></div>
                    <i className="fas fa-plane" style={{ margin: '0 10px', color: '#3b82f6', fontSize: '16px', transform: 'rotate(45deg)' }}></i>
                    <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, #93c5fd, #3b82f6)' }}></div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>{flight.arrivalTime}</div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>{flight.route.to}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                {flight.features.slice(0, 3).map((feature) => (
                  <span key={feature} style={{ background: '#e5e7eb', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <i className="fas fa-check" style={{ color: '#10b981' }}></i> {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '200px', borderLeft: '2px solid #e5e7eb', paddingLeft: '20px' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#1d4ed8', marginBottom: '10px' }}>
                ${price}
              </div>
              <div style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
                ${totalPrice} total for {passengerCount} passenger{passengerCount > 1 ? 's' : ''}
              </div>
              <button
                className="btn-primary select-flight-btn"
                onClick={() => handleSelectFlight(flight)}
                style={{ padding: '12px 30px' }}
              >
                <i className="fas fa-check"></i> Select Flight
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderStep2 = () => (
    <div className="booking-card">
      <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
        <i className="fas fa-users"></i> Passenger Details ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})
      </h2>
      
      <form>
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="passenger-section">
            <h3 style={{ color: '#1d4ed8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-user"></i> Passenger {index + 1}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Title</label>
                <select
                  value={passenger.title}
                  onChange={(e) => handlePassengerUpdate(index, 'title', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Date of Birth</label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handlePassengerUpdate(index, 'dob', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>First Name</label>
                <input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerUpdate(index, 'firstName', e.target.value)}
                  placeholder="First name"
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Last Name</label>
                <input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerUpdate(index, 'lastName', e.target.value)}
                  placeholder="Last name"
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Passport Number</label>
                <input
                  type="text"
                  value={passenger.passport}
                  onChange={(e) => handlePassengerUpdate(index, 'passport', e.target.value)}
                  placeholder="Passport number"
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Meal Preference</label>
                <select
                  value={passenger.mealPreference}
                  onChange={(e) => handlePassengerUpdate(index, 'mealPreference', e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}
                >
                  <option value="Standard">Standard</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Halal">Halal</option>
                  <option value="Kosher">Kosher</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setCurrentStep(1)}
            style={{ padding: '12px 30px' }}
          >
            <i className="fas fa-arrow-left"></i> Back to Flights
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              // Validate all fields
              const isValid = passengers.every(p => 
                p.firstName && p.lastName && p.dob
              );
              
              if (isValid) {
                setCurrentStep(3);
              } else {
                alert('Please fill all required fields for all passengers');
              }
            }}
            style={{ padding: '12px 30px' }}
          >
            Continue to Seat Selection <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-card">
      <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
        <i className="fas fa-chair"></i> Seat Selection
      </h2>
      
      <div style={{ color: '#6b7280', marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
        <strong>Select {passengers.length} seat{passengers.length > 1 ? 's' : ''} for all passengers</strong>
      </div>
      
      <div className="seat-map">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#1d4ed8', marginBottom: '10px' }}>{selectedFlight?.aircraft}</h3>
          <div style={{ color: '#6b7280' }}>Choose your preferred seats</div>
        </div>
        
        {generateSeatMap()}
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: '#dcfce7', borderRadius: '5px', border: '2px solid #bbf7d0' }}></div>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', borderRadius: '5px' }}></div>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Selected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: '#fee2e2', borderRadius: '5px', border: '2px solid #fecaca' }}></div>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Occupied</span>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
        <h4 style={{ color: '#1d4ed8', marginBottom: '15px' }}>Selected Seats</h4>
        <div id="selectedSeatsDisplay" style={{ minHeight: '60px', padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          {selectedSeats.length === 0 ? (
            <div style={{ color: '#9ca3af', textAlign: 'center', padding: '10px' }}>No seats selected yet</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {selectedSeats.map(seat => (
                <div key={seat} style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-chair"></i> {seat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          className="btn-outline"
          onClick={() => setCurrentStep(2)}
          style={{ padding: '12px 30px' }}
        >
          <i className="fas fa-arrow-left"></i> Back to Passenger Details
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            if (selectedSeats.length === passengers.length) {
              setCurrentStep(4);
            } else {
              alert(`Please select ${passengers.length} seat${passengers.length > 1 ? 's' : ''}`);
            }
          }}
          style={{ padding: '12px 30px' }}
          disabled={selectedSeats.length !== passengers.length}
        >
          Continue to Payment <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const totalAmount = calculateTotalAmount();
    
    return (
      <div className="booking-card">
        <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
          <i className="fas fa-credit-card"></i> Payment Details
        </h2>
        
        <div style={{ gap: '40px' }} className="grid-cards">
          <div>
            <h3 style={{ color: '#1d4ed8', marginBottom: '20px' }}>Payment Information</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Card Number</label>
              <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Expiry Date</label>
                <input type="text" id="cardExpiry" placeholder="MM/YY" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>CVV</label>
                <input type="text" id="cardCVV" placeholder="123" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Cardholder Name</label>
              <input type="text" id="cardName" placeholder="John Smith" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
            </div>
          </div>
          
          <div>
            <h3 style={{ color: '#1d4ed8', marginBottom: '20px' }}>Booking Summary</h3>
            
            <div className="payment-summary">
              {selectedFlight && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                    <span>Flight</span>
                    <span style={{ fontWeight: '600' }}>{selectedFlight.airline.name} {selectedFlight.flightNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                    <span>Route</span>
                    <span style={{ fontWeight: '600' }}>{selectedFlight.route.from} → {selectedFlight.route.to}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                    <span>Passengers</span>
                    <span style={{ fontWeight: '600' }}>{passengers.length} x ${selectedFlight.price}</span>
                  </div>
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                <span>Taxes & Fees</span>
                <span style={{ fontWeight: '600' }}>${120 * passengers.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '900', color: '#1d4ed8', marginTop: '20px' }}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
              </div>
            </div>
            
            <div style={{ marginTop: '30px', padding: '20px', background: '#fef3c7', borderRadius: '10px', border: '1px solid #fbbf24' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <i className="fas fa-shield-alt" style={{ color: '#f59e0b' }}></i>
                <span style={{ fontWeight: '600', color: '#92400e' }}>Secure Payment</span>
              </div>
              <p style={{ color: '#92400e', fontSize: '14px', margin: '0' }}>Your payment is secured with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setCurrentStep(3)}
            style={{ padding: '12px 30px' }}
          >
            <i className="fas fa-arrow-left"></i> Back to Seat Selection
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handlePayment}
            style={{ padding: '12px 30px' }}
          >
            <i className="fas fa-lock"></i> Pay ${totalAmount}
          </button>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const bookingId = `GTRV${Date.now().toString().slice(-6)}`;
    const pnr = generatePNR();
    const totalAmount = calculateTotalAmount();
    
    return (
      <div className="booking-card" style={{ textAlign: 'center' }}>
        <div className="booking-confirmation">
          <i className="fas fa-check-circle confirmation-icon"></i>
          <h1 style={{ color: '#1d4ed8', marginBottom: '20px', fontSize: '36px' }}>Booking Confirmed!</h1>
          <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '30px' }}>
            Your booking has been successfully processed. Details have been sent to your email.
          </p>
          
          <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', padding: '20px 40px', borderRadius: '15px', display: 'inline-block', margin: '30px 0', boxShadow: '0 8px 25px rgba(29, 78, 216, 0.3)' }}>
            <div style={{ fontSize: '14px', opacity: '0.9', letterSpacing: '2px', marginBottom: '10px' }}>BOOKING REFERENCE</div>
            <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '3px' }}>{pnr}</div>
          </div>
          
          <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'left', background: '#f8fafc', padding: '30px', borderRadius: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Booking ID</div>
                <div style={{ fontWeight: '700', color: '#1f2937' }}>{bookingId}</div>
              </div>
              {selectedFlight && (
                <>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Flight</div>
                    <div style={{ fontWeight: '700', color: '#1f2937' }}>{selectedFlight.airline.name} {selectedFlight.flightNumber}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Route</div>
                    <div style={{ fontWeight: '700', color: '#1f2937' }}>{selectedFlight.route.from} → {selectedFlight.route.to}</div>
                  </div>
                </>
              )}
              <div>
                <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Total Amount</div>
                <div style={{ fontWeight: '900', color: '#1d4ed8', fontSize: '20px' }}>${totalAmount}</div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px' }}>Passenger Details</div>
              {passengers.map((passenger, index) => (
                <div key={passenger.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span>{passenger.title} {passenger.firstName} {passenger.lastName}</span>
                  <span style={{ fontWeight: '600' }}>Seat: {selectedSeats[index] || 'Not assigned'}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '50px' }}>
            <button
              className="btn-primary"
              onClick={() => {
                setCurrentStep(1);
                setSelectedSeats([]);
                setSelectedFlight(null);
              }}
              style={{ marginRight: '20px', padding: '15px 40px' }}
            >
              <i className="fas fa-plus"></i> New Booking
            </button>
            <button
              className="btn-outline"
              onClick={onClose}
              style={{ padding: '15px 30px' }}
            >
              <i className="fas fa-home"></i> Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="booking-modal active" id="bookingModal">
      <button className="close-booking-btn" id="closeBookingModal" onClick={onClose}>✕ Close</button>
      <div className="booking-container" id="bookingContainer">
        <div className="booking-header">
          <div className="booking-header-content">
            <nav className="w-full flex items-center justify-between shadow-sm flex-wrap">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-px bg-black rotate-45 translate-y-2"></div>
                  <div className="w-8 h-px bg-black -rotate-45"></div>
                  <div className="w-4 h-4 rounded-full border border-black -mt-2"></div>
                </div>
                <h1 className="text-xl font-bold tracking-tight">GURKHAS<span className="font-black">TRAVEL</span></h1>
              </div>
            </nav>
          </div>
        </div>

        <div className="booking-main-content">
          <div className="progress-bar">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Search & Select</div>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Passenger Details</div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Seat Selection</div>
            </div>
            <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-label">Payment</div>
            </div>
            <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>
              <div className="step-number">5</div>
              <div className="step-label">Confirmation</div>
            </div>
            <div className="progress-line"></div>
            <div className="progress-line-filled" style={{ width: `${(currentStep - 1) * 25}%` }}></div>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;