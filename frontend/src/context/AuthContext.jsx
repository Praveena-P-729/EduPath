import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('edupath_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('edupath_token');
      if (storedToken) {
        try {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        } catch (e) {
          localStorage.removeItem('edupath_token');
          localStorage.removeItem('edupath_user');
          setCurrentUser(null);
        }
      } else {
        // Provide mock default user for instant hackathon showcase
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      setToken(result.access_token);
      setCurrentUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      setToken(result.access_token);
      setCurrentUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (googleEmail, name) => {
    setLoading(true);
    try {
      const result = await authService.googleLogin(googleEmail, name);
      setToken(result.access_token);
      setCurrentUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setCurrentUser(null);
  };

  const updateUser = (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    localStorage.setItem('edupath_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated: !!currentUser,
        loading,
        login,
        register,
        googleLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
