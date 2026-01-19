'use client';

import React, { useState, useEffect } from 'react';

interface SearchCriteria {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  cabinClass: string;
}

interface BookingModalProps {
  onClose: () => void;
  searchCriteria: SearchCriteria;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose, searchCriteria }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState(parseInt(searchCriteria.passengers) || 1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // This matches your original HTML structure EXACTLY
  const renderOriginalBookingModal = () => {
    return (
      <div className="booking-modal active" id="bookingModal">
        <button className="close-booking-btn" id="closeBookingModal" onClick={onClose}>✕ Close</button>
        <div className="booking-container" id="bookingContainer">
          {/* Header - Matches your original */}
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

          {/* Main Content - Matches your original */}
          <div className="booking-main-content">
            {/* Progress Bar - Exactly as in your HTML */}
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
              <div className="progress-line-filled" style={{ width: `${(currentStep - 1) * 20}%` }}></div>
            </div>

            {/* STEP 1: Flight Selection - Matching your original */}
            {currentStep === 1 && (
              <div className="booking-card">
                <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
                  <i className="fas fa-plane"></i> Available Flights
                </h2>
                
                <div style={{ color: '#6b7280', marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
                  <strong>Search Criteria:</strong> {searchCriteria.from || 'Sydney'} to {searchCriteria.to || 'London'} • {searchCriteria.passengers} passenger{parseInt(searchCriteria.passengers) > 1 ? 's' : ''} • {searchCriteria.cabinClass}
                </div>
                
                {/* Flight Cards - Matching your original */}
                {[1, 2, 3].map((flight) => (
                  <div key={flight} className="flight-card">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#e4000020', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e40000', fontSize: '24px' }}>
                          <i className="fas fa-plane"></i>
                        </div>
                        <div>
                          <h3 style={{ color: '#1d4ed8', marginBottom: '5px', fontSize: '20px' }}>Qantas Airways</h3>
                          <div style={{ color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>QF{200 + flight}</span>
                            <span>•</span>
                            <span>Boeing 787 Dreamliner</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '15px' }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>08:30</div>
                          <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>SYD</div>
                        </div>
                        <div style={{ flex: 2, textAlign: 'center' }}>
                          <div style={{ color: '#6b7280', marginBottom: '10px', fontSize: '14px' }}>22h 30m</div>
                          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, #3b82f6, #93c5fd)' }}></div>
                            <i className="fas fa-plane" style={{ margin: '0 10px', color: '#3b82f6', fontSize: '16px', transform: 'rotate(45deg)' }}></i>
                            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, #93c5fd, #3b82f6)' }}></div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937' }}>07:00</div>
                          <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>LHR</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        {['WiFi', 'Entertainment', 'Meal'].map((feature) => (
                          <span key={feature} style={{ background: '#e5e7eb', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fas fa-check" style={{ color: '#10b981' }}></i> {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', minWidth: '200px', borderLeft: '2px solid #e5e7eb', paddingLeft: '20px' }}>
                      <div style={{ fontSize: '32px', fontWeight: '900', color: '#1d4ed8', marginBottom: '10px' }}>
                        $850
                      </div>
                      <div style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
                        $1700 total for 2 passengers
                      </div>
                      <button 
                        className="btn-primary select-flight-btn"
                        onClick={() => setCurrentStep(2)}
                        style={{ padding: '12px 30px' }}
                      >
                        <i className="fas fa-check"></i> Select Flight
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 2: Passenger Details */}
            {currentStep === 2 && (
              <div className="booking-card">
                <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
                  <i className="fas fa-users"></i> Passenger Details ({passengers} passenger{passengers > 1 ? 's' : ''})
                </h2>
                
                <form id="passengerDetailsForm">
                  {Array.from({ length: passengers }, (_, i) => i + 1).map((passenger) => (
                    <div key={passenger} className="passenger-section">
                      <h3 style={{ color: '#1d4ed8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-user"></i> Passenger {passenger}
                      </h3>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Title</label>
                          <select className="passenger-title" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Date of Birth</label>
                          <input type="date" className="passenger-dob" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>First Name</label>
                          <input type="text" className="passenger-firstname" placeholder="First name" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Last Name</label>
                          <input type="text" className="passenger-lastname" placeholder="Last name" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Passport Number</label>
                          <input type="text" className="passenger-passport" placeholder="Passport number" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4b5563' }}>Meal Preference</label>
                          <select className="passenger-meal" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                            <option value="Standard">Standard</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
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
                      onClick={() => setCurrentStep(3)}
                      style={{ padding: '12px 30px' }}
                    >
                      Continue to Seat Selection <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: Seat Selection */}
            {currentStep === 3 && (
              <div className="booking-card">
                <h2 style={{ color: '#1d4ed8', marginBottom: '30px', fontSize: '24px' }}>
                  <i className="fas fa-chair"></i> Seat Selection
                </h2>
                
                <div style={{ color: '#6b7280', marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
                  <strong>Select {passengers} seat{passengers > 1 ? 's' : ''} for all passengers</strong>
                </div>
                
                <div className="seat-map">
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h3 style={{ color: '#1d4ed8', marginBottom: '10px' }}>Boeing 787 Dreamliner</h3>
                    <div style={{ color: '#6b7280' }}>Choose your preferred seats</div>
                  </div>
                  
                  {/* Seat Map - Exactly as in your HTML */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                    <div key={row} className="seat-row">
                      {['A', 'B', 'C', 'D', 'E', 'F'].map((seat) => {
                        const seatId = `${row}${seat}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isOccupied = Math.random() < 0.3;
                        
                        return (
                          <div
                            key={seat}
                            className={`seat ${isSelected ? 'selected' : isOccupied ? 'occupied' : 'available'}`}
                            data-seat={seatId}
                            onClick={() => {
                              if (!isOccupied) {
                                if (isSelected) {
                                  setSelectedSeats(prev => prev.filter(s => s !== seatId));
                                } else if (selectedSeats.length < passengers) {
                                  setSelectedSeats(prev => [...prev, seatId]);
                                }
                              }
                            }}
                          >
                            {seatId}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  
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
                      if (selectedSeats.length === passengers) {
                        setCurrentStep(4);
                      } else {
                        alert(`Please select ${passengers} seat${passengers > 1 ? 's' : ''}`);
                      }
                    }}
                    style={{ padding: '12px 30px' }}
                    disabled={selectedSeats.length !== passengers}
                  >
                    Continue to Payment <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment */}
            {currentStep === 4 && (
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Flight</span>
                        <span style={{ fontWeight: '600' }}>Qantas Airways QF202</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Route</span>
                        <span>{searchCriteria.from || 'Sydney'} → {searchCriteria.to || 'London'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Passengers</span>
                        <span style={{ fontWeight: '600' }}>{passengers} x $850</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Taxes & Fees</span>
                        <span style={{ fontWeight: '600' }}>$240</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '900', color: '#1d4ed8', marginTop: '20px' }}>
                        <span>Total Amount</span>
                        <span>${(passengers * 850) + 240}</span>
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
                    onClick={() => setCurrentStep(5)}
                    style={{ padding: '12px 30px' }}
                  >
                    <i className="fas fa-lock"></i> Pay ${(passengers * 850) + 240}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Confirmation */}
            {currentStep === 5 && (
              <div className="booking-card" style={{ textAlign: 'center' }}>
                <div className="booking-confirmation">
                  <i className="fas fa-check-circle confirmation-icon"></i>
                  <h1 style={{ color: '#1d4ed8', marginBottom: '20px', fontSize: '36px' }}>Booking Confirmed!</h1>
                  <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '30px' }}>
                    Your booking has been successfully processed. Details have been sent to your email.
                  </p>
                  
                  <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', color: 'white', padding: '20px 40px', borderRadius: '15px', display: 'inline-block', margin: '30px 0', boxShadow: '0 8px 25px rgba(29, 78, 216, 0.3)' }}>
                    <div style={{ fontSize: '14px', opacity: '0.9', letterSpacing: '2px', marginBottom: '10px' }}>BOOKING REFERENCE</div>
                    <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '3px' }}>ABC123</div>
                  </div>
                  
                  <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'left', background: '#f8fafc', padding: '30px', borderRadius: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div>
                        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Booking ID</div>
                        <div style={{ fontWeight: '700', color: '#1f2937' }}>GTRV001</div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Flight</div>
                        <div style={{ fontWeight: '700', color: '#1f2937' }}>Qantas Airways QF202</div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Route</div>
                        <div style={{ fontWeight: '700', color: '#1f2937' }}>{searchCriteria.from || 'Sydney'} → {searchCriteria.to || 'London'}</div>
                      </div>
                      <div>
                        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>Total Amount</div>
                        <div style={{ fontWeight: '900', color: '#1d4ed8', fontSize: '20px' }}>${(passengers * 850) + 240}</div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px' }}>Passenger Details</div>
                      {selectedSeats.map((seat, index) => (
                        <div key={seat} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                          <span>Passenger {index + 1}</span>
                          <span style={{ fontWeight: '600' }}>Seat: {seat}</span>
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
                        setBookingConfirmed(false);
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
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderOriginalBookingModal();
};

export default BookingModal;