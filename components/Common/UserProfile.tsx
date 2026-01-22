// components/Common/UserProfile.tsx - FIXED VERSION
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

interface UserProfileProps {
  onLogout: () => void;
  isMobile?: boolean;
  onViewBookings?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout, isMobile = false, onViewBookings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Sync Clerk user with localStorage for backward compatibility
  useEffect(() => {
    if (isSignedIn && user) {
      const userData: UserData = {
        id: user.id,
        name: user.fullName || user.firstName || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
        phone: user.phoneNumbers?.[0]?.phoneNumber || '',
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Get user data from Clerk or localStorage
  const getDisplayUser = (): UserData | null => {
    if (isSignedIn && user) {
      return {
        id: user.id,
        name: user.fullName || user.firstName || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
        phone: user.phoneNumbers?.[0]?.phoneNumber || '',
      };
    }
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as UserData;
      } catch (e) {
        console.error('Error parsing saved user:', e);
        return null;
      }
    }
    
    return null;
  };

  const displayUser = getDisplayUser();

  if (!displayUser) return null;

  // Safely get initials
  const initials = displayUser.name
    ? displayUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMyBookings = () => {
    setIsMenuOpen(false);
    if (onViewBookings) {
      onViewBookings();
    } else {
      router.push('/my-bookings');
    }
  };

  const handleProfileSettings = () => {
    setIsMenuOpen(false);
    router.push('/profile');
  };

  const handleSavedTrips = () => {
    setIsMenuOpen(false);
    router.push('/saved-trips');
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    if (isSignedIn) {
      await signOut();
    }
    localStorage.removeItem('currentUser');
    onLogout();
    router.push('/');
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleProfileClick}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="User menu"
        aria-expanded={isMenuOpen}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
          }}
        >
          {initials}
        </div>
        {!isMobile && (
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm text-gray-800">
              {displayUser.name?.split(' ')[0] || 'User'}
            </span>
            <span className="text-xs text-gray-500">
              {displayUser.email?.split('@')[0] || '...'}
            </span>
          </div>
        )}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isMenuOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fadeIn"
          style={{
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{displayUser.name || 'User'}</h4>
                <p className="text-sm text-gray-600 truncate">{displayUser.email || 'No email'}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleMyBookings}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium">My Bookings</div>
                <div className="text-xs text-gray-500">View and manage trips</div>
              </div>
            </button>

            <button
              onClick={handleProfileSettings}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium">Profile Settings</div>
                <div className="text-xs text-gray-500">Edit personal info</div>
              </div>
            </button>

            <button
              onClick={handleSavedTrips}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium">Saved Trips</div>
                <div className="text-xs text-gray-500">Wishlist & favorites</div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 group border-t border-gray-100 mt-2"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium">Logout</div>
                <div className="text-xs text-red-500">Sign out of your account</div>
              </div>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-900">3</div>
                <div className="text-gray-500">Trips</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">12</div>
                <div className="text-gray-500">Points</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">Gold</div>
                <div className="text-gray-500">Tier</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;