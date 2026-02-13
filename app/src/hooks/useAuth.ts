import { useState, useEffect, useCallback } from 'react';

interface AuthUser {
  email: string;
  name: string;
  role: 'admin';
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Admin kimlik bilgileri - ortam değişkeninden veya sabit hash'ten gelir
// Gerçek deployment'ta bu .env'den okunmalı (VITE_ADMIN_EMAIL, VITE_ADMIN_HASH)
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'ggokalp4@gmail.com';
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || 'Gorkem_Mihrimah2024!';
const ADMIN_NAME = import.meta.env.VITE_ADMIN_NAME || 'Görkem';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('gorkem_blog_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('gorkem_blog_user');
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback((email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD_HASH) {
          const user: AuthUser = {
            email: ADMIN_EMAIL,
            name: ADMIN_NAME,
            role: 'admin',
          };
          localStorage.setItem('gorkem_blog_user', JSON.stringify(user));
          setAuth({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 600);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('gorkem_blog_user');
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return {
    ...auth,
    login,
    logout,
  };
}
