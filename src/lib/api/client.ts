import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7222',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Dodaj token do każdego żądania, jeśli istnieje
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor do obsługi błędów
apiClient.interceptors.response.use(
  response => {
    return response;
  }, 
  error => {
    console.error('API Error:', error.response || error);
    
    // Jeśli błąd 401 (Unauthorized), możemy wylogować użytkownika
    if (error.response && error.response.status === 401) {
      // Jeśli używamy kontekstu globalnego, możemy go zaimportować i użyć tutaj
      // const { logout } = useGlobal(); // To nie zadziała tutaj, bo jesteśmy poza komponentem
      // Alternatywnie, możemy ręcznie wyczyścić dane sesji
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // I przekierować do strony logowania
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;