import apiClient from './client';

type Credentials = { email: string; password: string };
type UserData = Credentials & { name: string };

export const login = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post('/api/identity/login', credentials);
    return response.data;
  } catch (error) {
    // Przekazujemy szczegóły błędu do komponentu
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error');
    }
  }
};

export const register = (userData: UserData) => 
  apiClient.post('/auth/register', userData);
