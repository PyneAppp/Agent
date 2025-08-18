import React, { useState } from 'react';
import { X, User, Lock, Mail, UserPlus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import './UserLogin.scss';

const UserLogin = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign up validation
      if (!credentials.username.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      
      if (credentials.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    
    const result = login(credentials.username, credentials.password, 'user');
    
    if (result.success) {
      setCredentials({ username: '', password: '', confirmPassword: '' });
      setError('');
      onClose();
    } else {
      if (isSignUp) {
        setError('Registration failed. Please try again.');
      } else {
        setError('Invalid email or password. Please check your credentials.');
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setCredentials({ username: '', password: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="user-login-overlay">
      <div className="user-login-modal">
        <div className="modal-header">
          <div className="header-content">
            {isSignUp ? <UserPlus className="auth-icon" /> : <User className="auth-icon" />}
            <h2>{isSignUp ? 'Create Account' : 'User Login'}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="login-description">
            {isSignUp 
              ? 'Create your account to start posting job requests and access user features'
              : 'Sign in to your account to post jobs and access user features'
            }
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Email Address</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button type="submit" className="auth-btn">
              {isSignUp ? <UserPlus size={20} /> : <User size={20} />}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                className="toggle-btn" 
                onClick={toggleMode}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {!isSignUp && (
            <div className="demo-credentials">
              <p><strong>Demo User:</strong></p>
              <p>Email: <code>user@demo.com</code></p>
              <p>Password: <code>password123</code></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
