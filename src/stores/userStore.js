import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,  // JWT token
    user: null,   // Pełne dane użytkownika
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
      localStorage.removeItem('jwtToken');
    },

    initializeUser() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        console.log('Loaded token from localStorage:', token);
        this.setToken(token);
        console.log('Decoded user data:', this.user);
      } else {
        console.log('No token found in localStorage.');
      }
    },

    decodeToken() {
      if (!this.token) {
        this.user = null;
        return;
      }

      try {
        const decodedToken = jwtDecode(this.token);
        this.user = {
          id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
      } catch (error) {
        console.error("Błąd dekodowania tokena JWT:", error);
        this.user = null;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "Admin",
  },
});
