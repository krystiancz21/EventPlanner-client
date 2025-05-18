'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  sub?: string;
  name?: string;
  email?: string;
  role?: string | string[];
  exp?: number;
  [key: string]: any;
};

type User = {
  email: string;
  name: string;
  roles: string[]; // Teraz przechowujemy role jako tablicę
};

type GlobalContextType = {
  isAuthenticated: boolean;
  user: null | User;
  login: (token: string, userData: { email: string; name: string }) => void;
  logout: () => void;
  hasRole: (role: string | string[]) => boolean;
  // Tutaj możesz dodać inne globalne stany
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    isAuthenticated: boolean;
    user: null | { email: string; name: string };
  }>({
    isAuthenticated: false,
    user: null,
  });

  const router = useRouter();

  useEffect(() => {
    // Upewnijmy się, że kod wykonuje się tylko po stronie klienta
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setState({
            isAuthenticated: true,
            user: JSON.parse(userData),
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          // W przypadku błędu parsowania, wyczyść dane
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  const login = (token: string, userData: { email: string; name: string }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setState({
        isAuthenticated: true,
        user: userData,
      });
      router.push('/');
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setState({
        isAuthenticated: false,
        user: null,
      });
      router.push('/sign-in');
    }
  };

  return (
    <GlobalContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login,
      logout,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
