import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Dane użytkownika
    token: null, // JWT token
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
    },
    initializeUser() {
      const token = localStorage.getItem('jwtToken');
      const userData = JSON.parse(localStorage.getItem('user'));
      if (token && userData) {
        this.setToken(token);
        this.setUser(userData);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'Admin',
  },
});
