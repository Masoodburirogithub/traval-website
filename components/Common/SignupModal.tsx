// components/Common/SignupModal.tsx - UPDATED CORRECTLY
'use client';

import React, { useState } from 'react';
import { useClerk, useSignUp } from '@clerk/nextjs';

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Option 1: Use Clerk for signup
      if (signUp) {
        const result = await signUp.create({
          emailAddress: formData.email,
          password: formData.password,
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
        });
        
        if (result.status === 'complete') {
          // Save user data to localStorage for compatibility
          const user = {
            id: result.createdUserId || 'USR' + Date.now().toString().slice(-6),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          onSignupSuccess();
        }
      } else {
        // Fallback to your original logic
        setTimeout(() => {
          const user = {
            id: 'USR' + Date.now().toString().slice(-6),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          onSignupSuccess();
          setIsLoading(false);
        }, 1000);
      }
    } catch (error: any) {
      setError(error.errors?.[0]?.message || 'Signup failed');
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    // Use Clerk's Google OAuth
    try {
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error('Google signup error:', error);
    }
  };

  return (
    <div className="modal active">
      {/* KEEP ALL YOUR ORIGINAL UI */}
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="visual-side">
          <button className="badge-btn">Sign Up</button>
          
          <div className="floating-card">
            <div className="heart-icon">❤</div>
            <h3>Wander, Explore, Experience</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas</p>
          </div>

          <div className="bottom-content">
            <div className="nav-controls">
              <button className="nav-btn">←</button>
              <button className="nav-btn">→</button>
            </div>
            <h1>Escape the Ordinary <br /> Embrace the Journey</h1>
          </div>
        </div>

        <div className="form-section">
          <div className="form-wrapper">
            {/* <h2>Sign Up</h2> */}
          
            <button 
              onClick={handleGoogleSignup}
              className="google-auth google-btn"
              disabled={isLoading}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="G" 
              />
              Sign up with Google
            </button>

            <div className="separator divider">
              <span>OR SIGN UP WITH EMAIL</span>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="error-message" style={{ color: '#ef4444', marginBottom: '15px' }}>
                  {error}
                </div>
              )}

              {/* KEEP YOUR ORIGINAL FORM FIELDS */}
              <div className="full-width">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="half-width-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="full-width">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="full-width">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="terms-area">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="terms">
                  I agree to all the <a href="#">Terms of Services</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="login-link" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              <p>
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToLogin();
                  }}
                  style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: '600' }}
                >
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;