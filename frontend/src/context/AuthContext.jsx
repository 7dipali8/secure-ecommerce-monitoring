import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { decodeJwt } from '../utils/helpers';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (token && !user) {
      const decoded = decodeJwt(token);
      if (decoded) {
        const userData = {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role || 'USER',
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token } = response.data;
      
      if (!access_token) {
        throw new Error('No token returned from server');
      }

      localStorage.setItem('token', access_token);
      setToken(access_token);

      const decoded = decodeJwt(access_token);
      const userData = decoded ? {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role || 'USER',
      } : { email };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      addToast('Login successful! Welcome back.', 'success');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed. Please check credentials.';
      addToast(message, 'error');
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      addToast('Registration successful! Please login.', 'success');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed.';
      addToast(message, 'error');
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
