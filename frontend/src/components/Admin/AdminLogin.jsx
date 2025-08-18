import React, { useState } from 'react';
import { X, User, Lock, Shield } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import './AdminLogin.scss';

const AdminLogin = ({ isOpen, onClose }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginAdmin } = useAdmin();

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
    const success = loginAdmin(credentials.username, credentials.password);
    
    if (success) {
      setCredentials({ username: '', password: '' });
      setError('');
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <div className="modal-header">
          <div className="header-content">
            <Shield className="shield-icon" />
            <h2>Admin Login</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="login-description">
            Enter admin credentials to manage personnel and job postings
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <User className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
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
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button type="submit" className="login-btn">
              <Shield size={20} />
              Login as Admin
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>torabasa2024</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
