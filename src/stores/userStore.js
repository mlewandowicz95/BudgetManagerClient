import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode'; // Poprawny import

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null, // JWT token
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('jwtToken', token); // Zapisz token w localStorage
    },
    logout() {
      this.token = null;
      localStorage.removeItem('jwtToken');
    },
    initializeUser() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.setToken(token);
      }
    },
    getRoleFromToken() {
      if (this.token) {
        try {
          const decodedToken = jwtDecode(this.token); // Dekodowanie tokena
          return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; // Pobierz rolę z claimów
        } catch (error) {
          console.error("Błąd dekodowania tokena JWT:", error);
          return null;
        }
      }
      return null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin() {
      const role = this.getRoleFromToken();
      return role === 'Admin';
    },
  },
});
