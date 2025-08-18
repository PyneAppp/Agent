import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context (renamed from AdminContext)
const AuthContext = createContext();

// Auth Provider Component
export const AdminProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'admin', 'user', or null
  const [userCredentials, setUserCredentials] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('torabasa_role');
    const savedCredentials = localStorage.getItem('torabasa_credentials');
    
    if (savedRole && savedCredentials) {
      setUserRole(savedRole);
      setUserCredentials(JSON.parse(savedCredentials));
      setIsLoggedIn(true);
    }
  }, []);

  // Login function for both admin and user
  const login = (username, password, role = 'user') => {
    // Admin credentials
    if (role === 'admin' && username === 'admin' && password === 'torabasa2024') {
      const credentials = { username, role: 'admin' };
      setUserRole('admin');
      setUserCredentials(credentials);
      setIsLoggedIn(true);
      localStorage.setItem('torabasa_role', 'admin');
      localStorage.setItem('torabasa_credentials', JSON.stringify(credentials));
      return { success: true, role: 'admin' };
    }
    
    // User credentials (simple demo - any valid email/password combo)
    if (role === 'user' && username.includes('@') && password.length >= 6) {
      const credentials = { username, role: 'user' };
      setUserRole('user');
      setUserCredentials(credentials);
      setIsLoggedIn(true);
      localStorage.setItem('torabasa_role', 'user');
      localStorage.setItem('torabasa_credentials', JSON.stringify(credentials));
      return { success: true, role: 'user' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  // Logout function
  const logout = () => {
    setUserRole(null);
    setUserCredentials(null);
    setIsLoggedIn(false);
    localStorage.removeItem('torabasa_role');
    localStorage.removeItem('torabasa_credentials');
  };

  // Legacy admin functions for backward compatibility
  const loginAdmin = (username, password) => {
    const result = login(username, password, 'admin');
    return result.success;
  };

  const logoutAdmin = logout;

  const value = {
    // New role-based auth
    userRole,
    userCredentials,
    isLoggedIn,
    login,
    logout,
    
    // Legacy admin support
    isAdmin: userRole === 'admin',
    adminCredentials: userRole === 'admin' ? userCredentials : null,
    loginAdmin,
    logoutAdmin,
    
    // Helper functions
    isUser: userRole === 'user',
    hasRole: (role) => userRole === role
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAdmin = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AuthContext;
