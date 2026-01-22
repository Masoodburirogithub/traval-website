// components/Layout/Navbar.tsx - UPDATED CORRECTLY
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs'; // Add this
import LoginModal from '../Common/LoginModal';
import SignupModal from '../Common/SignupModal';
import UserProfile from '../Common/UserProfile';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { isSignedIn } = useAuth(); // Get Clerk auth state
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'About', href: '/about' },
    { name: 'Promotion', href: '/promotion' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    // Check both Clerk and localStorage for login status
    const savedUser = localStorage.getItem('currentUser');
    setIsLoggedIn(isSignedIn || !!savedUser);
  }, [isSignedIn]); // Re-run when Clerk auth state changes

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* KEEP YOUR ORIGINAL NAVBAR UI EXACTLY AS IT WAS */}
      <nav className="bg-white px-8 py-4 flex items-center justify-between shadow-sm flex-wrap">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="flex flex-col items-center">
            <div className="w-8 h-px bg-black rotate-45 translate-y-2"></div>
            <div className="w-8 h-px bg-black -rotate-45"></div>
            <div className="w-4 h-4 rounded-full border border-black -mt-2"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">GURKHAS<span className="font-black">TRAVEL</span></h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-slate-600 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-blue-600 transition ${pathname === item.href ? 'text-blue-600' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Auth Buttons / User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <UserProfile onLogout={handleLogout} />
          ) : (
            <>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-8 py-2 border border-orange-500 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-10 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 shadow-lg shadow-orange-200 transition"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full mt-4">
            <div className="flex flex-col space-y-4 text-slate-600 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:text-blue-600 transition py-2 ${pathname === item.href ? 'text-blue-600' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <UserProfile onLogout={handleLogout} isMobile />
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setShowSignupModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 shadow-lg shadow-orange-200 transition"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Keep your original modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onSignupSuccess={() => {
            setIsLoggedIn(true);
            setShowSignupModal(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;