// components/Common/Modal.tsx
'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div 
        className={`modal-container ${className}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;