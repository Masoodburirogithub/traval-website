// app/admin/page.tsx - Professional Sidebar Admin Dashboard
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Types
interface Booking {
  id: string;
  customer: string;
  email: string;
  flight: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  date: string;
  passengers: number;
  class: string;
  airline: string;
  route: string;
  departure: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  bookings: number;
  spent: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
  status: 'active' | 'inactive';
  avatar: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeUsers: number;
  conversionRate: number;
  averageBookingValue: number;
  loadFactor: number;
  todayRevenue: number;
  todayBookings: number;
  pendingBookings: number;
  completedTrips: number;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'booking' | 'user'>('booking');
  const [exportType, setExportType] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Dynamic states
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 2458000,
    totalBookings: 1245,
    activeUsers: 587,
    conversionRate: 18.7,
    averageBookingValue: 1975,
    loadFactor: 82.3,
    todayRevenue: 45200,
    todayBookings: 28,
    pendingBookings: 45,
    completedTrips: 987
  });

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'GT-2024-001', customer: 'Alex Johnson', email: 'alex@email.com', flight: 'QF101 SYD-LHR', amount: 3250, status: 'confirmed', date: '2024-03-15', passengers: 2, class: 'Business', airline: 'Qantas', route: 'SYD → LHR', departure: '08:30 AM' },
    { id: 'GT-2024-002', customer: 'Sarah Miller', email: 'sarah@email.com', flight: 'VA245 MEL-LAX', amount: 1850, status: 'pending', date: '2024-03-14', passengers: 1, class: 'Economy', airline: 'Virgin', route: 'MEL → LAX', departure: '10:15 AM' },
    { id: 'GT-2024-003', customer: 'Michael Chen', email: 'michael@email.com', flight: 'SQ789 BNE-SIN', amount: 4200, status: 'confirmed', date: '2024-03-14', passengers: 3, class: 'First', airline: 'Singapore', route: 'BNE → SIN', departure: '02:45 PM' },
    { id: 'GT-2024-004', customer: 'Emma Wilson', email: 'emma@email.com', flight: 'EK404 SYD-DXB', amount: 2750, status: 'completed', date: '2024-03-13', passengers: 2, class: 'Business', airline: 'Emirates', route: 'SYD → DXB', departure: '09:00 PM' },
    { id: 'GT-2024-005', customer: 'Robert Kim', email: 'robert@email.com', flight: 'AA505 SYD-JFK', amount: 5100, status: 'cancelled', date: '2024-03-12', passengers: 4, class: 'Premium', airline: 'American', route: 'SYD → JFK', departure: '11:30 AM' },
    { id: 'GT-2024-006', customer: 'Lisa Patel', email: 'lisa@email.com', flight: 'NZ201 MEL-AKL', amount: 1250, status: 'confirmed', date: '2024-03-11', passengers: 1, class: 'Economy', airline: 'Air NZ', route: 'MEL → AKL', departure: '07:45 AM' },
    { id: 'GT-2024-007', customer: 'David Brown', email: 'david@email.com', flight: 'QF789 SYD-SIN', amount: 1950, status: 'pending', date: '2024-03-10', passengers: 2, class: 'Premium', airline: 'Qantas', route: 'SYD → SIN', departure: '01:20 PM' },
    { id: 'GT-2024-008', customer: 'Sophia Garcia', email: 'sophia@email.com', flight: 'VA321 BNE-MEL', amount: 850, status: 'completed', date: '2024-03-09', passengers: 1, class: 'Economy', airline: 'Virgin', route: 'BNE → MEL', departure: '08:00 AM' },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 'USR-001', name: 'Alex Johnson', email: 'alex@email.com', phone: '+61 412 345 678', joinDate: '2023-12-15', bookings: 12, spent: 32500, tier: 'Gold', status: 'active', avatar: 'AJ' },
    { id: 'USR-002', name: 'Sarah Miller', email: 'sarah@email.com', phone: '+61 423 456 789', joinDate: '2024-01-05', bookings: 5, spent: 9200, tier: 'Silver', status: 'active', avatar: 'SM' },
    { id: 'USR-003', name: 'Michael Chen', email: 'michael@email.com', phone: '+61 434 567 890', joinDate: '2023-11-20', bookings: 18, spent: 45200, tier: 'Gold', status: 'active', avatar: 'MC' },
    { id: 'USR-004', name: 'Emma Wilson', email: 'emma@email.com', phone: '+61 445 678 901', joinDate: '2024-02-10', bookings: 3, spent: 8250, tier: 'Bronze', status: 'active', avatar: 'EW' },
    { id: 'USR-005', name: 'Robert Kim', email: 'robert@email.com', phone: '+61 456 789 012', joinDate: '2023-10-30', bookings: 22, spent: 61200, tier: 'Gold', status: 'inactive', avatar: 'RK' },
    { id: 'USR-006', name: 'Lisa Patel', email: 'lisa@email.com', phone: '+61 467 890 123', joinDate: '2024-01-25', bookings: 7, spent: 15400, tier: 'Silver', status: 'active', avatar: 'LP' },
    { id: 'USR-007', name: 'David Brown', email: 'david@email.com', phone: '+61 478 901 234', joinDate: '2023-09-15', bookings: 15, spent: 38750, tier: 'Gold', status: 'active', avatar: 'DB' },
    { id: 'USR-008', name: 'Sophia Garcia', email: 'sophia@email.com', phone: '+61 489 012 345', joinDate: '2024-02-28', bookings: 2, spent: 4250, tier: 'Bronze', status: 'active', avatar: 'SG' },
  ]);

  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { month: 'Jan', revenue: 412500, bookings: 245 },
    { month: 'Feb', revenue: 387200, bookings: 198 },
    { month: 'Mar', revenue: 456800, bookings: 245 },
    { month: 'Apr', revenue: 398100, bookings: 187 },
    { month: 'May', revenue: 512300, bookings: 265 },
    { month: 'Jun', revenue: 478900, bookings: 234 },
  ]);

  const [topRoutes, setTopRoutes] = useState([
    { route: 'SYD → LHR', bookings: 245, revenue: 512000, growth: '+12%', airline: 'Qantas', color: 'bg-blue-500' },
    { route: 'MEL → LAX', bookings: 198, revenue: 387000, growth: '+8%', airline: 'Virgin', color: 'bg-pink-500' },
    { route: 'BNE → SIN', bookings: 176, revenue: 264000, growth: '+15%', airline: 'Singapore', color: 'bg-purple-500' },
    { route: 'SYD → DXB', bookings: 154, revenue: 385000, growth: '+5%', airline: 'Emirates', color: 'bg-red-500' },
    { route: 'PER → LHR', bookings: 132, revenue: 396000, growth: '+18%', airline: 'Qantas', color: 'bg-green-500' },
  ]);

  const [newBooking, setNewBooking] = useState({
    customer: '',
    email: '',
    flight: '',
    amount: '',
    status: 'pending' as Booking['status'],
    passengers: '1',
    class: 'economy',
    airline: 'Qantas',
    route: '',
    departure: ''
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Silver' as User['tier']
  });

  // Notification system
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Sidebar navigation items
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '🏠', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'bookings', label: 'Bookings', icon: '✈️', color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'users', label: 'Users', icon: '👥', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'flights', label: 'Flights', icon: '🛫', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'reports', label: 'Reports', icon: '📊', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'analytics', label: 'Analytics', icon: '📈', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { id: 'settings', label: 'Settings', icon: '⚙️', color: 'text-gray-600', bgColor: 'bg-gray-50' },
  ];

  // Dynamic data updates
  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('adminLoggedIn');
      if (adminStatus === 'true') {
        setIsAdmin(true);
      }
      setIsLoading(false);
    };
    
    checkAdmin();
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayRevenue: prev.todayRevenue + Math.floor(Math.random() * 1000),
        todayBookings: prev.todayBookings + Math.floor(Math.random() * 3),
        totalBookings: prev.totalBookings + Math.floor(Math.random() * 2),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 1),
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateRevenueData = () => {
      let data: RevenueData[] = [];
      const now = new Date();
      
      switch(timeRange) {
        case 'today':
          data = Array.from({ length: 24 }, (_, i) => ({
            month: `${i}:00`,
            revenue: Math.floor(Math.random() * 20000) + 5000,
            bookings: Math.floor(Math.random() * 15) + 5
          }));
          break;
        case 'week':
          data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
            month: day,
            revenue: Math.floor(Math.random() * 100000) + 30000,
            bookings: Math.floor(Math.random() * 50) + 20
          }));
          break;
        case 'month':
          data = Array.from({ length: 30 }, (_, i) => {
            const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
            return {
              month: date.getDate().toString(),
              revenue: Math.floor(Math.random() * 30000) + 10000,
              bookings: Math.floor(Math.random() * 20) + 5
            };
          });
          break;
        case 'year':
          data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
            month,
            revenue: Math.floor(Math.random() * 500000) + 200000,
            bookings: Math.floor(Math.random() * 300) + 100
          }));
          break;
      }
      
      setRevenueData(data);
    };
    
    updateRevenueData();
  }, [timeRange]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminLoggedIn', 'true');
    setIsAdmin(true);
    showNotification('Admin login successful!', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdmin(false);
    showNotification('Logged out successfully', 'info');
    router.push('/');
  };

  const handleExport = () => {
    showNotification(`Exporting data as ${exportType.toUpperCase()}...`, 'info');
    setTimeout(() => {
      showNotification(`Report exported successfully as ${exportType.toUpperCase()}!`, 'success');
      setShowExportModal(false);
    }, 1500);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
    showNotification(`Booking ${id} status updated to ${status}`, 'success');
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    showNotification(`Booking ${id} deleted successfully`, 'success');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    showNotification(`User ${id} deleted successfully`, 'success');
  };

  const handleAddBooking = () => {
    if (!newBooking.customer || !newBooking.email || !newBooking.amount) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const newId = `GT-${new Date().getFullYear()}-${String(bookings.length + 1).padStart(3, '0')}`;
    const newBookingObj: Booking = {
      id: newId,
      customer: newBooking.customer,
      email: newBooking.email,
      flight: newBooking.flight || 'Custom Flight',
      amount: parseFloat(newBooking.amount),
      status: newBooking.status,
      date: new Date().toISOString().split('T')[0],
      passengers: parseInt(newBooking.passengers),
      class: newBooking.class,
      airline: newBooking.airline,
      route: newBooking.route || 'Custom Route',
      departure: newBooking.departure || 'TBD'
    };
    
    setBookings(prev => [newBookingObj, ...prev]);
    
    setStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + newBookingObj.amount,
      totalBookings: prev.totalBookings + 1,
      todayRevenue: prev.todayRevenue + newBookingObj.amount,
      todayBookings: prev.todayBookings + 1,
      averageBookingValue: (prev.totalRevenue + newBookingObj.amount) / (prev.totalBookings + 1)
    }));
    
    setNewBooking({
      customer: '',
      email: '',
      flight: '',
      amount: '',
      status: 'pending',
      passengers: '1',
      class: 'economy',
      airline: 'Qantas',
      route: '',
      departure: ''
    });
    
    setShowAddModal(false);
    showNotification(`New booking ${newId} added successfully!`, 'success');
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const newId = `USR-${String(users.length + 1).padStart(3, '0')}`;
    const newUserObj: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      joinDate: new Date().toISOString().split('T')[0],
      bookings: 0,
      spent: 0,
      tier: newUser.tier,
      status: 'active',
      avatar: newUser.name.split(' ').map(n => n[0]).join('')
    };
    
    setUsers(prev => [newUserObj, ...prev]);
    
    setStats(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + 1
    }));
    
    setNewUser({
      name: '',
      email: '',
      phone: '',
      tier: 'Silver'
    });
    
    setShowAddModal(false);
    showNotification(`New user ${newId} added successfully!`, 'success');
  };

  // Chart components
  const RevenueChart = () => {
    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
    const maxBookings = Math.max(...revenueData.map(d => d.bookings));
    
    return (
      <div className="h-full">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <span className="text-sm text-gray-600">Bookings</span>
          </div>
        </div>
        
        <div className="h-48 md:h-56 lg:h-64 flex items-end space-x-1 md:space-x-2 overflow-x-auto pb-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex-1 min-w-[40px] md:min-w-[50px] flex flex-col items-center">
              <div className="flex items-end space-x-1 w-full">
                <div
                  className="flex-1 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t transition-all duration-300 hover:from-orange-600 hover:to-orange-400 cursor-pointer"
                  style={{ height: `${(item.revenue / maxRevenue) * 90}%` }}
                  title={`Revenue: $${item.revenue.toLocaleString()}`}
                  onClick={() => showNotification(`Revenue for ${item.month}: $${item.revenue.toLocaleString()}`, 'info')}
                ></div>
                <div
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-400 cursor-pointer"
                  style={{ height: `${(item.bookings / maxBookings) * 90}%` }}
                  title={`Bookings: ${item.bookings}`}
                  onClick={() => showNotification(`Bookings for ${item.month}: ${item.bookings}`, 'info')}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-2 font-medium truncate w-full text-center">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BookingStatusChart = () => {
    const statusCount = {
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
    
    const total = bookings.length;
    const percentages = {
      confirmed: ((statusCount.confirmed / total) * 100).toFixed(0),
      pending: ((statusCount.pending / total) * 100).toFixed(0),
      completed: ((statusCount.completed / total) * 100).toFixed(0),
      cancelled: ((statusCount.cancelled / total) * 100).toFixed(0),
    };
    
    return (
      <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        <div className="relative w-40 h-40 cursor-pointer" onClick={() => showNotification(`Total bookings: ${total}`, 'info')}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 border-12 border-transparent rounded-full border-t-orange-500 border-r-blue-500 border-b-purple-500 border-l-green-500"></div>
            <div className="absolute inset-0 border-12 border-transparent rounded-full border-t-transparent border-r-transparent border-b-transparent border-l-green-500" style={{ transform: 'rotate(90deg)' }}></div>
            <div className="absolute inset-0 border-12 border-transparent rounded-full border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent" style={{ transform: 'rotate(180deg)' }}></div>
            <div className="absolute inset-0 border-12 border-transparent rounded-full border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent" style={{ transform: 'rotate(270deg)' }}></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 w-full lg:w-auto">
          {[
            { color: 'bg-orange-500', label: 'Confirmed', value: statusCount.confirmed, percent: percentages.confirmed },
            { color: 'bg-blue-500', label: 'Pending', value: statusCount.pending, percent: percentages.pending },
            { color: 'bg-green-500', label: 'Completed', value: statusCount.completed, percent: percentages.completed },
            { color: 'bg-purple-500', label: 'Cancelled', value: statusCount.cancelled, percent: percentages.cancelled },
          ].map((item, index) => (
            <div key={index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                 onClick={() => showNotification(`${item.label}: ${item.value} bookings (${item.percent}%)`, 'info')}>
              <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 truncate">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900 ml-2">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className={`${item.color} h-1.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleViewDetails = (type: 'booking' | 'user', id: string) => {
    if (type === 'booking') {
      const booking = bookings.find(b => b.id === id);
      setSelectedBooking(booking || null);
      showNotification(`Viewing details for booking ${id}`, 'info');
    } else {
      const user = users.find(u => u.id === id);
      setSelectedUser(user || null);
      showNotification(`Viewing details for user ${id}`, 'info');
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.flight.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading Admin Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-px bg-white rotate-45 translate-y-2"></div>
                  <div className="w-8 h-px bg-white -rotate-45"></div>
                  <div className="w-4 h-4 rounded-full border border-white -mt-2"></div>
                </div>
                <h1 className="text-2xl font-bold text-white">GURKHAS<span className="font-black">TRAVEL</span></h1>
              </div>
              <h2 className="text-xl font-semibold text-white">Admin Portal</h2>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleLogin}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        defaultValue="admin"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="password"
                        defaultValue="admin123"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login to Admin Dashboard</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Return to Homepage</span>
                  </button>
                </div>
              </form>
              
              <p className="text-xs text-gray-500 text-center mt-6">
                Demo credentials: admin / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main content based on active tab
  const renderMainContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            {/* Quick Stats Bar */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">Welcome back! Here's what's happening with your business today.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 hidden md:block">Period:</span>
                  <div className="flex bg-white border border-gray-300 rounded-lg p-1 overflow-x-auto">
                    {['today', 'week', 'month', 'year'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range as any)}
                        className={`px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition capitalize whitespace-nowrap ${
                          timeRange === range 
                            ? 'bg-orange-500 text-white' 
                            : 'text-gray-600 hover:text-orange-600'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  {
                    title: 'Total Revenue',
                    value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`,
                    change: '+12.5%',
                    changeType: 'increase',
                    icon: '💰',
                    color: 'from-green-500 to-emerald-600',
                    today: `$${stats.todayRevenue.toLocaleString()}`
                  },
                  {
                    title: 'Total Bookings',
                    value: stats.totalBookings.toLocaleString(),
                    change: '+8.3%',
                    changeType: 'increase',
                    icon: '✈️',
                    color: 'from-blue-500 to-cyan-600',
                    today: `${stats.todayBookings} bookings`
                  },
                  {
                    title: 'Active Users',
                    value: stats.activeUsers.toLocaleString(),
                    change: '+5.7%',
                    changeType: 'increase',
                    icon: '👥',
                    color: 'from-purple-500 to-pink-600',
                    today: `${stats.conversionRate}% conversion`
                  },
                  {
                    title: 'Pending Bookings',
                    value: stats.pendingBookings.toString(),
                    change: '-2.1%',
                    changeType: 'decrease',
                    icon: '⏳',
                    color: 'from-orange-500 to-red-600',
                    today: `${stats.completedTrips} completed`
                  }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => showNotification(`${stat.title}: ${stat.value} (${stat.change} from last month)`, 'info')}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-500 text-sm font-medium truncate">{stat.title}</p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                        <div className={`flex items-center text-sm mt-2 ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.changeType === 'increase' ? (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          )}
                          <span>{stat.change} from last month</span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center flex-shrink-0 ml-4 text-xl`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Today:</span>
                        <span className="font-semibold truncate ml-2">{stat.today}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                    <p className="text-sm text-gray-600">Monthly revenue and booking trends</p>
                  </div>
                  <button 
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition self-start md:self-auto"
                  >
                    Export
                  </button>
                </div>
                <div className="h-64 md:h-72">
                  <RevenueChart />
                </div>
              </div>

              {/* Booking Stats */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Booking Status</h3>
                    <p className="text-sm text-gray-600">Distribution by current status</p>
                  </div>
                  <select className="border rounded-lg px-3 py-2 text-sm self-start md:self-auto">
                    <option>All Time</option>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-64 md:h-72">
                  <BookingStatusChart />
                </div>
              </div>
            </div>

            {/* Top Routes & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Top Routes */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Top Routes</h3>
                    <p className="text-sm text-gray-600">Most popular flight routes</p>
                  </div>
                  <button className="px-4 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition self-start md:self-auto">
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {topRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                         onClick={() => showNotification(`${route.route}: ${route.bookings} bookings, $${route.revenue.toLocaleString()} revenue (${route.growth})`, 'info')}>
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-8 h-8 rounded-full ${route.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                          {route.airline.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-800 truncate">{route.route}</div>
                          <div className="text-xs text-gray-500 truncate">{route.airline}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="font-bold text-gray-800">${(route.revenue / 1000).toFixed(0)}K</div>
                        <div className={`text-xs ${route.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {route.growth}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                    <p className="text-sm text-gray-600">Latest system activities</p>
                  </div>
                  <button className="px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium self-start md:self-auto">
                    View All →
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { action: 'New booking added', user: 'GT-2024-009', time: '2 mins ago', type: 'booking', color: 'bg-blue-100 text-blue-600' },
                    { action: 'User registration', user: 'Sarah Johnson', time: '15 mins ago', type: 'user', color: 'bg-green-100 text-green-600' },
                    { action: 'Payment processed', user: 'GT-2024-004', time: '30 mins ago', type: 'payment', color: 'bg-purple-100 text-purple-600' },
                    { action: 'Booking cancelled', user: 'GT-2024-005', time: '1 hour ago', type: 'cancellation', color: 'bg-red-100 text-red-600' },
                    { action: 'New user tier upgrade', user: 'Michael Chen', time: '2 hours ago', type: 'upgrade', color: 'bg-yellow-100 text-yellow-600' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                         onClick={() => showNotification(`${activity.action}: ${activity.user} (${activity.time})`, 'info')}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                        {activity.type === 'booking' && '📝'}
                        {activity.type === 'user' && '👤'}
                        {activity.type === 'payment' && '💰'}
                        {activity.type === 'cancellation' && '❌'}
                        {activity.type === 'upgrade' && '⬆️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800">{activity.action}</div>
                        <div className="text-sm text-gray-600 truncate">{activity.user} • {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Bookings Management</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Manage and track all flight bookings</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-full"
                  />
                </div>
                <button 
                  onClick={() => {
                    setModalType('booking');
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition"
                >
                  + Add Booking
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Flight Details</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{booking.id}</div>
                        <div className="text-xs text-gray-500">{booking.date}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-xs text-gray-500">{booking.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{booking.route}</div>
                        <div className="text-xs text-gray-500">{booking.airline} • {booking.departure}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-800">${booking.amount}</div>
                        <div className="text-xs text-gray-500">{booking.passengers} pax • {booking.class}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{booking.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewDetails('booking', booking.id)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg font-medium hover:bg-green-200 transition"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Users Management</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Manage customer accounts and information</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-full"
                  />
                </div>
                <button 
                  onClick={() => {
                    setModalType('user');
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition"
                >
                  + Add User
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Bookings</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Spent</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tier</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{user.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">Joined: {user.joinDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500">{user.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{user.bookings}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-800">${user.spent.toLocaleString()}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                          user.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {user.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewDetails('user', user.id)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => deleteUser(user.id)}
                            className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'flights':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Flights Management</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Manage flight schedules and routes</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition">
                + Add Flight
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topRoutes.map((route, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition cursor-pointer"
                     onClick={() => showNotification(`${route.route}: ${route.bookings} bookings, $${route.revenue.toLocaleString()} revenue`, 'info')}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 rounded-full ${route.color} flex items-center justify-center text-white`}>
                          ✈️
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{route.route}</h3>
                          <p className="text-sm text-gray-600">{route.airline} Airlines</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Bookings</p>
                          <p className="text-xl font-bold text-gray-800">{route.bookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="text-xl font-bold text-gray-800">${(route.revenue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${route.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {route.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Analytics Reports</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Generate detailed business reports</p>
              </div>
              <button 
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition"
              >
                Generate Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Monthly Revenue', value: '$412.5K', change: '+12.5%', icon: '📈', color: 'bg-green-50 text-green-600', description: 'Total monthly revenue generated' },
                { title: 'Customer Growth', value: '+87 users', change: '+8.3%', icon: '👥', color: 'bg-blue-50 text-blue-600', description: 'New customer registrations' },
                { title: 'Booking Volume', value: '1,245', change: '+15.2%', icon: '✈️', color: 'bg-purple-50 text-purple-600', description: 'Total bookings this month' },
                { title: 'Avg. Revenue/User', value: '$1,975', change: '+3.2%', icon: '💰', color: 'bg-orange-50 text-orange-600', description: 'Average revenue per customer' },
                { title: 'Cancellation Rate', value: '4.2%', change: '-1.5%', icon: '📉', color: 'bg-red-50 text-red-600', description: 'Booking cancellation rate' },
                { title: 'Customer Satisfaction', value: '94%', change: '+2.1%', icon: '⭐', color: 'bg-yellow-50 text-yellow-600', description: 'Customer satisfaction score' },
              ].map((report, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition cursor-pointer"
                     onClick={() => showNotification(`${report.title}: ${report.value} (${report.change}) - ${report.description}`, 'info')}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 ${report.color}`}>
                        {report.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800">{report.title}</h4>
                      <p className="text-2xl font-bold text-gray-800 mt-2">{report.value}</p>
                      <p className="text-sm text-gray-600 mt-2">{report.description}</p>
                    </div>
                    <span className={`text-sm font-medium ${report.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {report.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Advanced Analytics</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Deep insights and performance metrics</p>
              </div>
              <button 
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Export Data
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Conversion Rate', value: `${stats.conversionRate}%`, progress: stats.conversionRate, color: 'bg-green-500' },
                      { label: 'Load Factor', value: `${stats.loadFactor}%`, progress: stats.loadFactor, color: 'bg-blue-500' },
                      { label: 'Customer Retention', value: '92%', progress: 92, color: 'bg-purple-500' },
                      { label: 'Avg. Response Time', value: '2.4 hrs', progress: 80, color: 'bg-orange-500' },
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{metric.label}</span>
                          <span className="font-medium">{metric.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${metric.color} h-2 rounded-full`}
                            style={{ width: `${metric.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Flight Bookings', value: '$1,845,200', percentage: '75%', color: 'bg-blue-500' },
                      { label: 'Hotel Packages', value: '$368,400', percentage: '15%', color: 'bg-green-500' },
                      { label: 'Car Rentals', value: '$245,600', percentage: '10%', color: 'bg-purple-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <div className="text-sm text-gray-600">{item.percentage}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Admin Settings</h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your dashboard preferences</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Enable Email Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Enable Real-time Updates</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Auto-refresh Data</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">System Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Version</span>
                      <span className="font-medium">v2.1.4</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="font-medium">2024-03-15</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Bookings</span>
                      <span className="font-medium">{stats.totalBookings}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-medium">{stats.activeUsers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg animate-fadeIn ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-px bg-black rotate-45 translate-y-2"></div>
                <div className="w-6 h-px bg-black -rotate-45"></div>
                <div className="w-3 h-3 rounded-full border border-black -mt-2"></div>
              </div>
              <h1 className="text-lg font-bold tracking-tight">GURKHAS<span className="font-black">TRAVEL</span></h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30 flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-px bg-black rotate-45 translate-y-2"></div>
              <div className="w-8 h-px bg-black -rotate-45"></div>
              <div className="w-4 h-4 rounded-full border border-black -mt-2"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">GURKHAS<span className="font-black">TRAVEL</span></h1>
              <p className="text-xs text-gray-600 -mt-1">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? `${item.bgColor} ${item.color} font-semibold shadow-sm` 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-current"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Quick Stats in Sidebar */}
          <div className="mt-8 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <h3 className="font-medium text-gray-800 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today's Revenue</span>
                <span className="font-semibold">${stats.todayRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="font-semibold">{stats.activeUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Bookings</span>
                <span className="font-semibold">{stats.pendingBookings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarCollapsed ? 'Expand' : 'Collapse'} Sidebar
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-px bg-black rotate-45 translate-y-2"></div>
                    <div className="w-8 h-px bg-black -rotate-45"></div>
                    <div className="w-4 h-4 rounded-full border border-black -mt-2"></div>
                  </div>
                  <h1 className="text-lg font-bold">Admin</h1>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id 
                        ? `${item.bgColor} ${item.color} font-semibold` 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`lg:pl-64 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : ''}`}>
        <div className="p-4 md:p-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                {activeTab === 'overview' ? 'Dashboard Overview' : 
                 activeTab === 'bookings' ? 'Bookings Management' :
                 activeTab === 'users' ? 'Users Management' :
                 activeTab === 'flights' ? 'Flights Management' :
                 activeTab === 'reports' ? 'Analytics Reports' :
                 activeTab === 'analytics' ? 'Advanced Analytics' :
                 'Admin Settings'}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === 'overview' ? 'Welcome back! Here\'s what\'s happening with your business today.' :
                 activeTab === 'bookings' ? 'Manage and track all flight bookings and reservations.' :
                 activeTab === 'users' ? 'Manage customer accounts, profiles, and preferences.' :
                 activeTab === 'flights' ? 'View and manage flight schedules, routes, and availability.' :
                 activeTab === 'reports' ? 'Generate detailed business reports and analytics.' :
                 activeTab === 'analytics' ? 'Deep insights and performance metrics for your business.' :
                 'Configure your dashboard settings and preferences.'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-64"
                />
              </div>
              
              <button
                onClick={() => {
                  setModalType('booking');
                  setShowAddModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-200"
              >
                + Add New
              </button>
            </div>
          </div>

          {/* Render Main Content Based on Active Tab */}
          {renderMainContent()}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {modalType === 'booking' ? 'Add New Booking' : 'Add New User'}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {modalType === 'booking' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                    <input
                      type="text"
                      value={newBooking.customer}
                      onChange={(e) => setNewBooking({...newBooking, customer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newBooking.email}
                      onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                      <input
                        type="number"
                        value={newBooking.amount}
                        onChange={(e) => setNewBooking({...newBooking, amount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={newBooking.status}
                        onChange={(e) => setNewBooking({...newBooking, status: e.target.value as Booking['status']})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddBooking}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition mt-4"
                  >
                    Add Booking
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
                    <select
                      value={newUser.tier}
                      onChange={(e) => setNewUser({...newUser, tier: e.target.value as User['tier']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={handleAddUser}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition mt-4"
                  >
                    Add User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Export Report</h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {['csv', 'excel', 'pdf'].map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportType(format as any)}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center transition ${
                        exportType === format ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-lg font-medium uppercase">{format}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {format === 'csv' && 'Spreadsheet'}
                        {format === 'excel' && 'Excel File'}
                        {format === 'pdf' && 'PDF Document'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last quarter</option>
                  <option>Last year</option>
                  <option>Custom range</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
