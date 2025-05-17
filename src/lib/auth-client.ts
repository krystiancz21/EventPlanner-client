'use client';

/**
 * Funkcje pomocnicze do zarządzania sesją użytkownika po stronie klienta
 */

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // Opcjonalnie sprawdź, czy token nie wygasł (jeśli zawiera datę wygaśnięcia)
  try {
    // Niestety, bez znajomości dokładnej struktury tokena, nie możemy
    // go zdekodować, aby sprawdzić datę wygaśnięcia. 
    // W przyszłości można to zaimplementować.
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

export const clearToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
};

export const logout = (): void => {
  clearToken();
  // Możesz tutaj wykonać dodatkowe czynności związane z wylogowaniem
  // np. czyszczenie danych w pamięci, przekierowanie do strony logowania itp.
};
