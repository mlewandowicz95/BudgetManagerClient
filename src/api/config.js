import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'https://localhost:7083/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Dodanie tokena JWT do każdego żądania
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
