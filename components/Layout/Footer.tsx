// components/Layout/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl pt-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-6 md:mb-8 uppercase tracking-tighter">
            GURKHAS TRAVEL
          </h2>
          <div className="bg-slate-800 p-2 rounded w-24 text-center text-xs">USD ▾</div>
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8">Contact</h4>
          <p className="text-slate-400 mb-3 md:mb-4">T 1-634-567-34</p>
          <p className="text-slate-400 mb-6 md:mb-8">E contact@traveltourtheme.co</p>
          <div className="flex space-x-4 text-slate-400">
            <span>f</span> <span>p</span> <span>t</span> <span>in</span>
          </div>
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8">Useful Links</h4>
          <ul className="text-slate-400 space-y-3 md:space-y-4">
            <li>Travel Blog & Tips</li>
            <li>Working With Us</li>
            <li>Be Our Partner</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8">Pay Safely With Us</h4>
          <p className="text-slate-400 text-sm md:text-base">
            The payment is encrypted transmitted securely with an SSL Protocol.
          </p>
        </div>
      </div>
      <div className="mt-8 md:mt-10 pt-3 border-t border-white/10 text-center text-slate-600 text-sm">
        Copyright @ 2024 Goodlayers. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;