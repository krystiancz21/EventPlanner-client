'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  name: string;
};

type GlobalContextType = {
  isAuthenticated: boolean;
  user: null | User;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    isAuthenticated: boolean;
    user: null | User;
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

  const login = (token: string, userData: User) => {
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
