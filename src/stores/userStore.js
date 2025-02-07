import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,  // JWT token
    user: null,   // Pełne dane użytkownika
    tokenExpiry: null,  // Czas wygaśnięcia tokenu (UNIX timestamp)
  }),

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('jwtToken', token);
      this.decodeToken();  // Dekodujemy i zapisujemy dane użytkownika
    },

    logout() {
      this.token = null;
      this.user = null;
      this.tokenExpiry = null;
      localStorage.removeItem('jwtToken');
    },

    initializeUser() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.setToken(token);
        console.log('Loaded token from localStorage:', token);
        console.log('Decoded user data:', this.user);

        if (this.isTokenExpired()) {
          console.log("Token wygasł, następuje automatyczne wylogowanie...");
          this.logout();
        }
      } else {
        console.log('No token found in localStorage.');
      }
    },

    decodeToken() {
      if (!this.token) {
        this.user = null;
        this.tokenExpiry = null;
        return;
      }

      try {
        const decodedToken = jwtDecode(this.token);
        this.user = {
          id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };

        // Pobranie czasu wygaśnięcia tokenu (UNIX timestamp)
        this.tokenExpiry = decodedToken.exp ? decodedToken.exp * 1000 : null;
      } catch (error) {
        console.error("Błąd dekodowania tokena JWT:", error);
        this.user = null;
        this.tokenExpiry = null;
      }
    },

    isTokenExpired() {
      if (!this.tokenExpiry) return true;
      return Date.now() >= this.tokenExpiry;  // Sprawdzenie, czy obecny czas przekroczył `exp`
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token && !state.isTokenExpired(),
    isAdmin: (state) => state.user?.role === "Admin",
  },
});
