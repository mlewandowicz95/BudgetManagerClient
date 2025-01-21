import axios from 'axios';

// Tworzenie klienta Axios
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://localhost:7083/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiResponse = (response) => {
  console.log("Intercepted Response:", response);

  if (!response.data.success) {
    const error = {
      message: response.data.message,
      errorCode: response.data.errorCode,
      errors: response.data.errors || null,
    };
    console.error("Rzucam błąd w handleApiResponse:", error);
    throw error; // Rzuć błąd, jeśli `success: false`
  }

  console.log("Response Passed:", response.data);
  return response.data; // Zwróć dane w przypadku sukcesu
};


// Funkcja do obsługi błędów
const handleApiError = (error) => {
  if (error.response && error.response.data) {
    const errorData = error.response.data;
    const formattedError = {
      message: errorData.message,
      errorCode: errorData.errorCode,
      errors: errorData.errors || null,
    };
    throw formattedError; // Rzuć sformatowany błąd
  }
  throw { message: 'An unexpected error occurred' }; // Ogólny błąd
};

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
  (error) => Promise.reject(error)
);

// Globalna obsługa odpowiedzi i błędów za pomocą interceptorów
apiClient.interceptors.response.use(
  (response) => handleApiResponse(response), // Obsługa sukcesu
  (error) => {
    handleApiError(error); // Obsługa błędów
    return Promise.reject(error); // Opcjonalne przekazanie błędu dalej
  }
);

export default apiClient;
