import apiClient from './client';

type Credentials = { email: string; password: string };

// Typ odpowiedzi z API
type LoginResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export const login = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post<LoginResponse>('/api/identity/login', credentials);
    console.log('API response:', response.data);
    return response.data;
  } catch (error: unknown) {
    // Przekazujemy szczegóły błędu do komponentu
    if (error && typeof error === 'object' && 'response' in error) {
      const errorResponse = error.response as { data?: { message?: string } };
      console.error('API error response:', errorResponse?.data);
      throw new Error(errorResponse?.data?.message || 'Login failed');
    } else {
      throw new Error('Network error');
    }
  }
};

export const register = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post('/api/identity/register', credentials);
    console.log('API response:', response.data);
    return response.data;
  } catch (error: unknown) {
    // Przekazujemy szczegóły błędu do komponentu
    if (error && typeof error === 'object' && 'response' in error) {
      const errorResponse = error.response as { data?: { message?: string } };
      console.error('API error response:', errorResponse?.data);
      throw new Error(errorResponse?.data?.message || 'Registration failed'); // Zmieniono 'Login failed' na 'Registration failed'
    } else {
      throw new Error('Network error');
    }
  }
};
