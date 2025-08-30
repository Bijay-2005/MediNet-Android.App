import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from './api';

interface User {
  email: string;
  name: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const checkAuth = () => {
      try {
        const currentUser = authAPI.getCurrentUser();
        const isAuth = authAPI.isAuthenticated();
        
        if (currentUser && isAuth) {
          setUser(currentUser);
          console.log('User authenticated on app start:', currentUser);
        } else {
          console.log('No authenticated user found on app start');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Attempting login for:', email);
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const currentUser = authAPI.getCurrentUser();
        console.log('AuthContext: Login successful, setting user:', currentUser);
        setUser(currentUser);
        setLoading(false); // Ensure loading is false after successful login
      } else {
        console.log('AuthContext: Login failed:', response.message);
      }
      
      return response;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log('AuthContext: Attempting signup for:', email);
      const response = await authAPI.signup(name, email, password);
      console.log('AuthContext: Signup response:', response);
      return response;
    } catch (error) {
      console.error('AuthContext: Signup error:', error);
      return { success: false, message: 'Signup failed' };
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out user');
    authAPI.logout();
    setUser(null);
    setLoading(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 