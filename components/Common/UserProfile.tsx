// components/Common/UserProfile.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface UserProfileProps {
  onLogout: () => void;
  isMobile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout, isMobile = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="user-profile-container relative">
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="user-profile-btn flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>
        {!isMobile && <span className="font-medium">{user.name.split(' ')[0]}</span>}
        <svg
          className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
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
          className="user-profile-menu absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4 border-b border-gray-100">
            <h4 className="font-semibold text-gray-900">{user.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          </div>
          <div className="py-2">
            <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              My Bookings
            </button>
            <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Settings
            </button>
            <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Saved Trips
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 border-t border-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;