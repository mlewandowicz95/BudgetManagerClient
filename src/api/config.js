import axios from 'axios';

// Tworzenie klienta Axios
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://localhost:7083/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obsługa sukcesów
const handleApiResponse = (response) => {
  if (!response.data.success) {
    throw {
      message: response.data.message || "Nieznany błąd.",
      errorCode: response.data.errorCode || "UNKNOWN_ERROR",
      errors: response.data.errors || null,
    };
  }
  return response.data.data || null; // Zwraca tylko `data` (jeśli istnieje)
};

// Obsługa błędów
const handleApiError = (error) => {
  if (error.response?.data) {
    const { message, errorCode, errors } = error.response.data;
    throw {
      message: message || "Wystąpił błąd serwera.",
      errorCode: errorCode || "UNKNOWN_ERROR",
      errors: errors || null,
    };
  }
  throw { message: "Wystąpił nieoczekiwany błąd sieci." };
};

// Dodanie tokena JWT do każdego żądania
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Globalna obsługa odpowiedzi i błędów za pomocą interceptorów
apiClient.interceptors.response.use(
  (response) => handleApiResponse(response),
  (error) => {
    handleApiError(error);
    return Promise.reject(error); // Przekazanie błędu dalej
  }
);

export default apiClient;
