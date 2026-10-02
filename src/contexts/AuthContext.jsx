import React, { createContext, useContext, useState, useEffect } from 'react';
import {authApi} from '../services/authApi';

const AuthContext = createContext(null);

// Cust-hook fr auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

// 1. App start 
  const fetchCurrentUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        const userData = await authApi.getUserById(userId);
        
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem('userId');
        }
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      localStorage.removeItem('userId');
    } finally {
      setIsLoading(false); 
    }
  };
  // Ini-lo
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  const checkUsername = async (username) => {
    try {
      const users = await authApi.checkUsername(username);
      return users.length > 0;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };
  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      const usernameExists = await checkUsername(userData.username);
      if (usernameExists) {
        return { success: false, message: "Username already exists!" };
      }

      const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${userData.fullName}&background=random`
      };

      await authApi.createUser(newUser);
      return { success: true, message: "Registration successful! Please login." };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: "Something went wrong. Try again." };
    } finally {
      setIsLoading(false);
    }
  };
//login
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Email-check
      const users = await authApi.getUserByEmail(credentials.email);
      const userFound = users[0];

      if (!userFound || userFound.password !== credentials.password) {
        return { success: false, message: "Invalid email or password!" };
      }

      localStorage.setItem('userId', userFound.id);
      setUser(userFound);
      
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Something went wrong. Try again." };
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    checkUsername,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};