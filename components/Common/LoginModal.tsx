// components/Common/LoginModal.tsx - UPDATED CORRECTLY
'use client';

import React, { useState } from 'react';
import { useClerk, useSignIn } from '@clerk/nextjs';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();
  const { setSession } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Option 1: Use Clerk for authentication
      if (signIn) {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });
        
        if (result.status === 'complete') {
          // Clerk handles the session
          const user = {
            id: result.createdUserId || 'USR001',
            name: email.split('@')[0] || 'User',
            email: email,
            phone: '+61 412 345 678',
          };
          
          // Still save to localStorage for your existing code compatibility
          localStorage.setItem('currentUser', JSON.stringify(user));
          onLoginSuccess();
        }
      } else {
        // Fallback to your original logic
        setTimeout(() => {
          const user = {
            id: 'USR001',
            name: email.split('@')[0] || 'User',
            email: email,
            phone: '+61 412 345 678',
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          onLoginSuccess();
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Use Clerk's Google OAuth
    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="modal active">
      {/* KEEP ALL YOUR ORIGINAL UI EXACTLY AS IT WAS */}
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="image-section">
          <div className="overlay-card">
            <div className="icon-heart">❤️</div>
            <h3>Wander, Explore, Experience</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas</p>
          </div>
          
          <div className="image-footer">
            <h1>Escape the Ordinary <br /> Embrace the Journey</h1>
            <div className="nav-arrows">
              <span>←</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-wrapper">
            <h2>Welcome Back</h2>
        
            {/* Keep your original Google button but connect to Clerk */}
            <button 
              onClick={handleGoogleLogin}
              className="google-btn"
              disabled={isLoading}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
              />
              Login with Google
            </button>

            <div className="divider">
              <span>OR LOGIN WITH EMAIL</span>
            </div>

            {/* Keep your original form */}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  Keep Me Logged In
                </label>
                <a href="#" className="forgot-pass">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <div className="signup-link" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              <p>
                Don&apos;t have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToSignup();
                  }}
                  style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: '600' }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;