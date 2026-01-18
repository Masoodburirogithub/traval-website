// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Flight {
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
  stopCity?: string;
  price: number;
  businessPrice: number;
  firstClassPrice: number;
  seats: number;
  aircraft: string;
  amenities: string[];
  baggage: {
    carryOn: string;
    checked: string;
  };
  features: string[];
  departureDate: string;
  arrivalDate: string;
  gate: string;
  terminal: string;
}

export interface Passenger {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  passport: string;
  seat: string;
  mealPreference: string;
}

export interface Booking {
  id: string;
  pnr: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  flight: Flight;
  passengers: Passenger[];
  totalAmount: number;
  bookingDate: string;
  travelDate: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  seatNumbers: string[];
  mealPreferences: string[];
  flightClass: string;
}

export interface SearchCriteria {
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}