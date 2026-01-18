// components/Sections/NotificationToast.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'error': return 'bg-gradient-to-r from-red-500 to-rose-600';
      case 'warning': return 'bg-gradient-to-r from-yellow-500 to-amber-600';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 notification-toast ${getBgColor()} text-white p-4 rounded-xl shadow-xl max-w-sm transform transition-all duration-300 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-start gap-3">
        <i className={`${getIcon()} text-xl mt-0.5`}></i>
        <div className="flex-1">
          <p className="font-semibold">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-white/80 hover:text-white"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;